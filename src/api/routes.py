"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/home', methods=['POST', 'GET'])
def handle_home():

    response_body = {
        "message": "All ready to start your day"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "")

    errors = {}
    # Validación de nombre
    if not name:
        errors["name"] = "Name is required."
    elif len(name) > 16:
        errors["name"] = "Name cannot be more than 16 characters."
    elif not all(c.isalnum() or c in "_\-áéíóúÁÉÍÓÚñÑ " for c in name):
        errors["name"] = "Invalid characters in name."

    # Validación de email
    import re
    email_regex = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
    if not email:
        errors["email"] = "Email is required."
    elif not re.match(email_regex, email):
        errors["email"] = "Invalid email format."

    # Validación de password
    if not password:
        errors["password"] = "Password is required."
    elif len(password) > 10:
        errors["password"] = "Password cannot be more than 10 characters."
    elif any(c.isspace() for c in password):
        errors["password"] = "Password cannot contain spaces."

    # Verificar si el email o username ya existen
    if not errors:
        if User.query.filter_by(email=email).first():
            errors["email"] = "Email already registered."
        if User.query.filter_by(username=name).first():
            errors["name"] = "Name already registered."

    if errors:
        return jsonify({"errors": errors}), 400

    # Crear usuario
    user = User(username=name, email=email)
    user.password = password
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User registered successfully."}), 201
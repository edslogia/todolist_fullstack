"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token


api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api)

# Endpoint de login
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"msg": "No data provided"}), 400

    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token, "user": user.serialize()}), 200

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
    elif not all(c.isalnum() or c in r"_\-áéíóúÁÉÍÓÚñÑ " for c in name):
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
            errors = "Email already registered."
        if User.query.filter_by(username=name).first():
            errors = "Name already registered."

    if errors:
        return jsonify({"errors": errors}), 400

    # Crear usuario
    user = User(username=name, email=email)
    user.password = password
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "User registered successfully."}), 201
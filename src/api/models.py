from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(16), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    _password: Mapped[str] = mapped_column("password", nullable=False)


    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, plaintext_password):
        self._password = generate_password_hash(plaintext_password)

    def check_password(self, plaintext_password):
        return check_password_hash(self._password, plaintext_password)

    tasks = db.relationship('Task', back_populates='user', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
        }


# Modelo de Tarea (Todo)

class Task(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    label: Mapped[str] = mapped_column(String(255), nullable=False)
    completed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    user_id: Mapped[int] = mapped_column(db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates='tasks')

    def serialize(self):
        return {
            "id": self.id,
            "label": self.label,
            "completed": self.completed,
            "user_id": self.user_id
        }



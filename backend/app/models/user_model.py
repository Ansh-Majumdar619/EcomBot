from app import mongo
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User:
    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        # store hashed password, not raw
        self.password_hash = generate_password_hash(password)
        self.created_at = datetime.utcnow()

    def save(self):
        user_data = {
            "username": self.username,
            "email": self.email,
            "password_hash": self.password_hash,
            "created_at": self.created_at
        }
        # Insert user document into 'users' collection
        mongo.db.users.insert_one(user_data)

    @staticmethod
    def find_by_username(username):
        return mongo.db.users.find_one({"username": username})

    @staticmethod
    def find_by_email(email):
        return mongo.db.users.find_one({"email": email})

    @staticmethod
    def verify_password(stored_password_hash, password_to_check):
        return check_password_hash(stored_password_hash, password_to_check)

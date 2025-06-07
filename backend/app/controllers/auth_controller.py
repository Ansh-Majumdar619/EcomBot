# Import necessary modules from Flask and other packages
from flask import jsonify  # For returning JSON responses
from app.models.user_model import User  # User model (not used directly here)
from app.utils.token import create_token  # Utility to create JWT tokens
from werkzeug.security import (
    generate_password_hash,
    check_password_hash,
)  # For password hashing and verification
from app import mongo  # MongoDB connection instance


# Function to handle user registration
def register_user(data):
    username = data.get("username")  # Get username from request data
    email = data.get("email")  # Get email from request data
    password = data.get("password")  # Get password from request data

    # Check if a user with the given email or username already exists in the database
    if mongo.db.users.find_one({"email": email}):
        return (
            jsonify({"error": "User with this email already exists"}),
            409,
        )  # Return error if user exists
    if mongo.db.users.find_one({"username": username}):
        return (
            jsonify({"error": "Username already taken"}),
            409,
        )

    hashed_pw = generate_password_hash(password)  # Hash the password for security
    # Insert the new user with hashed password into the database
    mongo.db.users.insert_one(
        {"username": username, "email": email, "password": hashed_pw}
    )
    return (
        jsonify({"message": "User registered successfully"}),
        201,
    )  # Return success message


# Function to handle user login
def login_user(data):
    email = data.get("email")  # Get email from request data
    password = data.get("password")  # Get password from request data

    # Find the user in the database by email
    user = mongo.db.users.find_one({"email": email})
    # Check if user exists and password is correct
    if not user or not check_password_hash(user["password"], password):
        return (
            jsonify({"error": "Invalid credentials"}),
            401,
        )  # Return error if credentials are invalid

    token = create_token(identity=email)  # Create JWT token for the user
    return jsonify({"token": token}), 200  # Return the token in the response

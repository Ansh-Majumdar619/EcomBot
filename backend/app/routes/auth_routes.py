# Import necessary modules from Flask and the authentication controller
from flask import Blueprint, request, jsonify
from app.controllers.auth_controller import register_user, login_user

# Create a Blueprint for authentication routes
auth_bp = Blueprint("auth", __name__)


# Define the registration route, which handles POST requests to '/register'
@auth_bp.route("/register", methods=["POST"])
def register():
    # Call the register_user function with the JSON data from the request
    return register_user(request.json)


# Define the login route, which handles POST requests to '/login'
@auth_bp.route("/login", methods=["POST"])
def login():
    # Call the login_user function with the JSON data from the request
    return login_user(request.json)

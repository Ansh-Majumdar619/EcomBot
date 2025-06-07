# Import necessary modules from Flask
from flask import Blueprint, request
# Import the handle_chat function from the chatbot controller
from app.controllers.chatbot_controller import handle_chat

# Create a Blueprint for the chatbot routes
chatbot_bp = Blueprint('chatbot', __name__)

# Define a route for the chatbot that listens for POST requests at the root URL ('/')
# @chatbot_bp.route('/', methods=['POST'])
# def chat():
#     # Call the handle_chat function with the JSON data from the request and return its response
#     return handle_chat(request.json)



@chatbot_bp.route('/', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return '', 200  # Preflight CORS check passes

    return handle_chat(request.json)

from app import mongo
from datetime import datetime
from bson import ObjectId


class ChatMessage:
    # Initialize a ChatMessage instance with user_id and message
    def __init__(self, user_id, message):
        # Convert user_id to MongoDB ObjectId
        self.user_id = ObjectId(user_id)  # MongoDB ObjectId of the user
        self.message = message  # The message content
        self.created_at = datetime.utcnow()  # Timestamp of message creation

    # Save the chat message to the MongoDB database
    def save(self):
        message_data = {
            "user_id": self.user_id,  # User's ObjectId
            "message": self.message,  # Message content
            "created_at": self.created_at,  # Timestamp
        }
        mongo.db.chat_messages.insert_one(
            message_data
        )  # Insert the message into the chat_messages collection

    # Static method to find all messages by a specific user
    @staticmethod
    def find_by_user(user_id):
        return list(mongo.db.chat_messages.find({"user_id": ObjectId(user_id)}))

    # Static method to find all chat messages
    @staticmethod
    def find_all():
        return list(mongo.db.chat_messages.find())

    # String representation of the ChatMessage object
    def __repr__(self):
        return f"<ChatMessage from User {self.user_id}>"

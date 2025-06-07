# Import necessary libraries and extensions
from flask import Flask
from flask_cors import CORS  # For handling Cross-Origin Resource Sharing
from flask_jwt_extended import JWTManager  # For JWT authentication
from flask_pymongo import PyMongo  # For MongoDB integration
from dotenv import load_dotenv  # For loading environment variables from .env file

# Initialize PyMongo and JWTManager instances (to be attached to app later)
mongo = PyMongo()
jwt = JWTManager()

# Factory function to create and configure the Flask app
def create_app():
    load_dotenv()  # Load environment variables from .env file

    app = Flask(__name__)
    app.config.from_object("app.config.Config")  # Loads MONGO_URI, JWT_SECRET_KEY, etc.

    # ✅ Set up CORS correctly
    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:5173"}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    )

    # ✅ Initialize extensions
    mongo.init_app(app)
    jwt.init_app(app)

    # ✅ Optional: Test MongoDB connection
    try:
        db_names = mongo.cx.list_database_names()
        print("✅ Connected to MongoDB. Databases:", db_names)
    except Exception as e:
        print("❌ Failed to connect to MongoDB:", e)

    # ✅ Import and register blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.chatbot_routes import chatbot_bp
    from app.routes.product_routes import product_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(chatbot_bp, url_prefix="/api/chat")
    app.register_blueprint(product_bp, url_prefix="/api/products")

    return app

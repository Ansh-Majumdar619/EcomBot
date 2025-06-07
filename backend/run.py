# Import the create_app function from the app module
from app import create_app

# Create an instance of the Flask app using the factory function
app = create_app()

# If this script is run directly, start the Flask development server with debug mode enabled
if __name__ == "__main__":
    app.run(debug=True)

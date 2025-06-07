# Import the os module to interact with the operating system and environment variables
import os

# Import load_dotenv to load environment variables from a .env file
from dotenv import load_dotenv

# Load environment variables from a .env file into the environment
load_dotenv()  # Load .env variables


# Define a configuration class to store application settings
class Config:
    # Get the MongoDB connection URI from environment variables
    MONGO_URI = os.getenv("MONGO_URI")
    # Get the JWT secret key from environment variables
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    # other config variables

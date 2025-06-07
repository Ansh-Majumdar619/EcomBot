# Import the json module to handle JSON data
import json

# Import MongoClient to connect to MongoDB
from pymongo import MongoClient


# Define a function to seed the database with product data
def seed_database():
    # Connect to the MongoDB database using the provided connection string
    client = MongoClient(
        "mongodb+srv://anshmajumdar82:5rflHdfSzQM34h5q@cluster0.rtnkfp8.mongodb.net/e-chatbot?retryWrites=true&w=majority&appName=Cluster0"
    )
    # Access the 'e-chatbot' database
    db = client["e-chatbot"]
    # Access the 'users' collection (not used in this script, but initialized)
    users_collection = db["users"]

    # Access the 'products' collection
    products_collection = db["products"]

    # Open the sample_products.json file and load its contents as a Python object
    with open("sample_products.json", "r") as file:
        products = json.load(file)

    # Insert all products into the 'products' collection
    result = products_collection.insert_many(products)
    # Print the number of products inserted
    print(f"Inserted {len(result.inserted_ids)} products into the database.")


# If this script is run directly, call the seed_database function
if __name__ == "__main__":
    seed_database()

# ⚠️ Run this file from inside the database/ folder like this:
# python seed_data.py

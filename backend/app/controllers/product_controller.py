# Import necessary modules from Flask and the app's MongoDB instance
from flask import jsonify
from app import mongo
import re  # Regular expressions module

# Function to search for products by name using a case-insensitive regex


def search_products(query):
    # Create a regex pattern to match the query in product names (case-insensitive)
    regex = re.compile(f".*{query}.*", re.IGNORECASE)
    # Find all products whose 'name' matches the regex
    products = list(mongo.db.products.find({"name": regex}))

    # Convert ObjectId to string for JSON serialization
    for p in products:
        p["_id"] = str(p["_id"])  # Convert ObjectId to string

    # Return the list of products as a JSON response
    return jsonify(products)


# Function to get all products from the database


def get_all_products():
    # Retrieve all products from the 'products' collection
    products = list(mongo.db.products.find())

    # Convert ObjectId to string for each product
    for product in products:
        product["_id"] = str(product["_id"])  # Convert ObjectId to string

    # Return the list of products as a JSON response with HTTP 200 status
    return jsonify(products), 200


# Function to add a new product to the database


def add_product(data):
    # Check if 'name' and 'price' fields are present in the input data
    if not data.get("name") or not data.get("price"):
        return jsonify({"error": "Name and Price are required"}), 400

    # Insert the new product into the 'products' collection
    result = mongo.db.products.insert_one(data)
    # Return a success message and the new product's ID as a JSON response with HTTP 201 status
    return (
        jsonify(
            {
                "message": "Product added successfully",
                "product_id": str(result.inserted_id),
            }
        ),
        201,
    )

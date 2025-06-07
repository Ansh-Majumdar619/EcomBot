# Import necessary modules from Flask and the product controller
from flask import Blueprint, request
from app.controllers.product_controller import (
    search_products,  # Function to handle product search
    add_product,  # Function to handle adding a new product
    get_all_products,  # Function to retrieve all products
)

# Create a Blueprint for product-related routes
product_bp = Blueprint("products", __name__)


# Route to list all products
@product_bp.route("/", methods=["GET"])
def list_products():
    return get_all_products()


# Route to create a new product
@product_bp.route("/", methods=["POST"])
def create_product():
    return add_product(request.json)


# Route to search for products by query string
@product_bp.route("/search", methods=["GET"])
def search():
    query = request.args.get("q", "")  # Get the search query from URL parameters
    return search_products(query)

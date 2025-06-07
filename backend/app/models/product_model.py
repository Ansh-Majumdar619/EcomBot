from app import mongo
from datetime import datetime


class Product:
    def __init__(self, name, description, price, stock=0):
        self.name = name
        self.description = description
        self.price = price
        self.stock = stock
        self.created_at = datetime.utcnow()

    def save(self):
        product_data = {
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "stock": self.stock,
            "created_at": self.created_at,
        }
        # Insert product document into 'products' collection
        mongo.db.products.insert_one(product_data)

    @staticmethod
    def find_all():
        return list(mongo.db.products.find())

    @staticmethod
    def find_by_name(name):
        return mongo.db.products.find_one({"name": name})

    @staticmethod
    def update_stock(product_id, new_stock):
        mongo.db.products.update_one(
            {"_id": product_id}, {"$set": {"stock": new_stock}}
        )

    def __repr__(self):
        return f"<Product {self.name}>"

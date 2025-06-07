# from flask import jsonify
# from datetime import datetime

# def handle_chat(data):
#     message = data.get("message", "").lower()

#     # Basic simulation logic
#     if "book" in message:
#         reply = "You can find a variety of books in our catalog. Type 'search books' to get started!"
#     elif "electronics" in message:
#         reply = "Electronics section has phones, laptops, and more. Type 'search electronics'."
#     else:
#         reply = "I'm not sure what you mean. Try typing a category like 'books' or 'electronics'."

#     return jsonify({
#         "user_message": message,
#         "bot_reply": reply,
#         "timestamp": datetime.utcnow().isoformat()
#     })










from flask import jsonify
from datetime import datetime
from app import mongo

def handle_chat(data):
    user_message = data.get("message", "").lower()
    bot_reply = ""

    # First, try to find products by category keywords
    if "book" in user_message:
        products = list(mongo.db.products.find({"category": {"$regex": "book", "$options": "i"}}))
        if products:
            product_names = [p.get("name", "Unnamed Product") for p in products]
            bot_reply = "Books we have: " + ", ".join(product_names)
        else:
            bot_reply = "No books found in our catalog."
    elif "electronics" in user_message:
        products = list(mongo.db.products.find({"category": {"$regex": "electronics", "$options": "i"}}))
        if products:
            product_names = [p.get("name", "Unnamed Product") for p in products]
            bot_reply = "Electronics available: " + ", ".join(product_names)
        else:
            bot_reply = "No electronics found at the moment."
    else:
        # If no category keyword, search by product name/title keyword(s)
        products = list(mongo.db.products.find({"name": {"$regex": user_message, "$options": "i"}}))
        if products:
            replies = []
            for p in products:
                name = p.get("name", "Unnamed Product")
                category = p.get("category", "Unknown category")
                price = p.get("price", "Price not available")
                stock = p.get("stock", "Stock info not available")
                description = p.get("description", "No description available")

                reply_text = (f"Name: {name}\n"
                              f"Category: {category}\n"
                              f"Price: {price}\n"
                              f"Stock: {stock}\n"
                              f"Description: {description}")
                replies.append(reply_text)

            bot_reply = "\n\n".join(replies)
        else:
            bot_reply = "I'm not sure what you mean. Try typing a category like 'books' or 'electronics', or a product name."

    # Save user message and bot reply to chat_messages collection
    chat_entry = {
        "user_message": user_message,
        "bot_reply": bot_reply,
        "timestamp": datetime.utcnow()
    }
    mongo.db.chat_messages.insert_one(chat_entry)

    return jsonify({
        "user_message": user_message,
        "bot_reply": bot_reply,
        "timestamp": chat_entry["timestamp"].isoformat()
    })

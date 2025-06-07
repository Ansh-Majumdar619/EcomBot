ecom-sales-chatbot/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py                  # Initializes Flask app and extensions
│   │   ├── config.py                    # App configuration (e.g., DB URI, JWT secrets)
│   │
│   │   ├── models/
│   │   │   ├── user_model.py            # User schema and methods
│   │   │   ├── product_model.py         # Product schema
│   │   │   └── chat_model.py            # Chat log schema
│   │
│   │   ├── routes/
│   │   │   ├── auth_routes.py           # Login, signup, JWT auth endpoints
│   │   │   ├── chatbot_routes.py        # Chatbot interaction APIs
│   │   │   └── product_routes.py        # Product search/filter endpoints
│   │
│   │   ├── controllers/
│   │   │   ├── auth_controller.py       # Business logic for authentication
│   │   │   ├── chatbot_controller.py    # Chatbot query logic and NLP processing
│   │   │   └── product_controller.py    # Product fetch/filter logic
│   │
│   │   ├── utils/
│   │   │   ├── db.py                    # MongoDB connection handler
│   │   │   ├── token.py                 # JWT helper functions
│   │   │   └── helpers.py               # Common utility functions
│   │
│   ├── database/
│   │   ├── seed_data.py                 # Script to insert 100+ mock products into MongoDB
│   │   └── sample_products.json         # Sample product entries (optional)
│   │
│   ├── run.py                           # Entry point to run the Flask app
│   └── requirements.txt                 # Python dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html                   # Main HTML template
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── logo.png                 # Static assets
│   │
│   │   ├── components/
│   │   │   ├── ChatInterface.jsx        # Chatbot UI component
│   │   │   ├── ProductCard.jsx          # Visual representation of a product
│   │   │   ├── ProductList.jsx          # List of fetched products
│   │   │   ├── LoginForm.jsx            # Login form
│   │   │   ├── SignupForm.jsx           # Signup form
│   │   │   └── Navbar.jsx               # Navigation bar
│   │
│   │   ├── pages/
│   │   │   ├── Home.jsx                 # Homepage with chat interface
│   │   │   ├── Login.jsx                # Login page
│   │   │   ├── Signup.jsx               # Signup page
│   │   │   └── NotFound.jsx            # 404 fallback page
│   │
│   │   ├── services/
│   │   │   ├── api.js                   # Axios base instance
│   │   │   ├── authService.js           # Handles login, signup, JWT storage
│   │   │   └── productService.js        # Fetch/search product-related API calls
│   │
│   │   ├── App.jsx                      # Main React app component with routes
│   │   ├── main.jsx                     # Entry point to render React app
│   │   └── index.css                    # Global styles
│
│   └── package.json                     # Frontend dependencies
│
├── .gitignore                           # Git ignored files list
├── README.md                            # Project description, setup, and instructions
└── LICENSE                              # Optional license file

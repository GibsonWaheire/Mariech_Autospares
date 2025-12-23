from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
from typing import Dict, List

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Sample products data - in production, this would come from a database
products: List[Dict] = [
    {
        "id": 1,
        "name": "Brake Pads - Front",
        "category": "Brakes",
        "price": 4500.00,
        "description": "High-quality front brake pads for all vehicle types",
        "stock": 25,
        "image": "/images/brake-pads-front.jpg"
    },
    {
        "id": 2,
        "name": "Engine Oil Filter",
        "category": "Filters",
        "price": 1200.00,
        "description": "Premium engine oil filter compatible with most vehicles",
        "stock": 50,
        "image": "/images/oil-filter.jpg"
    },
    {
        "id": 3,
        "name": "Air Filter",
        "category": "Filters",
        "price": 800.00,
        "description": "Standard air filter for improved engine performance",
        "stock": 40,
        "image": "/images/air-filter.jpg"
    },
    {
        "id": 4,
        "name": "Spark Plugs (Set of 4)",
        "category": "Ignition",
        "price": 2500.00,
        "description": "Iridium spark plugs for better fuel efficiency",
        "stock": 30,
        "image": "/images/spark-plugs.jpg"
    },
    {
        "id": 5,
        "name": "Windshield Wiper Blades",
        "category": "Accessories",
        "price": 1500.00,
        "description": "Durable wiper blades for clear visibility",
        "stock": 20,
        "image": "/images/wiper-blades.jpg"
    },
    {
        "id": 6,
        "name": "Car Battery 12V",
        "category": "Electrical",
        "price": 8500.00,
        "description": "12V car battery with 2-year warranty",
        "stock": 15,
        "image": "/images/car-battery.jpg"
    }
]

@app.route('/products', methods=['GET'])
def get_products():
    """Get all products, optionally filtered by category"""
    category = request.args.get('category')
    
    if category:
        filtered_products = [p for p in products if p['category'].lower() == category.lower()]
        return jsonify(filtered_products), 200
    
    return jsonify(products), 200

@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id: int):
    """Get a specific product by ID"""
    product = next((p for p in products if p['id'] == product_id), None)
    
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    return jsonify(product), 200

@app.route('/products', methods=['POST'])
def create_product():
    """Create a new product (admin function)"""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    required_fields = ['name', 'category', 'price', 'description', 'stock']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400
    
    new_id = max([p['id'] for p in products], default=0) + 1
    new_product = {
        'id': new_id,
        'name': data['name'],
        'category': data['category'],
        'price': float(data['price']),
        'description': data['description'],
        'stock': int(data['stock']),
        'image': data.get('image', '/images/default.jpg')
    }
    
    products.append(new_product)
    return jsonify(new_product), 201

@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id: int):
    """Update a product (admin function)"""
    product = next((p for p in products if p['id'] == product_id), None)
    
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Update product fields
    product.update(data)
    if 'price' in data:
        product['price'] = float(data['price'])
    if 'stock' in data:
        product['stock'] = int(data['stock'])
    
    return jsonify(product), 200

@app.route('/categories', methods=['GET'])
def get_categories():
    """Get all product categories"""
    categories = list(set([p['category'] for p in products]))
    return jsonify(categories), 200

@app.route('/contact', methods=['POST'])
def submit_contact():
    """Handle contact form submission"""
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    required_fields = ['name', 'email', 'message']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400
    
    # In production, this would save to database or send email
    return jsonify({
        'message': 'Thank you for contacting us! We will get back to you soon.',
        'timestamp': datetime.now().isoformat()
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


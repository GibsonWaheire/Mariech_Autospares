# Mariech Autospare Backend

Backend API for Mariech Autospare e-commerce site.

## Setup

1. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

- `GET /products` - Get all products (optional query param: `?category=Brakes`)
- `GET /products/<id>` - Get a specific product
- `POST /products` - Create a new product (admin)
- `PUT /products/<id>` - Update a product (admin)
- `GET /categories` - Get all product categories
- `POST /contact` - Submit contact form

## Location

Mariech Autospare
Kirinyaga Road, MSK Building
First Floor


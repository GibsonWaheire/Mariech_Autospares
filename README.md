# Mariech_Autospares

A complete e-commerce website for Mariech Autospare, an auto parts business located at Kirinyaga Road, MSK Building, First Floor.

## Project Structure

```
mariech_autospare_site/
├── backend/          # Flask API backend
│   ├── app.py       # Main Flask application
│   ├── models/      # Data models
│   ├── routes/      # API routes
│   ├── utils/       # Utility functions
│   └── requirements.txt
└── frontend/        # React frontend
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── pages/      # Page components
    │   ├── utils/      # API utilities
    │   └── App.jsx     # Main app component
    └── package.json
```

## Features

- **E-Commerce Product Catalog**: Browse products by category
- **Product Details**: Detailed product pages with pricing and stock information
- **About Us**: Information about the business
- **Contact Us**: Contact form for inquiries
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python app.py
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the port Vite assigns)

## API Endpoints

- `GET /products` - Get all products (optional: `?category=Brakes`)
- `GET /products/<id>` - Get a specific product
- `POST /products` - Create a new product (admin)
- `PUT /products/<id>` - Update a product (admin)
- `GET /categories` - Get all product categories
- `POST /contact` - Submit contact form

## Business Information

**Mariech Autospare**
- Location: Kirinyaga Road, MSK Building, First Floor
- City: Nairobi, Kenya

## Technologies Used

- **Backend**: Flask, Flask-CORS
- **Frontend**: React, React Router, Vite, Tailwind CSS
- **Styling**: Tailwind CSS

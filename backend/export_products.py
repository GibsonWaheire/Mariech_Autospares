#!/usr/bin/env python3
"""Export products from backend to JSON"""
import sys
import json
import os

# Add backend directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import initialize_products, products

if __name__ == '__main__':
    # Initialize products
    initialize_products()
    
    # Export as JSON
    output = json.dumps(products, indent=2, default=str)
    print(output)

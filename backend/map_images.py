#!/usr/bin/env python3
"""
Image Path Mapping Script
Maps product names to actual image filenames in public/product-images/
"""

import os
import re
import json
from pathlib import Path

# Paths
PRODUCTS_JS_PATH = Path(__file__).parent.parent / 'frontend' / 'src' / 'data' / 'products.js'
IMAGES_DIR = Path(__file__).parent.parent / 'frontend' / 'public' / 'product-images'

def normalize_filename(filename):
    """Normalize filename for comparison"""
    # Remove extension, convert to lowercase, remove special chars
    base = filename.rsplit('.', 1)[0].lower()
    # Remove " - copy", " copy", " (n)", etc.
    base = re.sub(r'\s*-\s*copy\s*\(?\d*\)?', '', base)
    base = re.sub(r'\s*\([^)]*\)', '', base)  # Remove parentheses content
    base = re.sub(r'\s+', ' ', base).strip()
    return base

def extract_keywords(product_name, category, subcategory):
    """Extract keywords from product name for matching"""
    keywords = []
    
    # Add category/subcategory keywords
    if subcategory:
        keywords.extend(subcategory.lower().split())
    if category:
        keywords.extend(category.lower().split())
    
    # Extract from product name
    name_lower = product_name.lower()
    
    # Remove size variants (H1, H3, H4, etc.)
    name_lower = re.sub(r'\s*-\s*(h\d+|900\d+)\s*$', '', name_lower)
    
    # Remove model variants
    name_lower = re.sub(r'\s*-\s*(toyota|mazda|honda|nissan|ford|universal).*$', '', name_lower)
    
    # Split into words
    words = re.findall(r'\b\w+\b', name_lower)
    keywords.extend(words)
    
    # Remove common words
    stop_words = {'the', 'a', 'an', 'and', 'or', 'but', 'for', 'with', 'plus', 't2'}
    keywords = [w for w in keywords if w not in stop_words and len(w) > 2]
    
    return set(keywords)

def find_matching_image(product_name, category, subcategory, existing_images):
    """Find matching image for a product"""
    product_keywords = extract_keywords(product_name, category, subcategory)
    
    best_match = None
    best_score = 0
    
    for img_file in existing_images:
        img_normalized = normalize_filename(img_file)
        img_keywords = set(re.findall(r'\b\w+\b', img_normalized))
        
        # Calculate match score
        common_keywords = product_keywords.intersection(img_keywords)
        score = len(common_keywords)
        
        # Boost score for exact name matches
        if product_name.lower().replace(' ', '') in img_normalized.replace(' ', ''):
            score += 10
        
        # Boost for category matches
        if subcategory and subcategory.lower() in img_normalized:
            score += 5
        
        if score > best_score:
            best_score = score
            best_match = img_file
    
    return best_match if best_score > 0 else None

def main():
    # Read actual image files
    if not IMAGES_DIR.exists():
        print(f"Error: Images directory not found: {IMAGES_DIR}")
        return
    
    image_files = [f.name for f in IMAGES_DIR.iterdir() if f.is_file() and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.webp', '.avif']]
    print(f"Found {len(image_files)} image files")
    
    # Read products.js (simplified - we'll need to parse it properly)
    if not PRODUCTS_JS_PATH.exists():
        print(f"Error: Products file not found: {PRODUCTS_JS_PATH}")
        return
    
    # For now, let's create a mapping based on patterns
    # We'll need to update products.js manually or with a more sophisticated parser
    
    # Create a simple mapping dictionary
    mapping = {}
    
    # Common mappings based on patterns
    common_mappings = {
        'download tobby.jpg': None,  # Need to find actual file
        'download (100) - Copy.jpg': None,
        'Tobys-T2-Plus-H4-LED-Headlight-HiLo-Beam-150W - Copy (2).webp': None,
    }
    
    # Try to find matches
    for ref_name in common_mappings.keys():
        ref_normalized = normalize_filename(ref_name)
        for img_file in image_files:
            img_normalized = normalize_filename(img_file)
            if ref_normalized in img_normalized or img_normalized in ref_normalized:
                common_mappings[ref_name] = img_file
                break
    
    print("\nMapping results:")
    for ref, actual in common_mappings.items():
        if actual:
            print(f"  {ref} -> {actual}")
        else:
            print(f"  {ref} -> NOT FOUND")
    
    # Now let's check for product-specific patterns
    print("\n\nSample image files:")
    for img in sorted(image_files)[:20]:
        print(f"  {img}")

if __name__ == '__main__':
    main()

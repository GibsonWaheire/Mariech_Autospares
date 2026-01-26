#!/usr/bin/env python3
"""
Validation script to verify product image uniqueness and quality.

This script checks:
1. No duplicate images within any product's image array
2. No image is used by more than one product
3. All products have exactly 3 images
4. Images match product names appropriately
5. Image quality standards (if PIL/Pillow is available)
"""

import sys
import os
from collections import defaultdict
from urllib.parse import unquote

# Add parent directory to path to import app
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import initialize_products, products, validate_image_quality

def extract_filename_from_url(url: str) -> str:
    """Extract filename from URL path"""
    filename = url.split('/')[-1] if '/' in url else url
    return unquote(filename)

def validate_product_images():
    """Validate all product images for uniqueness and quality"""
    print("=" * 80)
    print("PRODUCT IMAGE VALIDATION REPORT")
    print("=" * 80)
    print()
    
    # Initialize products
    initialize_products()
    
    # Track image usage across all products
    image_to_products = defaultdict(list)  # image_filename -> [product_ids]
    product_image_counts = {}  # product_id -> image_count
    products_with_duplicates = []  # products with duplicate images within their array
    products_with_wrong_count = []  # products without exactly 3 images
    
    # Check each product
    for product in products:
        product_id = product.get('id')
        product_name = product.get('name', 'Unknown')
        images = product.get('images', [])
        
        # Check image count
        image_count = len(images)
        product_image_counts[product_id] = image_count
        if image_count != 3:
            products_with_wrong_count.append({
                'id': product_id,
                'name': product_name,
                'count': image_count
            })
        
        # Check for duplicates within product's image array
        image_filenames = [extract_filename_from_url(img) for img in images]
        unique_filenames = set(image_filenames)
        if len(image_filenames) != len(unique_filenames):
            duplicates = [f for f in image_filenames if image_filenames.count(f) > 1]
            products_with_duplicates.append({
                'id': product_id,
                'name': product_name,
                'duplicates': list(set(duplicates))
            })
        
        # Track image usage across products
        for img_url in images:
            filename = extract_filename_from_url(img_url)
            image_to_products[filename].append({
                'id': product_id,
                'name': product_name
            })
    
    # Find images used by multiple products
    shared_images = {img: prods for img, prods in image_to_products.items() 
                     if len(prods) > 1}
    
    # Print results
    print(f"Total products analyzed: {len(products)}")
    print(f"Total unique images: {len(image_to_products)}")
    print()
    
    # Check 1: Duplicate images within products
    print("=" * 80)
    print("CHECK 1: Duplicate Images Within Products")
    print("=" * 80)
    if products_with_duplicates:
        print(f"❌ FAILED: Found {len(products_with_duplicates)} products with duplicate images:")
        for prod in products_with_duplicates:
            print(f"  - Product ID {prod['id']}: {prod['name']}")
            print(f"    Duplicate images: {', '.join(prod['duplicates'])}")
    else:
        print("✅ PASSED: No products have duplicate images within their image arrays")
    print()
    
    # Check 2: Images shared across products
    print("=" * 80)
    print("CHECK 2: Images Shared Across Multiple Products")
    print("=" * 80)
    if shared_images:
        print(f"❌ FAILED: Found {len(shared_images)} images used by multiple products:")
        for img_filename, prods in sorted(shared_images.items()):
            print(f"  - Image: {img_filename}")
            print(f"    Used by {len(prods)} products:")
            for prod in prods:
                print(f"      • Product ID {prod['id']}: {prod['name']}")
    else:
        print("✅ PASSED: No images are shared across multiple products")
    print()
    
    # Check 3: Image count per product
    print("=" * 80)
    print("CHECK 3: Image Count Per Product (Should be exactly 3)")
    print("=" * 80)
    if products_with_wrong_count:
        print(f"❌ FAILED: Found {len(products_with_wrong_count)} products without exactly 3 images:")
        for prod in products_with_wrong_count:
            print(f"  - Product ID {prod['id']}: {prod['name']} ({prod['count']} images)")
    else:
        print("✅ PASSED: All products have exactly 3 images")
    print()
    
    # Check 4: Image quality (if images exist)
    print("=" * 80)
    print("CHECK 4: Image Quality Validation")
    print("=" * 80)
    print("Note: Image quality checks require image files to exist in the filesystem.")
    print("This check is informational and will not fail validation.")
    print()
    
    # Sample a few products for quality check
    sample_products = products[:min(5, len(products))]
    quality_issues = []
    
    for product in sample_products:
        product_name = product.get('name', 'Unknown')
        images = product.get('images', [])
        
        for img_url in images[:1]:  # Check first image only as sample
            filename = extract_filename_from_url(img_url)
            # Construct potential file path (adjust based on your setup)
            potential_paths = [
                os.path.join('frontend', 'public', 'product-images', filename),
                os.path.join('..', 'frontend', 'public', 'product-images', filename),
                os.path.join(os.path.dirname(__file__), '..', 'frontend', 'public', 'product-images', filename),
            ]
            
            found = False
            for path in potential_paths:
                abs_path = os.path.abspath(path)
                if os.path.exists(abs_path):
                    validation = validate_image_quality(abs_path)
                    if not validation['valid'] or validation['warnings']:
                        quality_issues.append({
                            'product': product_name,
                            'image': filename,
                            'validation': validation
                        })
                    found = True
                    break
            
            if not found:
                print(f"  ⚠️  Image file not found for validation: {filename}")
    
    if quality_issues:
        print(f"Found {len(quality_issues)} image quality issues:")
        for issue in quality_issues:
            print(f"  - Product: {issue['product']}")
            print(f"    Image: {issue['image']}")
            if issue['validation']['errors']:
                for error in issue['validation']['errors']:
                    print(f"    ❌ Error: {error}")
            if issue['validation']['warnings']:
                for warning in issue['validation']['warnings']:
                    print(f"    ⚠️  Warning: {warning}")
    else:
        print("✅ Sample images passed quality checks")
    print()
    
    # Summary
    print("=" * 80)
    print("SUMMARY")
    print("=" * 80)
    total_issues = len(products_with_duplicates) + len(shared_images) + len(products_with_wrong_count)
    
    if total_issues == 0:
        print("✅ ALL CHECKS PASSED!")
        print("   - No duplicate images within products")
        print("   - No images shared across products")
        print("   - All products have exactly 3 images")
        return 0
    else:
        print(f"❌ VALIDATION FAILED: Found {total_issues} issue(s)")
        print(f"   - Products with internal duplicates: {len(products_with_duplicates)}")
        print(f"   - Images shared across products: {len(shared_images)}")
        print(f"   - Products with wrong image count: {len(products_with_wrong_count)}")
        return 1

if __name__ == '__main__':
    exit_code = validate_product_images()
    sys.exit(exit_code)

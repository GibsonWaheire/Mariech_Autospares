from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
from typing import Dict, List, Optional
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Comprehensive products database with 150+ products
products: List[Dict] = []

# Image Registry to track used images and prevent duplicates
class ImageRegistry:
    """Tracks image usage to ensure no duplicate images across products"""
    def __init__(self):
        self.used_images = set()  # Set of image filenames that have been assigned
        self.product_image_map = {}  # product_id -> [image filenames]
    
    def register_images(self, product_id: int, images: List[str]) -> None:
        """Register images for a product and mark them as used"""
        # Extract filenames from URLs if needed
        image_filenames = []
        for img in images:
            # Extract filename from URL path
            filename = img.split('/')[-1] if '/' in img else img
            # Decode URL encoding
            from urllib.parse import unquote
            filename = unquote(filename)
            image_filenames.append(filename)
            self.used_images.add(filename)
        
        self.product_image_map[product_id] = image_filenames
    
    def is_available(self, image_filename: str) -> bool:
        """Check if an image filename is available (not already used)"""
        # Extract filename from URL if needed
        filename = image_filename.split('/')[-1] if '/' in image_filename else image_filename
        from urllib.parse import unquote
        filename = unquote(filename)
        return filename not in self.used_images
    
    def get_unique_alternatives(self, preferred_images: List[str], category: str, subcategory: str, all_image_mappings: Dict) -> List[str]:
        """Find alternative unique images if preferred ones are already taken"""
        available_images = []
        
        # First, try to find images from the same category/subcategory
        cat_lower = category.lower() if category else ""
        subcat_lower = (subcategory or "").lower()
        
        # Collect all images from matching categories
        candidate_images = []
        for key, images in all_image_mappings.items():
            if (cat_lower and any(word in key for word in cat_lower.split() if len(word) > 2)) or \
               (subcat_lower and any(word in key for word in subcat_lower.split() if len(word) > 2)):
                candidate_images.extend(images)
        
        # Add preferred images first (they might have become available)
        candidate_images = preferred_images + candidate_images
        
        # Remove duplicates while preserving order
        seen = set()
        unique_candidates = []
        for img in candidate_images:
            filename = img.split('/')[-1] if '/' in img else img
            from urllib.parse import unquote
            filename = unquote(filename)
            if filename not in seen:
                seen.add(filename)
                unique_candidates.append(img)
        
        # Filter to only available images
        for img in unique_candidates:
            if self.is_available(img):
                available_images.append(img)
                if len(available_images) >= 3:
                    break
        
        return available_images[:3]

# Global image registry instance
image_registry = ImageRegistry()

# Products are now loaded from products_data.py - no more generation functions

# Helper function to generate 2-3 images per product based on category/subcategory
def extract_image_number(filename: str) -> Optional[int]:
    """Extract image number (1, 2, or 3) from filename"""
    filename_lower = filename.lower()
    
    # Pattern 1: name1.jpg, name2.jpg, name3.jpg (standalone number)
    match = re.search(r'(\d+)(?:\s|$|\.|-)', filename_lower)
    if match:
        num = int(match.group(1))
        if num in [1, 2, 3]:
            return num
    
    # Pattern 2: name.jpg (no number = 1), name (2).jpg, name (3).jpg
    # Check if there's no number pattern at all (base image = 1)
    has_number = re.search(r'\([0-9]+\)', filename_lower) or re.search(r'\d+', filename_lower.split('.')[0])
    if not has_number:
        return 1
    
    # Pattern 3: name (2).jpg, name (3).jpg, name (4).jpg, name (5).jpg
    match = re.search(r'\(([0-9]+)\)', filename_lower)
    if match:
        num = int(match.group(1))
        if num == 2:
            return 2
        elif num == 3:
            return 3
        elif num == 4:  # Some use (4) as (2)
            return 2
        elif num == 5:  # Some use (5) as (3)
            return 3
    
    return None

def extract_base_product_name(product_name: str) -> str:
    """Extract base product name by removing size/model variants"""
    # Remove size variants like "- H4", "- H7", "- 9005", etc.
    base = re.sub(r'\s*-\s*(H\d+|900\d+)\s*$', '', product_name, flags=re.IGNORECASE)
    # Remove model variants like "- Toyota Harrier", "- Mazda Demio", etc.
    base = re.sub(r'\s*-\s*(Toyota|Mazda|Honda|Nissan|Ford|Universal|Left|Right|Pair|3 inch|4 inch|5 inch|3x3 inch|4x4 inch|Round|Square|F-Series).*$', '', base, flags=re.IGNORECASE)
    return base.strip()

def validate_image_quality(image_path: str, min_width: int = 800, min_height: int = 600) -> Dict[str, any]:
    """Validate image quality and return validation results.
    
    Args:
        image_path: Path to the image file
        min_width: Minimum required width in pixels (default: 800)
        min_height: Minimum required height in pixels (default: 600)
    
    Returns:
        Dictionary with validation results:
        {
            'valid': bool,
            'width': int or None,
            'height': int or None,
            'format': str or None,
            'file_size': int or None,
            'errors': List[str],
            'warnings': List[str]
        }
    """
    import os
    from pathlib import Path
    
    result = {
        'valid': True,
        'width': None,
        'height': None,
        'format': None,
        'file_size': None,
        'errors': [],
        'warnings': []
    }
    
    try:
        # Check if file exists
        if not os.path.exists(image_path):
            result['valid'] = False
            result['errors'].append(f"Image file not found: {image_path}")
            return result
        
        # Get file size
        file_size = os.path.getsize(image_path)
        result['file_size'] = file_size
        
        # Check file size (warn if too large, recommend < 500KB)
        if file_size > 500 * 1024:  # 500KB
            result['warnings'].append(f"Image file size ({file_size / 1024:.1f}KB) exceeds recommended 500KB")
        
        # Get file extension/format
        ext = Path(image_path).suffix.lower()
        result['format'] = ext[1:] if ext else None
        
        # Validate format
        valid_formats = ['jpg', 'jpeg', 'png', 'webp', 'avif']
        if result['format'] not in valid_formats:
            result['warnings'].append(f"Image format '{result['format']}' may not be optimal. Recommended: {', '.join(valid_formats)}")
        
        # Try to get image dimensions (requires PIL/Pillow)
        try:
            from PIL import Image
            with Image.open(image_path) as img:
                width, height = img.size
                result['width'] = width
                result['height'] = height
                
                # Check dimensions
                if width < min_width or height < min_height:
                    result['valid'] = False
                    result['errors'].append(
                        f"Image dimensions ({width}x{height}) below minimum required ({min_width}x{min_height})"
                    )
                elif width < 1200 or height < 900:
                    result['warnings'].append(
                        f"Image dimensions ({width}x{height}) below recommended (1200x900) for high quality"
                    )
        except ImportError:
            result['warnings'].append("PIL/Pillow not available, cannot validate image dimensions")
        except Exception as e:
            result['warnings'].append(f"Could not read image dimensions: {str(e)}")
    
    except Exception as e:
        result['valid'] = False
        result['errors'].append(f"Error validating image: {str(e)}")
    
    return result

def get_product_images(category: str, subcategory: str = None, product_name: str = "", product_id: int = None) -> List[str]:
    """Get exactly 3 unique product images from uploaded assets based on product name keywords.
    Ensures no duplicate images across products and removes duplicates within the product's image set."""
    import os
    import re
    from urllib.parse import quote, unquote
    
    # Base URL for product images (served from public folder)
    base_url = "/product-images"
    
    # Extract base product name (remove size/model variants)
    base_name = extract_base_product_name(product_name) if product_name else ""
    name_lower = base_name.lower() if base_name else ""
    subcat_lower = (subcategory or "").lower()
    cat_lower = category.lower() if category else ""
    
    # Comprehensive image filename mappings - each product gets exactly 3 unique images
    image_mappings = {
        # LED Headlights
        "toby": ["download tobby.jpg", "Tobys-T2-Plus-H4-LED-Headlight-HiLo-Beam-150W - Copy (2).webp", "download (100) - Copy.jpg"],
        "mark x": ["mark x - Copy (2).jpg", "mark x headlights - Copy (2).jpg", "mark x headlights.jpg"],
        "app led": ["led - Copy.avif", "New-High-Power-P11-Lampada-H7-H4-LED-Headlights-for-Cars-Bulbs-12V-White-6500K-20000lm-H1-H3-H11-H13-9005-9006-Fog-Lights-Carro-Headlight-Bulb - Copy.avif", "led - Copy.avif"],
        "b-led": ["bled projector 1.jpg", "bled projector (2).jpg", "bled projector (3).jpg"],
        
        # Projector Headlights
        "single led": ["single led - Copy (2).jpg", "sinle led - Copy.jpg", "single led projector.jpg"],
        "bi-led": ["bi led 1.jpg", "bi led (2).jpg", "bi led (3).jpg"],
        "tri-led": ["tri led - Copy (2).jpg", "tri led (4).jpg", "tri led (5).jpg"],
        
        # Fog Lights
        "round fog": ["round foglights - Copy (2).jpg", "round foglights (4).jpg", "round foglights (5).jpg"],
        "square fog": ["square foglights - Copy (2).jpg", "square foglights (4).jpg", "square foglights (5).jpg"],
        "universal led fog": ["universal led foglights - Copy.jpg", "universal led f - Copy.jpg", "universal led f (2).jpg"],
        
        # Headlight Lenses
        "headlight lens": ["headlight lenses.jpg", "headlight lenses (2).jpg", "headlight lenses (3).jpg"],
        
        # DRLs
        "strip drl": ["strip drl - Copy (2).jpg", "strip drl (4).jpg", "strip drl (5).jpg"],
        "round drl": ["round drl - Copy (2).jpg", "round drl (4).jpg", "round drl (5).jpg"],
        "square drl": ["square drl - Copy (2).jpg", "square drl (4).jpg", "square drl (5).jpg"],
        "universal drl": ["universal drl kit - Copy.jpg", "universal drl kit (2) - Copy.jpg", "universal drl kit (3) - Copy.jpg"],
        
        # Horns
        "horn for toyota": ["horn toyota.jpg", "horn toyota (2).jpg", "horn toyota (3).jpg"],
        "horn for mazda": ["horn mazda.jpg", "horn mazda (2).jpg", "horn mazda (3).jpg"],
        "universal electric horn": ["uniersal electic horn - Copy (2).jpg", "universal ele horn - Copy.jpg", "universal electric horn - Copy.jpg"],
        "air horn": ["air horn kit.jpg", "air horn kit (2).jpg", "air horn kit (3).jpg"],
        
        # Alarms
        "basic car alarm": ["basic car alarm 1.jpg", "basic car alarm 2.jpg", "basic car alarm3.jpg"],
        "remote car alarm": ["remote car alarm - Copy (2).jpg", "remote car alarm (4).jpg", "remote car alarm (5).jpg"],
        "gps": ["gps.jpg", "gps (2).jpg", "gps (3).jpg"],
        "immobilizer": ["immobilizer.jpg", "immobilizer (2).jpg", "immobilizer (3).jpg"],
        
        # Turbo Timers
        "hks turbo": ["hks turbo timer.jpg", "hks turbo.jpg", "hks turbo (2).jpg"],
        "universal turbo": ["universal turbo - Copy.jpg", "universal turbo (2).jpg", "universal turbo (3).jpg"],
        
        # Body Parts - Bonnets
        "bonnet": ["bonnet1.jpg", "bonnet (2).jpg", "bonnet (3).jpg"],
        
        # Bumpers
        "front bumper": ["front bumper.jpg", "front bumper (2).jpg", "front bumper (3).jpg"],
        "rear bumper": ["rear bumper - Copy (2).jpg", "rear bumper (3) - Copy.jpg", "rear bumper 1 - Copy.jpg"],
        "real bumper": ["real bumper 1 - Copy.jpg", "real bumper 2 - Copy.jpg", "real bumper 3 - Copy.jpg"],
        "bumper lip": ["bumper lip 1 - Copy.jpg", "bumper lip2 - Copy.jpg", "bumper lip 3 - Copy.jpg"],
        
        # Spoilers
        "saloon spoiler": ["saloon spoiler 1 - Copy.jpg", "saloon spoiler 2 - Copy.jpg", "saloon spoiler 3 - Copy.jpg"],
        "hatchback spoiler": ["hatchback spoiler 1 - Copy.jpg", "hatchback spoiler 2 - Copy.jpg", "hatchback sp[oiler 3 - Copy.jpg"],
        
        # Fenders
        "fender left": ["fender left - Copy.jpg", "fender left 3 - Copy.jpg", "fender left 2 - Copy.jpg"],
        "fender right": ["fender right - Copy.jpg", "fender right 1 - Copy.jpg", "fender right2 - Copy.jpg"],
        "fender": ["fender left - Copy.jpg", "fender right - Copy.jpg", "fender right 1 - Copy.jpg"],
        
        # Side Mirrors
        "side mirror left": ["side mirror left - Copy.jpg", "side ,irror left - Copy.jpg", "side mirror 2 - Copy.jpg"],
        "side mirror right": ["side mirror right2 - Copy.jpg", "side mirror roght1 - Copy.jpg", "side morror right3 - Copy.jpg"],
        
        # Grille
        "grille": ["grille 1 - Copy.jpg", "grille2 - Copy.jpg", "grille3 - Copy.jpg"],
        
        # Door Handle
        "door handle": ["door handle1 - Copy.jpg", "doorhandle2 - Copy.jpg", "doorhandle3 - Copy.jpg"],
        
        # Gear Knobs
        "automatic gear knob": ["Automatic Gear Knob1 - Copy.jpg", "Automatic Gear Knob2 - Copy.jpg", "Automatic Gear Knob3 - Copy.jpg"],
        "manual gear knob": ["Manual Gear Knob1 - Copy.jpg", "Manual Gear Knob2 - Copy.jpg", "Manual Gear Knob3 - Copy.jpg"],
        "sport gear knob": ["Sport Gear Knob1 - Copy.jpg", "Sport Gear Knob2 - Copy.jpg", "Sport Gear Knob3 - Copy.jpg"],
        "leather gear knob": ["Leather Gear Knob1 - Copy.jpg", "Leather Gear Knob2 - Copy.jpg", "Leather Gear Knob3 - Copy.jpg"],
        
        # Wind Breakers
        "wind breaker": ["Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy - Copy (3).jpg", "Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy (5) - Copy.jpg", "Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy (6).jpg"],
        
        # Mud Flaps
        "front mud flaps": ["Front Mud Flaps1 - Copy.jpg", "Front Mud Flaps2 - Copy.jpg", "Front Mud Flaps3 - Copy.jpg"],
        "rear mud flaps": ["Rear Mud Flaps1 - Copy.jpg", "Rear Mud Flaps2 - Copy.jpg", "Rear Mud Flaps3 - Copy.jpg"],
        "full set mud flaps": ["Full Set Mud Flaps1 - Copy.jpg", "Full Set Mud Flaps2 - Copy.jpg", "Full Set Mud Flaps3 - Copy.jpg"],
        
        # Boot Shocks
        "boot left shock": ["boot shock left1 - Copy.jpg", "bootshock left2 - Copy.jpg", "bootshock left 3 - Copy.jpg"],
        "boot right shock": ["boot shock r1ght1 - Copy.jpg", "bootright shock2 - Copy.jpg", "bootright shock 3 - Copy.jpg"],
        "boot pair shock": ["boot shock left1 - Copy.jpg", "boot shock r1ght1 - Copy.jpg", "bootshock left2 - Copy.jpg"],
        
        # Car Mats
        "standard car mats": ["Standard Car Mats1 - Copy.jpg", "Standard Car Mats2 - Copy.jpg", "Standard Car Mats3 - Copy.jpg"],
        "premium car mats": ["Premium Car Mats1 - Copy.jpg", "Premium Car Mats2 - Copy.jpg", "Premium Car Mats3 - Copy.jpg"],
        "rubber car mats": ["Rubber Car Mats1 - Copy.jpg", "Rubber Car Mats2 - Copy.jpg", "Rubber Car Mats3 - Copy.jpg"],
        "custom fit car mats": ["Custom Fit Car Mats1 - Copy.jpg", "Custom Fit Car Mats2 - Copy.jpg", "Custom Fit Car Mats3 - Copy.jpg"],
        
        # Interior Trims
        "dashboard trim": ["Dashboard Trim1 - Copy.jpg", "Dashboard Trim2 - Copy.jpg", "Dashboard Trim3 - Copy.jpg"],
        "door trim": ["Door Trim1 - Copy.jpg", "Door Trim2 - Copy.jpg", "Door Trim3 - Copy.jpg"],
        "center console trim": ["Center Console Trim1 - Copy.jpg", "Center Console Trim2 - Copy.jpg", "Center Console Trim3 - Copy.jpg"],
        "steering wheel trim": ["Steering Wheel Trim1 - Copy.jpg", "Steering Wheel Trim2 - Copy (2).jpg", "Steering Wheel Trim3 - Copy (2).jpg"],
        
        # LED Lights
        "led tail": ["led tail lights.jpg", "led tail lights - Copy.jpg", "led tail - Copy (2).jpg"],
        "led brake": ["led brake.jpg", "led brake (2) - Copy.jpg", "led brake lights.jpg"],
        "led turn": ["led turn signals - Copy (2).jpg", "led turn signals (4) - Copy.jpg", "led turn signals (5) - Copy.jpg"],
        "led interior": ["led interior.jpg", "led interior lights - Copy - Copy.jpg", "led interior lights.jpg"],
        "led license": ["led license plate.jpg", "led license plate (2).jpg", "led locense plate.jpg"],
    }
    
    # Try to find matching images based on product name keywords
    matched_images = []
    name_lower_clean = re.sub(r'[^\w\s]', '', name_lower)
    
    # Improved matching: prioritize exact product name matches
    # Match by product name keywords (most specific first)
    for key, images in image_mappings.items():
        # Check for exact match or key contained in product name
        if key in name_lower_clean or key in name_lower or name_lower in key:
            matched_images = images.copy()  # Make a copy to avoid modifying original
            break
    
    # If no exact match, try category/subcategory matching
    if not matched_images:
        cat_key = f"{subcat_lower}" if subcat_lower else f"{cat_lower}"
        for key, images in image_mappings.items():
            if key in cat_key or cat_key in key:
                matched_images = images.copy()
                break
    
    # If still no match, try partial keyword matching
    if not matched_images:
        for key, images in image_mappings.items():
            # Check if any word from key is in product name
            key_words = key.split()
            name_words = name_lower_clean.split()
            if any(kw in name_words for kw in key_words if len(kw) > 2):
                matched_images = images.copy()
                break
    
    # Remove duplicates within matched_images (ensure unique within product)
    seen_filenames = set()
    unique_matched = []
    for img in matched_images:
        filename = img.split('/')[-1] if '/' in img else img
        filename = unquote(filename) if '%' in filename else filename
        if filename not in seen_filenames:
            seen_filenames.add(filename)
            unique_matched.append(img)
    matched_images = unique_matched
    
    # Filter out images that are already used by other products
    available_images = []
    for img in matched_images:
        if image_registry.is_available(img):
            available_images.append(img)
            if len(available_images) >= 3:
                break
    
    # If we don't have 3 available images, find alternatives
    if len(available_images) < 3:
        alternatives = image_registry.get_unique_alternatives(
            matched_images, category, subcategory, image_mappings
        )
        # Add alternatives that aren't already in available_images
        seen = {img.split('/')[-1] if '/' in img else img for img in available_images}
        for alt in alternatives:
            alt_filename = alt.split('/')[-1] if '/' in alt else alt
            alt_filename = unquote(alt_filename) if '%' in alt_filename else alt_filename
            if alt_filename not in seen and image_registry.is_available(alt):
                available_images.append(alt)
                seen.add(alt_filename)
                if len(available_images) >= 3:
                    break
    
    # Ensure we have exactly 3 images
    if len(available_images) < 3:
        # Fallback: use category-based images or default
        fallback_images = []
        if "led" in cat_lower or "led" in subcat_lower:
            fallback_images = ["led - Copy.avif"]
        elif "bumper" in cat_lower or "bumper" in subcat_lower:
            fallback_images = ["front bumper.jpg", "front bumper (2).jpg", "front bumper (3).jpg"]
        else:
            fallback_images = ["download (100) - Copy.jpg"]
        
        # Add fallback images that are available
        seen = {img.split('/')[-1] if '/' in img else img for img in available_images}
        for fb_img in fallback_images:
            fb_filename = fb_img.split('/')[-1] if '/' in fb_img else fb_img
            if fb_filename not in seen and image_registry.is_available(fb_img):
                available_images.append(fb_img)
                seen.add(fb_filename)
                if len(available_images) >= 3:
                    break
        
        # If still not enough, pad with available images (last resort)
        while len(available_images) < 3 and available_images:
            available_images.append(available_images[-1])
    
    # Sort images by number (1, 2, 3) if possible for consistency
    try:
        sorted_images = sorted(available_images[:3], key=lambda x: extract_image_number(x.split('/')[-1] if '/' in x else x) or 0)
        available_images = sorted_images[:3]
    except:
        available_images = available_images[:3]
    
    # Register images with the registry if product_id is provided
    if product_id is not None:
        image_registry.register_images(product_id, available_images)
    
    # Return exactly 3 images with proper URLs
    return [f"{base_url}/{quote(img)}" for img in available_images[:3]]

# Load products from data file
def initialize_products():
    global products
    product_id = 1
    
    # LIGHTING & ELECTRICAL - LED Headlights
    led_headlights = [
        {"name": "Toby's T2 Plus LED Headlights", "sizes": ["H1", "H3", "H4", "H7", "H11", "9005", "9006"], "base_price": 8500, "car_models": ["Universal"], "description": "Premium LED headlights with superior brightness and long lifespan"},
        {"name": "APP LED Headlights", "sizes": ["H1", "H3", "H4", "H7", "H11", "9005", "9006"], "base_price": 7200, "car_models": ["Universal"], "description": "High-performance APP LED headlights for all vehicle types"},
        {"name": "Mark X LED Headlights", "sizes": ["H4", "H7"], "base_price": None, "car_models": ["Toyota Mark X"], "description": "Direct fit LED headlights for Toyota Mark X", "price_varies": True},
        {"name": "B-LED Projector F-Series", "sizes": ["H1", "H7"], "base_price": 12000, "car_models": ["Ford F-Series", "Universal"], "description": "Bi-LED projector headlights with advanced optics"},
    ]
    
    for headlight in led_headlights:
        for size in headlight["sizes"]:
            for model in headlight["car_models"]:
                # Calculate discount for some products (15-20% for popular items)
                base_price = headlight["base_price"]
                discount_percent = 0
                original_price = None
                is_bestseller = "Toby" in headlight['name'] and size in ["H4", "H7", "H11"]
                is_new = headlight['name'] == "B-LED Projector F-Series"
                
                # Add discounts to popular products
                if base_price and not headlight.get("price_varies"):
                    if "Toby" in headlight['name'] and size in ["H4", "H7"]:
                        discount_percent = 15
                        original_price = base_price / (1 - discount_percent / 100)
                    elif headlight['name'] == "B-LED Projector F-Series":
                        discount_percent = 17
                        original_price = base_price / (1 - discount_percent / 100)
                    elif product_id % 5 == 0:
                        discount_percent = 20
                        original_price = base_price / (1 - discount_percent / 100)
                
                products.append({
                    "id": product_id,
                    "name": f"{headlight['name']} - {size}",
                    "category": "Lighting & Electrical",
                    "subcategory": "LED Headlights",
                    "price": base_price,
                    "original_price": original_price,
                    "discount_percent": discount_percent if discount_percent > 0 else None,
                    "price_varies": headlight.get("price_varies", False),
                    "description": create_product_description(f"{headlight['name']} - {size}", "Lighting & Electrical", "LED Headlights", size, model),
                    "stock": 15 if headlight.get("price_varies") else 25,
                    "images": get_product_images("Lighting & Electrical", "LED Headlights", f"{headlight['name']} - {size}", product_id),
                    "sku": f"LED-{size}-{product_id:03d}",
                    "size": size,
                    "compatible_cars": [model] if model != "Universal" else ["All Models"],
                    "car_make": "Universal" if model == "Universal" else model.split()[0],
                    "car_model": model if model != "Universal" else None,
                    "year_range": None,
                    "variants": [size],
                    "is_bestseller": is_bestseller,
                    "is_new": is_new
                })
                product_id += 1
    
    # Projector Headlights
    projector_headlights = [
        {"name": "Single LED Projector Headlights", "sizes": ["H1", "H4", "H7"], "base_price": 9500, "car_models": ["Universal"]},
        {"name": "Bi-LED Projector Headlights", "sizes": ["H1", "H7"], "base_price": 13500, "car_models": ["Universal"]},
        {"name": "Tri-LED Projector Headlights", "sizes": ["H1"], "base_price": 18000, "car_models": ["Universal"]},
    ]
    
    for proj in projector_headlights:
        for size in proj["sizes"]:
            base_price = proj["base_price"]
            discount_percent = 0
            original_price = None
            is_new = "Bi-LED" in proj['name']
            
            if "Bi-LED" in proj['name'] and size == "H1":
                discount_percent = 17
                original_price = base_price / (1 - discount_percent / 100)
            
            products.append({
                "id": product_id,
                "name": f"{proj['name']} - {size}",
                "category": "Lighting & Electrical",
                "subcategory": "Projector Headlights",
                "price": base_price,
                "original_price": original_price,
                "discount_percent": discount_percent if discount_percent > 0 else None,
                "price_varies": False,
                "description": create_product_description(f"{proj['name']} - {size}", "Lighting & Electrical", "Projector Headlights", size, None),
                "stock": 20,
                "images": get_product_images("Lighting & Electrical", "Projector Headlights", f"{proj['name']} - {size}", product_id),
                "sku": f"PROJ-{size}-{product_id:03d}",
                "size": size,
                "compatible_cars": ["All Models"],
                "car_make": "Universal",
                "car_model": None,
                "year_range": None,
                "variants": [size],
                "is_bestseller": False,
                "is_new": is_new
            })
            product_id += 1
    
    # Fog Lights
    fog_lights = [
        {"name": "Round Fog Lights", "types": ["3 inch", "4 inch", "5 inch"], "base_price": 4500, "car_models": ["Universal"]},
        {"name": "Square Fog Lights", "types": ["3x3 inch", "4x4 inch"], "base_price": 5200, "car_models": ["Universal"]},
        {"name": "Universal LED Fog Lights", "types": ["Round", "Square"], "base_price": 6800, "car_models": ["Universal"]},
    ]
    
    for fog in fog_lights:
        for fog_type in fog["types"]:
            products.append({
                "id": product_id,
                "name": f"{fog['name']} - {fog_type}",
                "category": "Lighting & Electrical",
                "subcategory": "Fog Lights",
                "price": fog["base_price"],
                "price_varies": False,
                "description": create_product_description(f"{fog_type} LED Fog Light", "Lighting & Electrical", "Fog Lights", None, None),
                "stock": 18,
                    "images": get_product_images("Lighting & Electrical", "Fog Lights", f"{fog['name']} - {fog_type}", product_id),
                "sku": f"FOG-{product_id:03d}",
                "size": fog_type,
                "compatible_cars": ["All Models"],
                "car_make": "Universal",
                "car_model": None,
                "year_range": None,
                "variants": [fog_type]
            ,
                    "is_bestseller": False,
                    "is_new": False})
            product_id += 1
    
    # Headlight Lenses
    for car_model in ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio", "Honda Fit"]:
        products.append({
            "id": product_id,
            "name": f"Headlight Lenses - {car_model}",
            "category": "Lighting & Electrical",
            "subcategory": "Headlight Lenses",
            "price": None,
            "price_varies": True,
            "description": create_product_description(f"Headlight Lens Cover - {car_model}", "Lighting & Electrical", "Headlight Lenses", None, car_model),
            "stock": 12,
            "images": get_product_images("Lighting & Electrical", "Headlight Lenses", f"Headlight Lenses - {car_model}", product_id),
            "sku": f"LENS-{product_id:03d}",
            "size": None,
            "compatible_cars": [car_model],
            "car_make": car_model.split()[0],
            "car_model": car_model,
            "year_range": "2010-2024",
            "variants": []
        ,
                    "is_bestseller": False,
                    "is_new": False})
        product_id += 1
    
    # DRLs (Daytime Running Lights)
    drl_types = ["Strip DRL", "Round DRL", "Square DRL", "Universal DRL Kit"]
    for drl in drl_types:
        products.append({
            "id": product_id,
            "name": drl,
            "category": "Lighting & Electrical",
            "subcategory": "DRLs",
            "price": 3500 if "Kit" in drl else 2800,
            "price_varies": False,
            "description": create_product_description(drl, "Lighting & Electrical", "DRLs", None, None),
            "stock": 22,
            "images": get_product_images("Lighting & Electrical", "DRLs", drl, product_id),
            "sku": f"DRL-{product_id:03d}",
            "size": None,
            "compatible_cars": ["All Models"],
            "car_make": "Universal",
            "car_model": None,
            "year_range": None,
            "variants": []
        ,
                    "is_bestseller": False,
                    "is_new": False})
        product_id += 1
    
    # Horns
    horn_models = [
        {"name": "Horn for Toyota Harrier", "car": "Toyota Harrier", "price": None, "price_varies": True},
        {"name": "Horn for Mazda Demio", "car": "Mazda Demio", "price": None, "price_varies": True},
        {"name": "Horn for Toyota Models", "car": "Toyota", "price": None, "price_varies": True},
        {"name": "Universal Electric Horn", "car": "Universal", "price": 2500, "price_varies": False},
        {"name": "Air Horn Kit", "car": "Universal", "price": 4500, "price_varies": False},
    ]
    
    for horn in horn_models:
        products.append({
            "id": product_id,
            "name": horn["name"],
            "category": "Lighting & Electrical",
            "subcategory": "Horns",
            "price": horn["price"],
            "price_varies": horn["price_varies"],
            "description": create_product_description(f"{horn['car']} Premium Horn Set", "Lighting & Electrical", "Horns", None, horn['car']),
            "stock": 15,
            "images": get_product_images("Lighting & Electrical", "Horns", horn["name"], product_id),
            "sku": f"HORN-{product_id:03d}",
            "size": None,
            "compatible_cars": [horn["car"]] if horn["car"] != "Universal" else ["All Models"],
            "car_make": horn["car"].split()[0] if horn["car"] != "Universal" else "Universal",
            "car_model": horn["car"] if horn["car"] != "Universal" else None,
            "year_range": None,
            "variants": []
        ,
                    "is_bestseller": False,
                    "is_new": False})
        product_id += 1
    
    # Alarms
    alarm_types = ["Basic Car Alarm", "Remote Car Alarm", "GPS Car Alarm", "Immobilizer Alarm System"]
    for alarm in alarm_types:
        products.append({
            "id": product_id,
            "name": alarm,
            "category": "Lighting & Electrical",
            "subcategory": "Alarms",
            "price": 3500 if "Basic" in alarm else (5500 if "Remote" in alarm else (12000 if "GPS" in alarm else 4500)),
            "price_varies": False,
            "description": create_product_description(alarm, "Lighting & Electrical", "Alarms", None, None),
            "stock": 10,
            "images": get_product_images("Lighting & Electrical", "Alarms", alarm, product_id),
            "sku": f"ALM-{product_id:03d}",
            "size": None,
            "compatible_cars": ["All Models"],
            "car_make": "Universal",
            "car_model": None,
            "year_range": None,
            "variants": []
        ,
                    "is_bestseller": False,
                    "is_new": False})
        product_id += 1
    
    # Turbo Timers
    turbo_timers = [
        {"name": "HKS Turbo Timer", "price": 8500, "description": "Premium HKS turbo timer for engine protection"},
        {"name": "Universal Turbo Timer", "price": 4500, "description": "Standard turbo timer compatible with most vehicles"},
    ]
    
    for timer in turbo_timers:
        base_price = timer["price"]
        discount_percent = 0
        original_price = None
        is_bestseller = "HKS" in timer['name']
        
        if "HKS" in timer['name']:
            discount_percent = 20
            original_price = base_price / (1 - discount_percent / 100)
        
        products.append({
            "id": product_id,
            "name": timer["name"],
            "category": "Lighting & Electrical",
            "subcategory": "Turbo Timers",
            "price": base_price,
            "original_price": original_price,
            "discount_percent": discount_percent if discount_percent > 0 else None,
            "price_varies": False,
            "description": create_product_description(timer["name"], "Lighting & Electrical", "Turbo Timers", None, None),
            "stock": 8,
            "images": get_product_images("Lighting & Electrical", "Turbo Timers", timer["name"], product_id),
            "sku": f"TT-{product_id:03d}",
            "size": None,
            "compatible_cars": ["All Models"],
            "car_make": "Universal",
            "car_model": None,
            "year_range": None,
            "variants": [],
            "is_bestseller": is_bestseller,
            "is_new": False
        })
        product_id += 1
    
    # BODY PARTS - Bonnets
    bonnet_models = ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio", "Honda Fit", "Nissan Note"]
    for model in bonnet_models:
        products.append({
            "id": product_id,
            "name": f"Bonnet - {model}",
            "category": "Body Parts",
            "subcategory": "Bonnets",
            "price": None,
            "price_varies": True,
            "description": create_product_description(f"Bonnet - {model}", "Body Parts", "Bonnets", None, model),
            "stock": 5,
            "images": get_product_images("Body Parts", "Bonnets", f"Bonnet - {model}", product_id),
            "sku": f"BNT-{product_id:03d}",
            "size": None,
            "compatible_cars": [model],
            "car_make": model.split()[0],
            "car_model": model,
            "year_range": "2010-2024",
            "variants": []
        ,
                    "is_bestseller": False,
                    "is_new": False})
        product_id += 1
    
    # Bumpers
    bumper_types = [
        {"type": "Front Bumper", "models": ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio"]},
        {"type": "Rear Bumper", "models": ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio"]},
        {"type": "Real Bumper", "models": ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz"]},
    ]
    
    for bumper in bumper_types:
        for model in bumper["models"]:
            products.append({
                "id": product_id,
                "name": f"{bumper['type']} - {model}",
                "category": "Body Parts",
                "subcategory": "Bumpers",
                "price": None,
                "price_varies": True,
                "description": create_product_description(f"{bumper['type']} - {model}", "Body Parts", f"{bumper['type']} Bumpers", None, model),
                "stock": 4,
                "images": get_product_images("Body Parts", "Bumpers", f"{bumper['type']} - {model}", product_id),
                "sku": f"BMP-{product_id:03d}",
                "size": None,
                "compatible_cars": [model],
                "car_make": model.split()[0],
                "car_model": model,
                "year_range": "2010-2024",
                "variants": []
            ,
                    "is_bestseller": False,
                    "is_new": False})
            product_id += 1
    
    # Bumper Lips
    for model in ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio", "Honda Fit", "Nissan Note"]:
        products.append({
            "id": product_id,
            "name": f"Bumper Lip - {model}",
            "category": "Body Parts",
            "subcategory": "Bumper Lips",
            "price": 3500,
            "price_varies": False,
            "description": create_product_description(f"Bumper Lip - {model}", "Body Parts", "Bumper Lips", None, model),
            "stock": 12,
            "images": get_product_images("Body Parts", "Bumper Lips", f"Bumper Lip - {model}", product_id),
            "sku": f"BLIP-{product_id:03d}",
            "size": None,
            "compatible_cars": [model],
            "car_make": model.split()[0],
            "car_model": model,
            "year_range": "2010-2024",
            "variants": []
        ,
                    "is_bestseller": False,
                    "is_new": False})
        product_id += 1
    
    # Spoilers
    spoiler_types = [
        {"type": "Saloon Spoiler", "models": ["Toyota Mark X", "Toyota Camry", "Honda Accord"]},
        {"type": "Hatchback Spoiler", "models": ["Toyota Vitz", "Mazda Demio", "Honda Fit", "Nissan Note"]},
    ]
    
    for spoiler in spoiler_types:
        for model in spoiler["models"]:
            products.append({
                "id": product_id,
                "name": f"{spoiler['type']} - {model}",
                "category": "Body Parts",
                "subcategory": "Spoilers",
                "price": 4500,
                "price_varies": False,
                "description": create_product_description(f"{spoiler['type']} - {model}", "Body Parts", "Spoilers", None, model),
                "stock": 8,
                "images": get_product_images("Body Parts", "Spoilers", f"{spoiler['type']} - {model}", product_id),
                "sku": f"SPL-{product_id:03d}",
                "size": None,
                "compatible_cars": [model],
                "car_make": model.split()[0],
                "car_model": model,
                "year_range": "2010-2024",
            "variants": []
        ,
                    "is_bestseller": False,
                    "is_new": False})
        product_id += 1
    
    # Fender Parts
    for model in ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio"]:
        for side in ["Left", "Right"]:
            products.append({
                "id": product_id,
                "name": f"Fender - {side} - {model}",
                "category": "Body Parts",
                "subcategory": "Fender Parts",
                "price": None,
                "price_varies": True,
                "description": create_product_description(f"{side.capitalize()} Fender - {model}", "Body Parts", "Fender Parts", None, model),
                "stock": 6,
                "images": get_product_images("Body Parts", "Fender Parts", f"Fender - {side} - {model}", product_id),
                "sku": f"FND-{product_id:03d}",
                "size": None,
                "compatible_cars": [model],
                "car_make": model.split()[0],
                "car_model": model,
                "year_range": "2010-2024",
                "variants": [side]
            ,
                    "is_bestseller": False,
                    "is_new": False})
            product_id += 1
    
    # ACCESSORIES - Gear Knobs
    gear_knob_types = [
        {"type": "Automatic Gear Knob", "price": 2500},
        {"type": "Manual Gear Knob", "price": 2000},
        {"type": "Sport Gear Knob", "price": 3500},
        {"type": "Leather Gear Knob", "price": 3000},
    ]
    
    for knob in gear_knob_types:
        products.append({
            "id": product_id,
            "name": knob["type"],
            "category": "Accessories",
            "subcategory": "Gear Knobs",
            "price": knob["price"],
            "price_varies": False,
            "description": create_product_description(f"{knob['type']} Gear Knob", "Accessories", "Gear Knobs", None, None),
            "stock": 20,
            "images": get_product_images("Accessories", "Gear Knobs", knob["type"], product_id),
            "sku": f"GK-{product_id:03d}",
            "size": None,
            "compatible_cars": ["All Models"],
            "car_make": "Universal",
            "car_model": None,
            "year_range": None,
            "variants": []
        ,
                    "is_bestseller": False,
                    "is_new": False})
        product_id += 1
    
    # Wind Breakers
    for model in ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio", "Honda Fit", "Nissan Note"]:
        products.append({
            "id": product_id,
            "name": f"Wind Breaker - {model}",
            "category": "Accessories",
            "subcategory": "Wind Breakers",
            "price": None,
            "price_varies": True,
            "description": create_product_description(f"Wind Breakers - {model}", "Accessories", "Wind Breakers", None, model),
            "stock": 10,
            "images": get_product_images("Accessories", "Wind Breakers", f"Wind Breaker - {model}", product_id),
            "sku": f"WB-{product_id:03d}",
            "size": None,
            "compatible_cars": [model],
            "car_make": model.split()[0],
            "car_model": model,
            "year_range": "2010-2024",
            "variants": []
        ,
                    "is_bestseller": False,
                    "is_new": False})
        product_id += 1
    
    # Mud Flaps
    mud_flap_types = ["Front Mud Flaps", "Rear Mud Flaps", "Full Set Mud Flaps"]
    for flap_type in mud_flap_types:
        products.append({
            "id": product_id,
            "name": flap_type,
            "category": "Accessories",
            "subcategory": "Mud Flaps",
            "price": 1800 if "Full Set" in flap_type else 1000,
            "price_varies": False,
            "description": create_product_description(f"Universal Mud Flaps - {flap_type}", "Accessories", "Mud Flaps", None, None),
            "stock": 25,
            "images": get_product_images("Accessories", "Mud Flaps", flap_type, product_id),
            "sku": f"MF-{product_id:03d}",
            "size": None,
            "compatible_cars": ["All Models"],
            "car_make": "Universal",
            "car_model": None,
            "year_range": None,
            "variants": []
        ,
                    "is_bestseller": False,
                    "is_new": False})
        product_id += 1
    
    # Boot Shocks / Boot Struts
    for model in ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio", "Honda Fit", "Nissan Note", "Toyota Camry", "Honda Accord"]:
        for side in ["Left", "Right", "Pair"]:
            products.append({
                "id": product_id,
                "name": f"Boot {side} Shock - {model}",
                "category": "Accessories",
                "subcategory": "Boot Shocks",
                "price": None,
                "price_varies": True,
                "description": create_product_description(f"Boot Struts - {model}", "Accessories", "Boot Shocks", None, model),
                "stock": 15,
                "images": get_product_images("Accessories", "Boot Shocks", f"Boot {side} Shock - {model}", product_id),
                "sku": f"BS-{product_id:03d}",
                "size": None,
                "compatible_cars": [model],
                "car_make": model.split()[0],
                "car_model": model,
                "year_range": "2010-2024",
                "variants": [side]
            ,
                    "is_bestseller": False,
                    "is_new": False})
            product_id += 1
    
    # Car Mats
    mat_types = [
        {"type": "Standard Car Mats", "price": 3500},
        {"type": "Premium Car Mats", "price": 5500},
        {"type": "Rubber Car Mats", "price": 4000},
        {"type": "Custom Fit Car Mats", "price": None, "price_varies": True},
    ]
    
    for mat in mat_types:
        products.append({
            "id": product_id,
            "name": mat["type"],
            "category": "Accessories",
            "subcategory": "Car Mats",
            "price": mat.get("price"),
            "price_varies": mat.get("price_varies", False),
            "description": create_product_description(f"{mat['type']} Car Mats", "Accessories", "Car Mats", None, None),
            "stock": 30,
            "images": get_product_images("Accessories", "Car Mats", mat["type"], product_id),
            "sku": f"MAT-{product_id:03d}",
            "size": None,
            "compatible_cars": ["All Models"] if not mat.get("price_varies") else ["Model Specific"],
            "car_make": "Universal" if not mat.get("price_varies") else None,
            "car_model": None,
            "year_range": None,
            "variants": []
        ,
                    "is_bestseller": False,
                    "is_new": False})
        product_id += 1
    
    # Interior Trims
    trim_types = ["Dashboard Trim", "Door Trim", "Center Console Trim", "Steering Wheel Trim"]
    for trim in trim_types:
        products.append({
            "id": product_id,
            "name": trim,
            "category": "Accessories",
            "subcategory": "Interior Trims",
            "price": None,
            "price_varies": True,
            "description": create_product_description(f"{trim} Interior Trim", "Accessories", "Interior Trims", None, None),
            "stock": 12,
            "images": get_product_images("Accessories", "Interior Trims", trim, product_id),
            "sku": f"TRIM-{product_id:03d}",
            "size": None,
            "compatible_cars": ["Model Specific"],
            "car_make": None,
            "car_model": None,
            "year_range": None,
            "variants": []
        ,
                    "is_bestseller": False,
                    "is_new": False})
        product_id += 1
    
    # Additional products to reach 150+
    # More lighting products
    additional_lighting = [
        {"name": "LED Tail Lights", "price": 6500, "models": ["Universal"]},
        {"name": "LED Brake Lights", "price": 2800, "models": ["Universal"]},
        {"name": "LED Turn Signals", "price": 3200, "models": ["Universal"]},
        {"name": "LED Interior Lights", "price": 1500, "models": ["Universal"]},
        {"name": "LED License Plate Lights", "price": 1200, "models": ["Universal"]},
    ]
    
    for light in additional_lighting:
        products.append({
            "id": product_id,
            "name": light["name"],
            "category": "Lighting & Electrical",
            "subcategory": "LED Lights",
            "price": light["price"],
            "price_varies": False,
            "description": create_product_description(light['name'], "Performance & Styling", "LED Projectors", None, None),
            "stock": 20,
            "images": get_product_images("Lighting & Electrical", "LED Lights", light["name"], product_id),
            "sku": f"LED-LT-{product_id:03d}",
            "size": None,
            "compatible_cars": ["All Models"],
            "car_make": "Universal",
            "car_model": None,
            "year_range": None,
            "variants": []
        ,
                    "is_bestseller": False,
                    "is_new": False})
        product_id += 1
    
    # More body parts
    more_body_parts = [
        {"name": "Side Mirror - Left", "models": ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz"], "price_varies": True},
        {"name": "Side Mirror - Right", "models": ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz"], "price_varies": True},
        {"name": "Grille", "models": ["Toyota Harrier", "Toyota Mark X", "Mazda Demio"], "price_varies": True},
        {"name": "Door Handle", "models": ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz"], "price_varies": True},
    ]
    
    for part in more_body_parts:
        for model in part["models"]:
            products.append({
                "id": product_id,
                "name": f"{part['name']} - {model}",
                "category": "Body Parts",
                "subcategory": part["name"].split(" - ")[0],
                "price": None,
                "price_varies": True,
                "description": create_product_description(f"{part['name']} - {model}", "Body Parts", part["name"].split(" - ")[0], None, model),
                "stock": 8,
                "images": get_product_images("Body Parts", part["name"].split(" - ")[0], f"{part['name']} - {model}", product_id),
                "sku": f"BP-{product_id:03d}",
                "size": None,
                "compatible_cars": [model],
                "car_make": model.split()[0],
                "car_model": model,
                "year_range": "2010-2024",
                "variants": []
            ,
                    "is_bestseller": False,
                    "is_new": False})
            product_id += 1

# Initialize products
initialize_products()

@app.route('/products', methods=['GET'])
def get_products():
    """Get all products with advanced filtering"""
    filtered = products.copy()
    
    # Category filter
    category = request.args.get('category')
    if category:
        filtered = [p for p in filtered if p.get('category', '').lower() == category.lower()]
    
    # Subcategory filter
    subcategory = request.args.get('subcategory')
    if subcategory:
        filtered = [p for p in filtered if p.get('subcategory', '').lower() == subcategory.lower()]
    
    # Car make filter
    car_make = request.args.get('car_make')
    if car_make:
        filtered = [p for p in filtered if p.get('car_make') and car_make.lower() in p.get('car_make', '').lower()]
    
    # Car model filter
    car_model = request.args.get('car_model')
    if car_model:
        filtered = [p for p in filtered if p.get('car_model') and car_model.lower() in p.get('car_model', '').lower()]
    
    # Size filter
    size = request.args.get('size')
    if size:
        filtered = [p for p in filtered if p.get('size') and size.upper() in str(p.get('size', '')).upper()]
    
    # Price range filter
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')
    if min_price:
        try:
            min_price = float(min_price)
            filtered = [p for p in filtered if p.get('price') is not None and p.get('price', 0) >= min_price]
        except:
            pass
    if max_price:
        try:
            max_price = float(max_price)
            filtered = [p for p in filtered if p.get('price') is not None and p.get('price', float('inf')) <= max_price]
        except:
            pass
    
    # Availability filter
    in_stock = request.args.get('in_stock')
    if in_stock and in_stock.lower() == 'true':
        filtered = [p for p in filtered if p.get('stock', 0) > 0]
    
    # Bestseller filter
    bestseller = request.args.get('bestseller')
    if bestseller and bestseller.lower() == 'true':
        filtered = [p for p in filtered if p.get('is_bestseller', False) == True]
    
    # Featured filter (use bestseller as featured for now)
    featured = request.args.get('featured')
    if featured and featured.lower() == 'true':
        filtered = [p for p in filtered if p.get('is_bestseller', False) == True]
    
    # New arrivals filter
    new = request.args.get('new')
    if new and new.lower() == 'true':
        filtered = [p for p in filtered if p.get('is_new', False) == True]
    
    # Search query
    search = request.args.get('search')
    if search:
        search_lower = search.lower()
        filtered = [p for p in filtered if 
                   search_lower in p.get('name', '').lower() or
                   search_lower in p.get('description', '').lower() or
                   search_lower in str(p.get('sku', '')).lower() or
                   (p.get('car_model') and search_lower in p.get('car_model', '').lower()) or
                   (p.get('size') and search_lower in str(p.get('size', '')).lower())]
    
    # Sorting
    sort_by = request.args.get('sort', 'name')
    if sort_by == 'price_low':
        filtered = sorted([p for p in filtered if p.get('price') is not None], key=lambda x: x.get('price', 0))
        filtered.extend([p for p in filtered if p.get('price') is None])
    elif sort_by == 'price_high':
        filtered = sorted([p for p in filtered if p.get('price') is not None], key=lambda x: x.get('price', 0), reverse=True)
        filtered.extend([p for p in filtered if p.get('price') is None])
    elif sort_by == 'name':
        filtered = sorted(filtered, key=lambda x: x.get('name', ''))
    elif sort_by == 'popularity':
        filtered = sorted(filtered, key=lambda x: x.get('stock', 0), reverse=True)
    
    return jsonify(filtered), 200

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
    
    required_fields = ['name', 'category', 'description', 'stock']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400
    
    new_id = max([p['id'] for p in products], default=0) + 1
    new_product = {
        'id': new_id,
        'name': data['name'],
        'category': data['category'],
        'subcategory': data.get('subcategory'),
        'price': float(data['price']) if data.get('price') else None,
        'price_varies': data.get('price_varies', False),
        'description': data['description'],
        'stock': int(data['stock']),
        'images': data.get('images', get_product_images(data.get('category', ''), data.get('subcategory'), data.get('name', ''), new_id)),
        'sku': data.get('sku', f'PROD-{new_id:03d}'),
        'size': data.get('size'),
        'compatible_cars': data.get('compatible_cars', []),
        'car_make': data.get('car_make'),
        'car_model': data.get('car_model'),
        'year_range': data.get('year_range'),
        'variants': data.get('variants', [])
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
    for key, value in data.items():
        if key != 'id':
            product[key] = value
    
    if 'price' in data and data['price']:
        product['price'] = float(data['price'])
    if 'stock' in data:
        product['stock'] = int(data['stock'])
    
    return jsonify(product), 200

@app.route('/categories', methods=['GET'])
def get_categories():
    """Get all product categories"""
    categories = list(set([p['category'] for p in products if p.get('category')]))
    return jsonify(sorted(categories)), 200

@app.route('/subcategories', methods=['GET'])
def get_subcategories():
    """Get all subcategories, optionally filtered by category"""
    category = request.args.get('category')
    subcategories = []
    
    for p in products:
        if p.get('subcategory'):
            if not category or p.get('category', '').lower() == category.lower():
                subcategories.append({
                    'name': p['subcategory'],
                    'category': p['category']
                })
    
    # Remove duplicates
    unique_subcats = []
    seen = set()
    for subcat in subcategories:
        key = (subcat['name'], subcat['category'])
        if key not in seen:
            seen.add(key)
            unique_subcats.append(subcat)
    
    return jsonify(unique_subcats), 200

@app.route('/car-makes', methods=['GET'])
def get_car_makes():
    """Get all car makes"""
    makes = list(set([p['car_make'] for p in products if p.get('car_make')]))
    return jsonify(sorted([m for m in makes if m])), 200

@app.route('/car-models', methods=['GET'])
def get_car_models():
    """Get all car models, optionally filtered by make"""
    make = request.args.get('make')
    models = []
    
    for p in products:
        if p.get('car_model'):
            if not make or (p.get('car_make') and make.lower() in p.get('car_make', '').lower()):
                models.append(p['car_model'])
    
    return jsonify(sorted(list(set(models)))), 200

@app.route('/sizes', methods=['GET'])
def get_sizes():
    """Get all available sizes"""
    sizes = list(set([p['size'] for p in products if p.get('size')]))
    return jsonify(sorted([s for s in sizes if s])), 200

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
    app.run(debug=True, host='0.0.0.0', port=5001)

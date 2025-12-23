from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
from typing import Dict, List, Optional

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Comprehensive products database with 150+ products
products: List[Dict] = []

# Helper function to generate 2-3 images per product based on category/subcategory
def get_product_images(category: str, subcategory: str = None, product_name: str = "") -> List[str]:
    """Generate 2-3 sample images for a product based on its category"""
    import random
    
    # Base image URLs - using placeholder services with realistic car parts images
    # In production, these would be actual product images from your inventory
    # Using placeholder.com with descriptive text for each category
    base_images = {
        "LED Headlights": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=LED+Headlights+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=LED+Headlights+2",
            "https://via.placeholder.com/800x600/3a3a3a/ffffff?text=LED+Headlights+3"
        ],
        "Projector Headlights": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Projector+Headlights+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Projector+Headlights+2",
            "https://via.placeholder.com/800x600/3a3a3a/ffffff?text=Projector+Headlights+3"
        ],
        "Fog Lights": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Fog+Lights+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Fog+Lights+2"
        ],
        "Headlight Lenses": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Headlight+Lenses+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Headlight+Lenses+2"
        ],
        "DRLs": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=DRLs+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=DRLs+2"
        ],
        "Horns": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Horns+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Horns+2",
            "https://via.placeholder.com/800x600/3a3a3a/ffffff?text=Horns+3"
        ],
        "Alarms": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Car+Alarms+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Car+Alarms+2"
        ],
        "Turbo Timers": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Turbo+Timer+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Turbo+Timer+2"
        ],
        "Bonnets": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Bonnet+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Bonnet+2",
            "https://via.placeholder.com/800x600/3a3a3a/ffffff?text=Bonnet+3"
        ],
        "Bumpers": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Bumper+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Bumper+2",
            "https://via.placeholder.com/800x600/3a3a3a/ffffff?text=Bumper+3"
        ],
        "Bumper Lips": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Bumper+Lip+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Bumper+Lip+2"
        ],
        "Spoilers": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Spoiler+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Spoiler+2",
            "https://via.placeholder.com/800x600/3a3a3a/ffffff?text=Spoiler+3"
        ],
        "Fender Parts": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Fender+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Fender+2"
        ],
        "Gear Knobs": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Gear+Knob+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Gear+Knob+2"
        ],
        "Wind Breakers": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Wind+Breaker+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Wind+Breaker+2"
        ],
        "Mud Flaps": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Mud+Flaps+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Mud+Flaps+2"
        ],
        "Boot Shocks": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Boot+Shock+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Boot+Shock+2"
        ],
        "Car Mats": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Car+Mats+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Car+Mats+2",
            "https://via.placeholder.com/800x600/3a3a3a/ffffff?text=Car+Mats+3"
        ],
        "Interior Trims": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Interior+Trim+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Interior+Trim+2"
        ],
        "LED Lights": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=LED+Lights+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=LED+Lights+2"
        ],
        "Side Mirror": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Side+Mirror+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Side+Mirror+2"
        ],
        "Grille": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Grille+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Grille+2"
        ],
        "Door Handle": [
            "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=Door+Handle+1",
            "https://via.placeholder.com/800x600/2a2a2a/ffffff?text=Door+Handle+2"
        ]
    }
    
    # Use subcategory if available, otherwise use category
    key = subcategory if subcategory and subcategory in base_images else category
    if key not in base_images:
        # Default images for any category not listed
        key = "LED Headlights"  # Default fallback
    
    images = base_images.get(key, base_images["LED Headlights"])
    # Return 2-3 images (randomly select 2 or 3)
    num_images = random.choice([2, 3])
    return images[:num_images]

# Helper function to generate products
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
                    "description": f"{headlight['description']}. Size: {size}",
                    "stock": 15 if headlight.get("price_varies") else 25,
                    "images": get_product_images("Lighting & Electrical", "LED Headlights", f"{headlight['name']} - {size}"),
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
                "description": f"Advanced projector headlight system with {size} bulb size",
                "stock": 20,
                "images": get_product_images("Lighting & Electrical", "Projector Headlights"),
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
                "description": f"High-quality {fog_type.lower()} fog lights for improved visibility",
                "stock": 18,
                    "images": get_product_images("Lighting & Electrical", "Fog Lights"),
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
            "description": f"Replacement headlight lenses for {car_model}",
            "stock": 12,
            "images": get_product_images("Lighting & Electrical", "Headlight Lenses"),
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
            "description": f"Daytime running lights for enhanced visibility and style",
            "stock": 22,
            "images": get_product_images("Lighting & Electrical", "DRLs"),
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
            "description": f"High-quality horn system for {horn['car']}",
            "stock": 15,
            "images": get_product_images("Lighting & Electrical", "Horns"),
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
            "description": f"Advanced security alarm system for vehicle protection",
            "stock": 10,
            "images": get_product_images("Lighting & Electrical", "Alarms"),
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
            "description": timer["description"],
            "stock": 8,
            "images": get_product_images("Lighting & Electrical", "Turbo Timers"),
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
            "description": f"Replacement bonnet for {model}",
            "stock": 5,
            "images": get_product_images("Body Parts", "Bonnets"),
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
                "description": f"Replacement {bumper['type'].lower()} for {model}",
                "stock": 4,
                "images": get_product_images("Body Parts", "Bumpers"),
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
            "description": f"Stylish bumper lip for {model}",
            "stock": 12,
            "images": get_product_images("Body Parts", "Bumper Lips"),
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
                "description": f"Performance {spoiler['type'].lower()} for {model}",
                "stock": 8,
                "images": get_product_images("Body Parts", "Spoilers"),
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
                "description": f"Replacement {side.lower()} fender for {model}",
                "stock": 6,
                "images": get_product_images("Body Parts", "Fender Parts"),
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
            "description": f"Premium {knob['type'].lower()} for enhanced driving experience",
            "stock": 20,
            "images": get_product_images("Accessories", "Gear Knobs"),
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
            "description": f"Model-specific wind breaker for {model}",
            "stock": 10,
            "images": get_product_images("Accessories", "Wind Breakers"),
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
            "description": f"Protective {flap_type.lower()} for vehicle body protection",
            "stock": 25,
            "images": get_product_images("Accessories", "Mud Flaps"),
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
                "description": f"Replacement boot {side.lower()} shock/strut for {model}",
                "stock": 15,
                "images": get_product_images("Accessories", "Boot Shocks"),
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
            "description": f"High-quality {mat['type'].lower()} for vehicle interior protection",
            "stock": 30,
            "images": get_product_images("Accessories", "Car Mats"),
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
            "description": f"Replacement {trim.lower()} for various car models",
            "stock": 12,
            "images": get_product_images("Accessories", "Interior Trims"),
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
            "description": f"Energy-efficient {light['name'].lower()}",
            "stock": 20,
            "images": get_product_images("Lighting & Electrical", "LED Lights"),
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
                "description": f"Replacement {part['name'].lower()} for {model}",
                "stock": 8,
                "images": get_product_images("Body Parts", part["name"].split(" - ")[0]),
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
        'images': data.get('images', get_product_images(data.get('category', ''), data.get('subcategory'))),
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

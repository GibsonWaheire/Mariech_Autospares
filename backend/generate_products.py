#!/usr/bin/env python3
"""
Generate complete products.js file for frontend
This script generates all products with descriptions and images
"""
import json
import re
import os

def create_description(product_name, category, subcategory, size=None, model=None):
    """Create product description"""
    name_lower = product_name.lower()
    
    if "led" in name_lower and "headlight" in name_lower:
        para1 = f"Experience superior visibility and enhanced safety with our premium {product_name.lower()}. These high-performance LED headlights deliver exceptional brightness and clarity, ensuring optimal road illumination in all weather conditions. Built with advanced chip technology and robust construction, they provide long-lasting reliability and energy efficiency. Perfect for drivers who demand the best in automotive lighting technology."
    elif "projector" in name_lower:
        para1 = f"Upgrade your vehicle's lighting system with our advanced {product_name.lower()}. Featuring precision-engineered projector optics and cutting-edge LED technology, these headlights produce a sharp, focused beam pattern that maximizes visibility while minimizing glare for oncoming traffic. The superior light output and modern design make them an ideal choice for both performance enthusiasts and everyday drivers seeking enhanced nighttime driving safety."
    elif "fog" in name_lower or "fog light" in name_lower:
        para1 = f"Enhance your vehicle's visibility in challenging weather conditions with our durable {product_name.lower()}. Designed to cut through fog, rain, and mist, these fog lights provide excellent peripheral illumination and improve overall driving safety. The weather-resistant construction and powerful LED technology ensure reliable performance in all conditions, making them an essential addition to any vehicle."
    elif "turbo timer" in name_lower:
        para1 = f"Protect your turbocharged engine investment with our professional-grade {product_name.lower()}. This essential performance accessory allows your turbo to cool down properly after driving, preventing premature wear and extending the life of your turbocharger. The digital display provides clear countdown information, while the automatic shutdown feature ensures optimal engine protection without requiring manual intervention."
    elif "bumper" in name_lower or "bonnet" in name_lower or "spoiler" in name_lower or "fender" in name_lower:
        para1 = f"Transform your vehicle's appearance with our high-quality {product_name.lower()}. Crafted from premium materials and designed to exact OEM specifications, this body part offers perfect fitment and durability. Whether you're replacing damaged components or upgrading your vehicle's aesthetics, this part delivers exceptional quality and long-lasting performance that matches or exceeds original equipment standards."
    elif "gear knob" in name_lower or ("gear" in name_lower and "knob" in name_lower):
        para1 = f"Elevate your driving experience with our premium {product_name.lower()}. Designed for both comfort and style, this gear knob provides excellent grip and ergonomic feel, making gear changes smoother and more enjoyable. The high-quality materials and precision manufacturing ensure durability and a luxurious appearance that enhances your vehicle's interior."
    elif "wind breaker" in name_lower or "mud flap" in name_lower:
        para1 = f"Protect your vehicle and improve comfort with our practical {product_name.lower()}. These accessories are designed to shield your vehicle from road debris, reduce wind noise, and allow fresh air circulation even during rain. Easy to install and built to last, they provide excellent value while maintaining your vehicle's appearance and comfort."
    elif "boot shock" in name_lower or "boot strut" in name_lower:
        para1 = f"Restore smooth and effortless operation to your vehicle's boot/trunk with our reliable {product_name.lower()}. These gas struts provide powerful lifting assistance, making it easy to open and hold your boot lid in position. Manufactured to meet or exceed OEM specifications, they ensure perfect fitment and long-lasting performance that you can depend on."
    elif "car mat" in name_lower or ("mat" in name_lower and "car" in name_lower):
        para1 = f"Protect your vehicle's interior flooring with our durable {product_name.lower()}. These high-quality mats are designed to trap dirt, mud, and moisture, keeping your vehicle's carpet clean and protected. The precise fitment and non-slip backing ensure they stay in place, while the easy-to-clean material makes maintenance simple and convenient."
    elif "horn" in name_lower:
        para1 = f"Ensure your vehicle is heard with our powerful {product_name.lower()}. Designed for reliability and clear sound projection, these horns provide excellent audible warning capability for enhanced road safety. The weather-resistant construction and easy installation make them a practical upgrade for any vehicle, ensuring you can alert other drivers effectively when needed."
    elif "alarm" in name_lower:
        para1 = f"Protect your vehicle investment with our comprehensive {product_name.lower()}. This advanced security system provides multiple layers of protection, including shock sensors, remote control, and audible alerts. The user-friendly interface and reliable performance give you peace of mind, knowing your vehicle is protected against theft and unauthorized access."
    elif "lens" in name_lower or "lenses" in name_lower:
        para1 = f"Restore crystal-clear visibility with our premium {product_name.lower()}. These replacement lenses are designed to eliminate fogging, yellowing, and cloudiness that can reduce your headlight's effectiveness over time. Made from high-quality polycarbonate material, they offer excellent clarity and UV resistance, ensuring your headlights perform like new while maintaining their appearance for years to come."
    elif "drl" in name_lower or "daytime running" in name_lower:
        para1 = f"Enhance your vehicle's visibility and modern appearance with our stylish {product_name.lower()}. These daytime running lights not only improve safety by making your vehicle more visible to other drivers but also add a contemporary, premium look to your vehicle. The energy-efficient LED technology provides bright, consistent illumination while consuming minimal power, making them both practical and stylish."
    elif "trim" in name_lower or "interior" in name_lower:
        para1 = f"Elevate your vehicle's interior aesthetics with our premium {product_name.lower()}. These high-quality interior components are designed to enhance both the look and feel of your vehicle's cabin. Crafted from durable materials and finished to match OEM specifications, they provide a luxurious appearance while maintaining long-lasting durability and easy maintenance."
    else:
        para1 = f"Discover exceptional quality and performance with our premium {product_name.lower()}. Designed to meet the highest standards of automotive excellence, this product delivers reliable performance and excellent value. Whether you're maintaining your vehicle or upgrading its capabilities, this component provides the quality and durability you expect from a trusted autospare dealer."
    
    size_info = f" Available in {size} size configuration" if size else ""
    
    if model and model != "Universal" and model != "All Models":
        compat_info = f" Specifically designed for {model} models, ensuring perfect fitment and compatibility."
    else:
        compat_info = " Universal fitment design makes this product compatible with a wide range of vehicle makes and models."
    
    para2 = f"This product features precision engineering and quality materials for optimal performance.{size_info}{compat_info} Installation is straightforward with plug-and-play design where applicable, and all products come with comprehensive compatibility information. For specific fitment questions or technical support, our expert team is available to assist you in finding the perfect match for your vehicle."
    
    return f"{para1} {para2}"

def get_images(product_name, category, subcategory):
    """Get product images based on name"""
    name_lower = product_name.lower()
    name_clean = re.sub(r'[^\w\s]', '', name_lower)
    
    image_map = {
        "toby": ["/product-images/download tobby.jpg", "/product-images/Tobys-T2-Plus-H4-LED-Headlight-HiLo-Beam-150W - Copy (2).webp", "/product-images/download (100) - Copy.jpg"],
        "mark x": ["/product-images/mark x - Copy (2).jpg", "/product-images/mark x headlights - Copy (2).jpg", "/product-images/mark x headlights.jpg"],
        "app led": ["/product-images/led - Copy.avif", "/product-images/New-High-Power-P11-Lampada-H7-H4-LED-Headlights-for-Cars-Bulbs-12V-White-6500K-20000lm-H1-H3-H11-H13-9005-9006-Fog-Lights-Carro-Headlight-Bulb - Copy.avif", "/product-images/led - Copy.avif"],
        "b-led": ["/product-images/bled projector 1.jpg", "/product-images/bled projector (2).jpg", "/product-images/bled projector (3).jpg"],
        "single led": ["/product-images/single led - Copy (2).jpg", "/product-images/sinle led - Copy.jpg", "/product-images/single led projector.jpg"],
        "bi-led": ["/product-images/bi led 1.jpg", "/product-images/bi led (2).jpg", "/product-images/bi led (3).jpg"],
        "tri-led": ["/product-images/tri led - Copy (2).jpg", "/product-images/tri led (4).jpg", "/product-images/tri led (5).jpg"],
        "round fog": ["/product-images/round foglights - Copy (2).jpg", "/product-images/round foglights (4).jpg", "/product-images/round foglights (5).jpg"],
        "square fog": ["/product-images/square foglights - Copy (2).jpg", "/product-images/square foglights (4).jpg", "/product-images/square foglights (5).jpg"],
        "universal led fog": ["/product-images/universal led foglights - Copy.jpg", "/product-images/universal led f - Copy.jpg", "/product-images/universal led f (2).jpg"],
        "headlight lens": ["/product-images/headlight lenses.jpg", "/product-images/headlight lenses (2).jpg", "/product-images/headlight lenses (3).jpg"],
        "strip drl": ["/product-images/strip drl - Copy (2).jpg", "/product-images/strip drl (4).jpg", "/product-images/strip drl (5).jpg"],
        "round drl": ["/product-images/round drl - Copy (2).jpg", "/product-images/round drl (4).jpg", "/product-images/round drl (5).jpg"],
        "square drl": ["/product-images/square drl - Copy (2).jpg", "/product-images/square drl (4).jpg", "/product-images/square drl (5).jpg"],
        "universal drl": ["/product-images/universal drl kit - Copy.jpg", "/product-images/universal drl kit (2) - Copy.jpg", "/product-images/universal drl kit (3) - Copy.jpg"],
        "horn for toyota": ["/product-images/horn toyota.jpg", "/product-images/horn toyota (2).jpg", "/product-images/horn toyota (3).jpg"],
        "horn for mazda": ["/product-images/horn mazda.jpg", "/product-images/horn mazda (2).jpg", "/product-images/horn mazda (3).jpg"],
        "universal electric horn": ["/product-images/uniersal electic horn - Copy (2).jpg", "/product-images/universal ele horn - Copy.jpg", "/product-images/universal electric horn - Copy.jpg"],
        "air horn": ["/product-images/air horn kit.jpg", "/product-images/air horn kit (2).jpg", "/product-images/air horn kit (3).jpg"],
        "basic car alarm": ["/product-images/basic car alarm 1.jpg", "/product-images/basic car alarm 2.jpg", "/product-images/basic car alarm3.jpg"],
        "remote car alarm": ["/product-images/remote car alarm - Copy (2).jpg", "/product-images/remote car alarm (4).jpg", "/product-images/remote car alarm (5).jpg"],
        "gps": ["/product-images/gps.jpg", "/product-images/gps (2).jpg", "/product-images/gps (3).jpg"],
        "immobilizer": ["/product-images/immobilizer.jpg", "/product-images/immobilizer (2).jpg", "/product-images/immobilizer (3).jpg"],
        "hks turbo": ["/product-images/hks turbo timer.jpg", "/product-images/hks turbo.jpg", "/product-images/hks turbo (2).jpg"],
        "universal turbo": ["/product-images/universal turbo - Copy.jpg", "/product-images/universal turbo (2).jpg", "/product-images/universal turbo (3).jpg"],
        "bonnet": ["/product-images/bonnet1.jpg", "/product-images/bonnet (2).jpg", "/product-images/bonnet (3).jpg"],
        "front bumper": ["/product-images/front bumper.jpg", "/product-images/front bumper (2).jpg", "/product-images/front bumper (3).jpg"],
        "rear bumper": ["/product-images/rear bumper - Copy (2).jpg", "/product-images/rear bumper (3) - Copy.jpg", "/product-images/rear bumper 1 - Copy.jpg"],
        "real bumper": ["/product-images/real bumper 1 - Copy.jpg", "/product-images/real bumper 2 - Copy.jpg", "/product-images/real bumper 3 - Copy.jpg"],
        "bumper lip": ["/product-images/bumper lip 1 - Copy.jpg", "/product-images/bumper lip2 - Copy.jpg", "/product-images/bumper lip 3 - Copy.jpg"],
        "saloon spoiler": ["/product-images/saloon spoiler 1 - Copy.jpg", "/product-images/saloon spoiler 2 - Copy.jpg", "/product-images/saloon spoiler 3 - Copy.jpg"],
        "hatchback spoiler": ["/product-images/hatchback spoiler 1 - Copy.jpg", "/product-images/hatchback spoiler 2 - Copy.jpg", "/product-images/hatchback sp[oiler 3 - Copy.jpg"],
        "fender left": ["/product-images/fender left - Copy.jpg", "/product-images/fender left 3 - Copy.jpg", "/product-images/fender left 2 - Copy.jpg"],
        "fender right": ["/product-images/fender right - Copy.jpg", "/product-images/fender right 1 - Copy.jpg", "/product-images/fender right2 - Copy.jpg"],
        "fender": ["/product-images/fender left - Copy.jpg", "/product-images/fender right - Copy.jpg", "/product-images/fender right 1 - Copy.jpg"],
        "side mirror left": ["/product-images/side mirror left - Copy.jpg", "/product-images/side ,irror left - Copy.jpg", "/product-images/side mirror 2 - Copy.jpg"],
        "side mirror right": ["/product-images/side mirror right2 - Copy.jpg", "/product-images/side mirror roght1 - Copy.jpg", "/product-images/side morror right3 - Copy.jpg"],
        "grille": ["/product-images/grille 1 - Copy.jpg", "/product-images/grille2 - Copy.jpg", "/product-images/grille3 - Copy.jpg"],
        "door handle": ["/product-images/door handle1 - Copy.jpg", "/product-images/doorhandle2 - Copy.jpg", "/product-images/doorhandle3 - Copy.jpg"],
        "automatic gear knob": ["/product-images/Automatic Gear Knob1 - Copy.jpg", "/product-images/Automatic Gear Knob2 - Copy.jpg", "/product-images/Automatic Gear Knob3 - Copy.jpg"],
        "manual gear knob": ["/product-images/Manual Gear Knob1 - Copy.jpg", "/product-images/Manual Gear Knob2 - Copy.jpg", "/product-images/Manual Gear Knob3 - Copy.jpg"],
        "sport gear knob": ["/product-images/Sport Gear Knob1 - Copy.jpg", "/product-images/Sport Gear Knob2 - Copy.jpg", "/product-images/Sport Gear Knob3 - Copy.jpg"],
        "leather gear knob": ["/product-images/Leather Gear Knob1 - Copy.jpg", "/product-images/Leather Gear Knob2 - Copy.jpg", "/product-images/Leather Gear Knob3 - Copy.jpg"],
        "wind breaker": ["/product-images/Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy - Copy (3).jpg", "/product-images/Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy (5) - Copy.jpg", "/product-images/Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy (6).jpg"],
        "front mud flaps": ["/product-images/Front Mud Flaps1 - Copy.jpg", "/product-images/Front Mud Flaps2 - Copy.jpg", "/product-images/Front Mud Flaps3 - Copy.jpg"],
        "rear mud flaps": ["/product-images/Rear Mud Flaps1 - Copy.jpg", "/product-images/Rear Mud Flaps2 - Copy.jpg", "/product-images/Rear Mud Flaps3 - Copy.jpg"],
        "full set mud flaps": ["/product-images/Full Set Mud Flaps1 - Copy.jpg", "/product-images/Full Set Mud Flaps2 - Copy.jpg", "/product-images/Full Set Mud Flaps3 - Copy.jpg"],
        "boot left shock": ["/product-images/boot shock left1 - Copy.jpg", "/product-images/bootshock left2 - Copy.jpg", "/product-images/bootshock left 3 - Copy.jpg"],
        "boot right shock": ["/product-images/boot shock r1ght1 - Copy.jpg", "/product-images/bootright shock2 - Copy.jpg", "/product-images/bootright shock 3 - Copy.jpg"],
        "boot pair shock": ["/product-images/boot shock left1 - Copy.jpg", "/product-images/boot shock r1ght1 - Copy.jpg", "/product-images/bootshock left2 - Copy.jpg"],
        "standard car mats": ["/product-images/Standard Car Mats1 - Copy.jpg", "/product-images/Standard Car Mats2 - Copy.jpg", "/product-images/Standard Car Mats3 - Copy.jpg"],
        "premium car mats": ["/product-images/Premium Car Mats1 - Copy.jpg", "/product-images/Premium Car Mats2 - Copy.jpg", "/product-images/Premium Car Mats3 - Copy.jpg"],
        "rubber car mats": ["/product-images/Rubber Car Mats1 - Copy.jpg", "/product-images/Rubber Car Mats2 - Copy.jpg", "/product-images/Rubber Car Mats3 - Copy.jpg"],
        "custom fit car mats": ["/product-images/Custom Fit Car Mats1 - Copy.jpg", "/product-images/Custom Fit Car Mats2 - Copy.jpg", "/product-images/Custom Fit Car Mats3 - Copy.jpg"],
        "dashboard trim": ["/product-images/Dashboard Trim1 - Copy.jpg", "/product-images/Dashboard Trim2 - Copy.jpg", "/product-images/Dashboard Trim3 - Copy.jpg"],
        "door trim": ["/product-images/Door Trim1 - Copy.jpg", "/product-images/Door Trim2 - Copy.jpg", "/product-images/Door Trim3 - Copy.jpg"],
        "center console trim": ["/product-images/Center Console Trim1 - Copy.jpg", "/product-images/Center Console Trim2 - Copy.jpg", "/product-images/Center Console Trim3 - Copy.jpg"],
        "steering wheel trim": ["/product-images/Steering Wheel Trim1 - Copy.jpg", "/product-images/Steering Wheel Trim2 - Copy (2).jpg", "/product-images/Steering Wheel Trim3 - Copy (2).jpg"],
        "led tail": ["/product-images/led tail lights.jpg", "/product-images/led tail lights - Copy.jpg", "/product-images/led tail - Copy (2).jpg"],
        "led brake": ["/product-images/led brake.jpg", "/product-images/led brake (2) - Copy.jpg", "/product-images/led brake lights.jpg"],
        "led turn": ["/product-images/led turn signals - Copy (2).jpg", "/product-images/led turn signals (4) - Copy.jpg", "/product-images/led turn signals (5) - Copy.jpg"],
        "led interior": ["/product-images/led interior.jpg", "/product-images/led interior lights - Copy - Copy.jpg", "/product-images/led interior lights.jpg"],
        "led license": ["/product-images/led license plate.jpg", "/product-images/led license plate (2).jpg", "/product-images/led locense plate.jpg"],
    }
    
    for key, images in image_map.items():
        if key in name_clean or key in name_lower:
            return images
    
    # Fallback
    if "led" in category.lower() or "led" in subcategory.lower():
        return ["/product-images/led - Copy.avif", "/product-images/led - Copy.avif", "/product-images/led - Copy.avif"]
    elif "bumper" in category.lower() or "bumper" in subcategory.lower():
        return ["/product-images/front bumper.jpg", "/product-images/front bumper (2).jpg", "/product-images/front bumper (3).jpg"]
    else:
        return ["/product-images/download (100) - Copy.jpg", "/product-images/download (100) - Copy.jpg", "/product-images/download (100) - Copy.jpg"]

# Generate all products
products = []
product_id = 1

# LED Headlights
led_headlights = [
    {"name": "Toby's T2 Plus LED Headlights", "sizes": ["H1", "H3", "H4", "H7", "H11", "9005", "9006"], "base_price": 8500, "car_models": ["Universal"]},
    {"name": "APP LED Headlights", "sizes": ["H1", "H3", "H4", "H7", "H11", "9005", "9006"], "base_price": 7200, "car_models": ["Universal"]},
    {"name": "Mark X LED Headlights", "sizes": ["H4", "H7"], "base_price": None, "car_models": ["Toyota Mark X"], "price_varies": True},
    {"name": "B-LED Projector F-Series", "sizes": ["H1", "H7"], "base_price": 12000, "car_models": ["Ford F-Series", "Universal"]},
]

for headlight in led_headlights:
    for size in headlight["sizes"]:
        for model in headlight["car_models"]:
            base_price = headlight["base_price"]
            discount_percent = 0
            original_price = None
            is_bestseller = "Toby" in headlight['name'] and size in ["H4", "H7", "H11"]
            is_new = headlight['name'] == "B-LED Projector F-Series"
            
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
            
            product_name = f"{headlight['name']} - {size}"
            products.append({
                "id": product_id,
                "name": product_name,
                "category": "Lighting & Electrical",
                "subcategory": "LED Headlights",
                "price": base_price,
                "original_price": round(original_price, 2) if original_price else None,
                "discount_percent": discount_percent if discount_percent > 0 else None,
                "price_varies": headlight.get("price_varies", False),
                "description": create_description(product_name, "Lighting & Electrical", "LED Headlights", size, model),
                "stock": 15 if headlight.get("price_varies") else 25,
                "images": get_images(product_name, "Lighting & Electrical", "LED Headlights"),
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
        
        product_name = f"{proj['name']} - {size}"
        products.append({
            "id": product_id,
            "name": product_name,
            "category": "Lighting & Electrical",
            "subcategory": "Projector Headlights",
            "price": base_price,
            "original_price": round(original_price, 2) if original_price else None,
            "discount_percent": discount_percent if discount_percent > 0 else None,
            "price_varies": False,
            "description": create_description(product_name, "Lighting & Electrical", "Projector Headlights", size, None),
            "stock": 20,
            "images": get_images(product_name, "Lighting & Electrical", "Projector Headlights"),
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
        product_name = f"{fog['name']} - {fog_type}"
        products.append({
            "id": product_id,
            "name": product_name,
            "category": "Lighting & Electrical",
            "subcategory": "Fog Lights",
            "price": fog["base_price"],
            "price_varies": False,
            "description": create_description(f"{fog_type} LED Fog Light", "Lighting & Electrical", "Fog Lights", None, None),
            "stock": 18,
            "images": get_images(product_name, "Lighting & Electrical", "Fog Lights"),
            "sku": f"FOG-{product_id:03d}",
            "size": fog_type,
            "compatible_cars": ["All Models"],
            "car_make": "Universal",
            "car_model": None,
            "year_range": None,
            "variants": [fog_type],
            "is_bestseller": False,
            "is_new": False
        })
        product_id += 1

# Headlight Lenses
for car_model in ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio", "Honda Fit"]:
    product_name = f"Headlight Lenses - {car_model}"
    products.append({
        "id": product_id,
        "name": product_name,
        "category": "Lighting & Electrical",
        "subcategory": "Headlight Lenses",
        "price": None,
        "price_varies": True,
        "description": create_description(f"Headlight Lens Cover - {car_model}", "Lighting & Electrical", "Headlight Lenses", None, car_model),
        "stock": 12,
        "images": get_images(product_name, "Lighting & Electrical", "Headlight Lenses"),
        "sku": f"LENS-{product_id:03d}",
        "size": None,
        "compatible_cars": [car_model],
        "car_make": car_model.split()[0],
        "car_model": car_model,
        "year_range": "2010-2024",
        "variants": [],
        "is_bestseller": False,
        "is_new": False
    })
    product_id += 1

# DRLs
drl_types = ["Strip DRL", "Round DRL", "Square DRL", "Universal DRL Kit"]
for drl in drl_types:
    products.append({
        "id": product_id,
        "name": drl,
        "category": "Lighting & Electrical",
        "subcategory": "DRLs",
        "price": 3500 if "Kit" in drl else 2800,
        "price_varies": False,
        "description": create_description(drl, "Lighting & Electrical", "DRLs", None, None),
        "stock": 22,
        "images": get_images(drl, "Lighting & Electrical", "DRLs"),
        "sku": f"DRL-{product_id:03d}",
        "size": None,
        "compatible_cars": ["All Models"],
        "car_make": "Universal",
        "car_model": None,
        "year_range": None,
        "variants": [],
        "is_bestseller": False,
        "is_new": False
    })
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
        "description": create_description(f"{horn['car']} Premium Horn Set", "Lighting & Electrical", "Horns", None, horn['car']),
        "stock": 15,
        "images": get_images(horn["name"], "Lighting & Electrical", "Horns"),
        "sku": f"HORN-{product_id:03d}",
        "size": None,
        "compatible_cars": [horn["car"]] if horn["car"] != "Universal" else ["All Models"],
        "car_make": horn["car"].split()[0] if horn["car"] != "Universal" else "Universal",
        "car_model": horn["car"] if horn["car"] != "Universal" else None,
        "year_range": None,
        "variants": [],
        "is_bestseller": False,
        "is_new": False
    })
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
        "description": create_description(alarm, "Lighting & Electrical", "Alarms", None, None),
        "stock": 10,
        "images": get_images(alarm, "Lighting & Electrical", "Alarms"),
        "sku": f"ALM-{product_id:03d}",
        "size": None,
        "compatible_cars": ["All Models"],
        "car_make": "Universal",
        "car_model": None,
        "year_range": None,
        "variants": [],
        "is_bestseller": False,
        "is_new": False
    })
    product_id += 1

# Turbo Timers
turbo_timers = [
    {"name": "HKS Turbo Timer", "price": 8500},
    {"name": "Universal Turbo Timer", "price": 4500},
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
        "original_price": round(original_price, 2) if original_price else None,
        "discount_percent": discount_percent if discount_percent > 0 else None,
        "price_varies": False,
        "description": create_description(timer["name"], "Lighting & Electrical", "Turbo Timers", None, None),
        "stock": 8,
        "images": get_images(timer["name"], "Lighting & Electrical", "Turbo Timers"),
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
    product_name = f"Bonnet - {model}"
    products.append({
        "id": product_id,
        "name": product_name,
        "category": "Body Parts",
        "subcategory": "Bonnets",
        "price": None,
        "price_varies": True,
        "description": create_description(f"Bonnet - {model}", "Body Parts", "Bonnets", None, model),
        "stock": 5,
        "images": get_images(product_name, "Body Parts", "Bonnets"),
        "sku": f"BNT-{product_id:03d}",
        "size": None,
        "compatible_cars": [model],
        "car_make": model.split()[0],
        "car_model": model,
        "year_range": "2010-2024",
        "variants": [],
        "is_bestseller": False,
        "is_new": False
    })
    product_id += 1

# Bumpers
bumper_types = [
    {"type": "Front Bumper", "models": ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio"]},
    {"type": "Rear Bumper", "models": ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio"]},
    {"type": "Real Bumper", "models": ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz"]},
]

for bumper in bumper_types:
    for model in bumper["models"]:
        product_name = f"{bumper['type']} - {model}"
        products.append({
            "id": product_id,
            "name": product_name,
            "category": "Body Parts",
            "subcategory": "Bumpers",
            "price": None,
            "price_varies": True,
            "description": create_description(f"{bumper['type']} - {model}", "Body Parts", f"{bumper['type']} Bumpers", None, model),
            "stock": 4,
            "images": get_images(product_name, "Body Parts", "Bumpers"),
            "sku": f"BMP-{product_id:03d}",
            "size": None,
            "compatible_cars": [model],
            "car_make": model.split()[0],
            "car_model": model,
            "year_range": "2010-2024",
            "variants": [],
            "is_bestseller": False,
            "is_new": False
        })
        product_id += 1

# Bumper Lips
for model in ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio", "Honda Fit", "Nissan Note"]:
    product_name = f"Bumper Lip - {model}"
    products.append({
        "id": product_id,
        "name": product_name,
        "category": "Body Parts",
        "subcategory": "Bumper Lips",
        "price": 3500,
        "price_varies": False,
        "description": create_description(f"Bumper Lip - {model}", "Body Parts", "Bumper Lips", None, model),
        "stock": 12,
        "images": get_images(product_name, "Body Parts", "Bumper Lips"),
        "sku": f"BLIP-{product_id:03d}",
        "size": None,
        "compatible_cars": [model],
        "car_make": model.split()[0],
        "car_model": model,
        "year_range": "2010-2024",
        "variants": [],
        "is_bestseller": False,
        "is_new": False
    })
    product_id += 1

# Spoilers
spoiler_types = [
    {"type": "Saloon Spoiler", "models": ["Toyota Mark X", "Toyota Camry", "Honda Accord"]},
    {"type": "Hatchback Spoiler", "models": ["Toyota Vitz", "Mazda Demio", "Honda Fit", "Nissan Note"]},
]

for spoiler in spoiler_types:
    for model in spoiler["models"]:
        product_name = f"{spoiler['type']} - {model}"
        products.append({
            "id": product_id,
            "name": product_name,
            "category": "Body Parts",
            "subcategory": "Spoilers",
            "price": 4500,
            "price_varies": False,
            "description": create_description(f"{spoiler['type']} - {model}", "Body Parts", "Spoilers", None, model),
            "stock": 8,
            "images": get_images(product_name, "Body Parts", "Spoilers"),
            "sku": f"SPL-{product_id:03d}",
            "size": None,
            "compatible_cars": [model],
            "car_make": model.split()[0],
            "car_model": model,
            "year_range": "2010-2024",
            "variants": [],
            "is_bestseller": False,
            "is_new": False
        })
        product_id += 1

# Fender Parts
for model in ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio"]:
    for side in ["Left", "Right"]:
        product_name = f"Fender - {side} - {model}"
        products.append({
            "id": product_id,
            "name": product_name,
            "category": "Body Parts",
            "subcategory": "Fender Parts",
            "price": None,
            "price_varies": True,
            "description": create_description(f"{side.capitalize()} Fender - {model}", "Body Parts", "Fender Parts", None, model),
            "stock": 6,
            "images": get_images(product_name, "Body Parts", "Fender Parts"),
            "sku": f"FND-{product_id:03d}",
            "size": None,
            "compatible_cars": [model],
            "car_make": model.split()[0],
            "car_model": model,
            "year_range": "2010-2024",
            "variants": [side],
            "is_bestseller": False,
            "is_new": False
        })
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
        "description": create_description(f"{knob['type']} Gear Knob", "Accessories", "Gear Knobs", None, None),
        "stock": 20,
        "images": get_images(knob["type"], "Accessories", "Gear Knobs"),
        "sku": f"GK-{product_id:03d}",
        "size": None,
        "compatible_cars": ["All Models"],
        "car_make": "Universal",
        "car_model": None,
        "year_range": None,
        "variants": [],
        "is_bestseller": False,
        "is_new": False
    })
    product_id += 1

# Wind Breakers
for model in ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio", "Honda Fit", "Nissan Note"]:
    product_name = f"Wind Breaker - {model}"
    products.append({
        "id": product_id,
        "name": product_name,
        "category": "Accessories",
        "subcategory": "Wind Breakers",
        "price": None,
        "price_varies": True,
        "description": create_description(f"Wind Breakers - {model}", "Accessories", "Wind Breakers", None, model),
        "stock": 10,
        "images": get_images(product_name, "Accessories", "Wind Breakers"),
        "sku": f"WB-{product_id:03d}",
        "size": None,
        "compatible_cars": [model],
        "car_make": model.split()[0],
        "car_model": model,
        "year_range": "2010-2024",
        "variants": [],
        "is_bestseller": False,
        "is_new": False
    })
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
        "description": create_description(f"Universal Mud Flaps - {flap_type}", "Accessories", "Mud Flaps", None, None),
        "stock": 25,
        "images": get_images(flap_type, "Accessories", "Mud Flaps"),
        "sku": f"MF-{product_id:03d}",
        "size": None,
        "compatible_cars": ["All Models"],
        "car_make": "Universal",
        "car_model": None,
        "year_range": None,
        "variants": [],
        "is_bestseller": False,
        "is_new": False
    })
    product_id += 1

# Boot Shocks
for model in ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz", "Mazda Demio", "Honda Fit", "Nissan Note", "Toyota Camry", "Honda Accord"]:
    for side in ["Left", "Right", "Pair"]:
        product_name = f"Boot {side} Shock - {model}"
        products.append({
            "id": product_id,
            "name": product_name,
            "category": "Accessories",
            "subcategory": "Boot Shocks",
            "price": None,
            "price_varies": True,
            "description": create_description(f"Boot Struts - {model}", "Accessories", "Boot Shocks", None, model),
            "stock": 15,
            "images": get_images(product_name, "Accessories", "Boot Shocks"),
            "sku": f"BS-{product_id:03d}",
            "size": None,
            "compatible_cars": [model],
            "car_make": model.split()[0],
            "car_model": model,
            "year_range": "2010-2024",
            "variants": [side],
            "is_bestseller": False,
            "is_new": False
        })
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
        "description": create_description(f"{mat['type']} Car Mats", "Accessories", "Car Mats", None, None),
        "stock": 30,
        "images": get_images(mat["type"], "Accessories", "Car Mats"),
        "sku": f"MAT-{product_id:03d}",
        "size": None,
        "compatible_cars": ["All Models"] if not mat.get("price_varies") else ["Model Specific"],
        "car_make": "Universal" if not mat.get("price_varies") else None,
        "car_model": None,
        "year_range": None,
        "variants": [],
        "is_bestseller": False,
        "is_new": False
    })
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
        "description": create_description(f"{trim} Interior Trim", "Accessories", "Interior Trims", None, None),
        "stock": 12,
        "images": get_images(trim, "Accessories", "Interior Trims"),
        "sku": f"TRIM-{product_id:03d}",
        "size": None,
        "compatible_cars": ["Model Specific"],
        "car_make": None,
        "car_model": None,
        "year_range": None,
        "variants": [],
        "is_bestseller": False,
        "is_new": False
    })
    product_id += 1

# Additional lighting products
additional_lighting = [
    {"name": "LED Tail Lights", "price": 6500},
    {"name": "LED Brake Lights", "price": 2800},
    {"name": "LED Turn Signals", "price": 3200},
    {"name": "LED Interior Lights", "price": 1500},
    {"name": "LED License Plate Lights", "price": 1200},
]

for light in additional_lighting:
    products.append({
        "id": product_id,
        "name": light["name"],
        "category": "Lighting & Electrical",
        "subcategory": "LED Lights",
        "price": light["price"],
        "price_varies": False,
        "description": create_description(light['name'], "Lighting & Electrical", "LED Lights", None, None),
        "stock": 20,
        "images": get_images(light["name"], "Lighting & Electrical", "LED Lights"),
        "sku": f"LED-LT-{product_id:03d}",
        "size": None,
        "compatible_cars": ["All Models"],
        "car_make": "Universal",
        "car_model": None,
        "year_range": None,
        "variants": [],
        "is_bestseller": False,
        "is_new": False
    })
    product_id += 1

# More body parts
more_body_parts = [
    {"name": "Side Mirror - Left", "models": ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz"]},
    {"name": "Side Mirror - Right", "models": ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz"]},
    {"name": "Grille", "models": ["Toyota Harrier", "Toyota Mark X", "Mazda Demio"]},
    {"name": "Door Handle", "models": ["Toyota Harrier", "Toyota Mark X", "Toyota Vitz"]},
]

for part in more_body_parts:
    for model in part["models"]:
        product_name = f"{part['name']} - {model}"
        products.append({
            "id": product_id,
            "name": product_name,
            "category": "Body Parts",
            "subcategory": part["name"].split(" - ")[0],
            "price": None,
            "price_varies": True,
            "description": create_description(f"{part['name']} - {model}", "Body Parts", part["name"].split(" - ")[0], None, model),
            "stock": 8,
            "images": get_images(product_name, "Body Parts", part["name"].split(" - ")[0]),
            "sku": f"BP-{product_id:03d}",
            "size": None,
            "compatible_cars": [model],
            "car_make": model.split()[0],
            "car_model": model,
            "year_range": "2010-2024",
            "variants": [],
            "is_bestseller": False,
            "is_new": False
        })
        product_id += 1

# Output JavaScript file
output_file = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'src', 'data', 'products.js')
os.makedirs(os.path.dirname(output_file), exist_ok=True)

with open(output_file, 'w', encoding='utf-8') as f:
    f.write("// Products data - All product information stored in frontend\n")
    f.write("// This ensures products are available even when backend is down\n\n")
    f.write("export const products = [\n")
    
    for i, p in enumerate(products):
        # Format as JavaScript object
        js_obj = json.dumps(p, indent=2, ensure_ascii=False)
        # Indent each line
        indented = '\n'.join('  ' + line if line.strip() else line for line in js_obj.split('\n'))
        f.write(indented)
        if i < len(products) - 1:
            f.write(',')
        f.write('\n')
    
    f.write("];\n\n")
    f.write(f"// Total products: {len(products)}\n")

print(f"Generated {len(products)} products in {output_file}")

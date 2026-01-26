"""
Products data file - All product definitions with descriptions and images
Simple, maintainable, easy to update
"""
from typing import List, Dict

def get_products_data() -> List[Dict]:
    """Return all products with complete data"""
    
    products = []
    product_id = 1
    
    # Helper to build image URLs
    def img_url(filename: str) -> str:
        return f"/product-images/{filename}"
    
    # LED Headlights
    led_headlight_products = [
        {
            "name": "Toby's T2 Plus LED Headlights - H1",
            "category": "Lighting & Electrical",
            "subcategory": "LED Headlights",
            "price": 8500,
            "description": "Experience superior visibility and enhanced safety with our premium Toby's T2 Plus LED Headlights - H1. These high-performance LED headlights deliver exceptional brightness and clarity, ensuring optimal road illumination in all weather conditions. Built with advanced chip technology and robust construction, they provide long-lasting reliability and energy efficiency. Perfect for drivers who demand the best in automotive lighting technology. This product features precision engineering and quality materials for optimal performance. Available in H1 size configuration. Universal fitment design makes this product compatible with a wide range of vehicle makes and models. Installation is straightforward with plug-and-play design where applicable, and all products come with comprehensive compatibility information. For specific fitment questions or technical support, our expert team is available to assist you in finding the perfect match for your vehicle.",
            "images": [img_url("download tobby.jpg"), img_url("Tobys-T2-Plus-H4-LED-Headlight-HiLo-Beam-150W - Copy (2).webp"), img_url("download (100) - Copy.jpg")],
            "size": "H1",
            "stock": 25,
            "sku": f"LED-H1-{product_id:03d}",
            "compatible_cars": ["All Models"],
            "car_make": "Universal",
            "is_bestseller": False,
            "is_new": False
        },
        {
            "name": "Toby's T2 Plus LED Headlights - H4",
            "category": "Lighting & Electrical",
            "subcategory": "LED Headlights",
            "price": 8500,
            "original_price": 10000,
            "discount_percent": 15,
            "description": "Experience superior visibility and enhanced safety with our premium Toby's T2 Plus LED Headlights - H4. These high-performance LED headlights deliver exceptional brightness and clarity, ensuring optimal road illumination in all weather conditions. Built with advanced chip technology and robust construction, they provide long-lasting reliability and energy efficiency. Perfect for drivers who demand the best in automotive lighting technology. This product features precision engineering and quality materials for optimal performance. Available in H4 size configuration. Universal fitment design makes this product compatible with a wide range of vehicle makes and models. Installation is straightforward with plug-and-play design where applicable, and all products come with comprehensive compatibility information. For specific fitment questions or technical support, our expert team is available to assist you in finding the perfect match for your vehicle.",
            "images": [img_url("download tobby.jpg"), img_url("Tobys-T2-Plus-H4-LED-Headlight-HiLo-Beam-150W - Copy (2).webp"), img_url("download (100) - Copy.jpg")],
            "size": "H4",
            "stock": 25,
            "sku": f"LED-H4-{product_id:03d}",
            "compatible_cars": ["All Models"],
            "car_make": "Universal",
            "is_bestseller": True,
            "is_new": False
        },
        {
            "name": "APP LED Headlights - H4",
            "category": "Lighting & Electrical",
            "subcategory": "LED Headlights",
            "price": 7200,
            "description": "Experience superior visibility and enhanced safety with our premium APP LED Headlights - H4. These high-performance LED headlights deliver exceptional brightness and clarity, ensuring optimal road illumination in all weather conditions. Built with advanced chip technology and robust construction, they provide long-lasting reliability and energy efficiency. Perfect for drivers who demand the best in automotive lighting technology. This product features precision engineering and quality materials for optimal performance. Available in H4 size configuration. Universal fitment design makes this product compatible with a wide range of vehicle makes and models. Installation is straightforward with plug-and-play design where applicable, and all products come with comprehensive compatibility information. For specific fitment questions or technical support, our expert team is available to assist you in finding the perfect match for your vehicle.",
            "images": [img_url("led - Copy.avif"), img_url("New-High-Power-P11-Lampada-H7-H4-LED-Headlights-for-Cars-Bulbs-12V-White-6500K-20000lm-H1-H3-H11-H13-9005-9006-Fog-Lights-Carro-Headlight-Bulb - Copy.avif"), img_url("led - Copy.avif")],
            "size": "H4",
            "stock": 25,
            "sku": f"LED-H4-{product_id:03d}",
            "compatible_cars": ["All Models"],
            "car_make": "Universal",
            "is_bestseller": False,
            "is_new": False
        },
    ]
    
    # Add IDs and append to products list
    for product in led_headlight_products:
        product["id"] = product_id
        products.append(product)
        product_id += 1
    
    # Add more products here following the same pattern...
    # This is just a sample - you would add all your products here
    
    return products

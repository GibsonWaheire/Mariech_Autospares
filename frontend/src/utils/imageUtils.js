// Utility to get correct image paths
// Maps product image paths to actual asset locations

// Mapping from products.js image paths to actual filenames in public/product-images/
const IMAGE_PATH_MAPPING = {
  // Toby's LED Headlights - use APP LED as fallback since Toby files don't exist
  '/product-images/download tobby.jpg': '/product-images/APP LED Headlights 1 - Copy (2).jpg',
  '/product-images/Tobys-T2-Plus-H4-LED-Headlight-HiLo-Beam-150W - Copy (2).webp': '/product-images/APP LED Headlights 2 - Copy (2).jpg',
  '/product-images/download (100) - Copy.jpg': '/product-images/APP LED Headlights 3 - Copy (2).jpg',
  
  // Air Horn Kit
  '/product-images/air horn kit.jpg': '/product-images/Air Horn Kit 1 - Copy (3).jpg',
  '/product-images/air horn kit (2).jpg': '/product-images/Air Horn Kit 2 - Copy (2).jpg',
  '/product-images/air horn kit (3).jpg': '/product-images/Air Horn Kit 3 - Copy (2).jpg',
  
  // Automatic Gear Knob
  '/product-images/Automatic Gear Knob1 - Copy.jpg': '/product-images/Automatic Gear Knob 1 - Copy (2).jpg',
  '/product-images/Automatic Gear Knob2 - Copy.jpg': '/product-images/Automatic Gear Knob 2 - Copy.jpg',
  '/product-images/Automatic Gear Knob3 - Copy.jpg': '/product-images/Automatic Gear Knob 3 - Copy.jpg',
  
  // Basic Car Alarm
  '/product-images/basic car alarm 1.jpg': '/product-images/Basic Car Alarm 1 - Copy.jpg',
  '/product-images/basic car alarm 2.jpg': '/product-images/Basic Car Alarm 2 - Copy.jpg',
  '/product-images/basic car alarm3.jpg': '/product-images/Basic Car Alarm 3 - Copy.jpg',
  
  // Bi-LED
  '/product-images/bi led 1.jpg': '/product-images/Bi-LED Projector Headlights 1 - Copy.jpg',
  '/product-images/bi led (2).jpg': '/product-images/Bi-LED Projector Headlights 2 - Copy.jpg',
  '/product-images/bi led (3).jpg': '/product-images/Bi-LED Projector Headlights 3 - Copy.jpg',
  
  // B-LED Projector
  '/product-images/bled projector 1.jpg': '/product-images/B-LED Projector F-Series 1 - Copy.jpg',
  '/product-images/bled projector (2).jpg': '/product-images/B-LED Projector F-Series 2 - Copy.jpg',
  '/product-images/bled projector (3).jpg': '/product-images/B-LED Projector F-Series 3 - Copy.jpg',
  
  // Bonnet
  '/product-images/bonnet1.jpg': '/product-images/Bonnet - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note1 - Copy.jpg',
  '/product-images/bonnet (2).jpg': '/product-images/Bonnet - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note2 - Copy.jpg',
  '/product-images/bonnet (3).jpg': '/product-images/Bonnet - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy.jpg',
  
  // Boot Shock
  '/product-images/boot shock left1 - Copy.jpg': '/product-images/Boot Left Shock - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note, Toyota Camry, Honda Accord 1 - Copy.jpg',
  '/product-images/bootshock left2 - Copy.jpg': '/product-images/Boot Left Shock - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note, Toyota Camry, Honda Accord 2 - Copy.jpg',
  '/product-images/bootshock left 3 - Copy.jpg': '/product-images/Boot Left Shock - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note, Toyota Camry, Honda Accord 3 - Copy.jpg',
  '/product-images/boot shock r1ght1 - Copy.jpg': '/product-images/Boot Right Shock - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note, Toyota Camry, Honda Accord 1 - Copy.jpg',
  '/product-images/bootright shock2 - Copy.jpg': '/product-images/Boot Right Shock - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note, Toyota Camry, Honda Accord 2 - Copy.jpg',
  '/product-images/bootright shock 3 - Copy.jpg': '/product-images/Boot Right Shock - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note, Toyota Camry, Honda Accord 3 - Copy.jpg',
  
  // Bumper Lip
  '/product-images/bumper lip 1 - Copy.jpg': '/product-images/Bumper Lip - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note1 - Copy.jpg',
  '/product-images/bumper lip2 - Copy.jpg': '/product-images/BumpeLip - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note2 - Copy.jpg',
  '/product-images/bumper lip 3 - Copy.jpg': '/product-images/Bumpe Lip - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy.jpg',
  
  // Front Bumper
  '/product-images/front bumper.jpg': '/product-images/Front Bumper - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio1 - Copy.jpg',
  '/product-images/front bumper (2).jpg': '/product-images/Front Bumper - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio2 - Copy.jpg',
  '/product-images/front bumper (3).jpg': '/product-images/Front Bumper - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio3 - Copy.jpg',
  
  // Real Bumper
  '/product-images/real bumper 1 - Copy.jpg': '/product-images/Real Bumper - Toyota Harrier, Toyota Mark X, Toyota Vitz1 - Copy.jpg',
  '/product-images/real bumper 2 - Copy.jpg': '/product-images/Real Bumper - Toyota Harrier, Toyota Mark X, Toyota Vitz2 - Copy.jpg',
  '/product-images/real bumper 3 - Copy.jpg': '/product-images/Real Bumper - Toyota Harrier, Toyota Mark X, Toyota Vitz3 - Copy.jpg',
  
  // Horn for Toyota
  '/product-images/horn toyota.jpg': '/product-images/Horn for Toyota Harrier 1 - Copy.jpg',
  '/product-images/horn toyota (2).jpg': '/product-images/Horn for Toyota Harrier 2 - Copy.jpg',
  '/product-images/horn toyota (3).jpg': '/product-images/Horn for Toyota Harrier 3 - Copy.jpg',
  
  // Horn for Mazda
  '/product-images/horn mazda.jpg': '/product-images/Horn for Mazda Demio 1 - Copy.jpg',
  '/product-images/horn mazda (2).jpg': '/product-images/Horn for Mazda Demio 2 - Copy.jpg',
  '/product-images/horn mazda (3).jpg': '/product-images/Horn for Mazda Demio 2 - Copy.jpg',
  
  // HKS Turbo Timer
  '/product-images/hks turbo timer.jpg': '/product-images/HKS Turbo Timer 1 - Copy.jpg',
  '/product-images/hks turbo.jpg': '/product-images/HKS Turbo Timer 2 - Copy.jpg',
  '/product-images/hks turbo (2).jpg': '/product-images/HKS Turbo Timer 1 - Copy.jpg',
  
  // GPS
  '/product-images/gps.jpg': '/product-images/GPS Car Alarm 1 - Copy.jpg',
  '/product-images/gps (2).jpg': '/product-images/GPS Car Alarm 2 - Copy.jpg',
  '/product-images/gps (3).jpg': '/product-images/GPS Car Alarm 1 - Copy.jpg',
  
  // Manual Gear Knob
  '/product-images/Manual Gear Knob1 - Copy.jpg': '/product-images/Manual Gear Knob 1 - Copy.jpg',
  '/product-images/Manual Gear Knob2 - Copy.jpg': '/product-images/Manual Gear Knob 2 - Copy.jpg',
  '/product-images/Manual Gear Knob3 - Copy.jpg': '/product-images/Manual Gear Knob 3 - Copy.jpg',
  
  // Sport Gear Knob
  '/product-images/Sport Gear Knob1 - Copy.jpg': '/product-images/Sport Gear Knob 1 - Copy.jpg',
  '/product-images/Sport Gear Knob2 - Copy.jpg': '/product-images/Sport Gear Knob 2 - Copy.jpg',
  '/product-images/Sport Gear Knob3 - Copy.jpg': '/product-images/Sport Gear Knob 3 - Copy.jpg',
  
  // Leather Gear Knob
  '/product-images/Leather Gear Knob1 - Copy.jpg': '/product-images/Leather Gear Knob 1 - Copy.jpg',
  '/product-images/Leather Gear Knob2 - Copy.jpg': '/product-images/Leather Gear Knob 2 - Copy.jpg',
  '/product-images/Leather Gear Knob3 - Copy.jpg': '/product-images/Leather Gear Knob 3 - Copy.jpg',
  
  // Standard Car Mats
  '/product-images/Standard Car Mats1 - Copy.jpg': '/product-images/Standard Car Mats 1 - Copy.jpg',
  '/product-images/Standard Car Mats2 - Copy.jpg': '/product-images/Standard Car Mats 2 - Copy.jpg',
  '/product-images/Standard Car Mats3 - Copy.jpg': '/product-images/Standard Car Mats 3 - Copy.jpg',
  
  // Premium Car Mats
  '/product-images/Premium Car Mats1 - Copy.jpg': '/product-images/Premium Car Mats 1 - Copy.jpg',
  '/product-images/Premium Car Mats2 - Copy.jpg': '/product-images/Premium Car Mats 2 - Copy.jpg',
  '/product-images/Premium Car Mats3 - Copy.jpg': '/product-images/Premium Car Mats 3 - Copy.jpg',
  
  // Rubber Car Mats
  '/product-images/Rubber Car Mats1 - Copy.jpg': '/product-images/Rubber Car Mats 1 - Copy.jpg',
  '/product-images/Rubber Car Mats2 - Copy.jpg': '/product-images/Rubber Car Mats 2 - Copy.jpg',
  '/product-images/Rubber Car Mats3 - Copy.jpg': '/product-images/Rubber Car Mats 3 - Copy.jpg',
  
  // Custom Fit Car Mats
  '/product-images/Custom Fit Car Mats1 - Copy.jpg': '/product-images/Custom Fit Car Mats 1 - Copy.jpg',
  '/product-images/Custom Fit Car Mats2 - Copy.jpg': '/product-images/Custom Fit Car Mats 2 - Copy.jpg',
  '/product-images/Custom Fit Car Mats3 - Copy.jpg': '/product-images/Custom Fit Car Mats 3 - Copy.jpg',
  
  // Dashboard Trim
  '/product-images/Dashboard Trim1 - Copy.jpg': '/product-images/Dashboard Trim 1 - Copy.jpg',
  '/product-images/Dashboard Trim2 - Copy.jpg': '/product-images/Dashboard Trim 2 - Copy.jpg',
  '/product-images/Dashboard Trim3 - Copy.jpg': '/product-images/Dashboard Trim 3 - Copy.jpg',
  
  // Door Trim
  '/product-images/Door Trim1 - Copy.jpg': '/product-images/Door Trim 1 - Copy.jpg',
  '/product-images/Door Trim2 - Copy.jpg': '/product-images/Door Trim 2 - Copy.jpg',
  '/product-images/Door Trim3 - Copy.jpg': '/product-images/Door Trim 3 - Copy.jpg',
  
  // Center Console Trim
  '/product-images/Center Console Trim1 - Copy.jpg': '/product-images/Center Console Trim 1 - Copy.jpg',
  '/product-images/Center Console Trim2 - Copy.jpg': '/product-images/Center Console Trim 2 - Copy.jpg',
  '/product-images/Center Console Trim3 - Copy.jpg': '/product-images/Center Console Trim 3 - Copy.jpg',
  
  // Steering Wheel Trim
  '/product-images/Steering Wheel Trim1 - Copy.jpg': '/product-images/Steering Wheel Trim 1.jpg',
  '/product-images/Steering Wheel Trim2 - Copy (2).jpg': '/product-images/Steering Wheel Trim 2.jpg',
  '/product-images/Steering Wheel Trim3 - Copy (2).jpg': '/product-images/Steering Wheel Trim 3.jpg',
  
  // Front Mud Flaps
  '/product-images/Front Mud Flaps1 - Copy.jpg': '/product-images/Front Mud Flaps 1 - Copy.jpg',
  '/product-images/Front Mud Flaps2 - Copy.jpg': '/product-images/Front Mud Flaps 2 - Copy.jpg',
  '/product-images/Front Mud Flaps3 - Copy.jpg': '/product-images/Front Mud Flaps 3 - Copy.jpg',
  
  // Rear Mud Flaps
  '/product-images/Rear Mud Flaps1 - Copy.jpg': '/product-images/Rear Mud Flaps 1 - Copy.jpg',
  '/product-images/Rear Mud Flaps2 - Copy.jpg': '/product-images/Rear Mud Flaps 2 - Copy.jpg',
  '/product-images/Rear Mud Flaps3 - Copy.jpg': '/product-images/Rear Mud Flaps 3 - Copy.jpg',
  
  // Full Set Mud Flaps
  '/product-images/Full Set Mud Flaps1 - Copy.jpg': '/product-images/Full Set Mud Flaps 1 - Copy.jpg',
  '/product-images/Full Set Mud Flaps2 - Copy.jpg': '/product-images/Full Set Mud Flaps 2 - Copy.jpg',
  '/product-images/Full Set Mud Flaps3 - Copy.jpg': '/product-images/Full Set Mud Flaps 3 - Copy.jpg',
  
  // Door Handle
  '/product-images/door handle1 - Copy.jpg': '/product-images/Door Handle - Toyota Harrier, Toyota Mark X, Toyota Vitz 1 - Copy.jpg',
  '/product-images/doorhandle2 - Copy.jpg': '/product-images/Door Handle - Toyota Harrier, Toyota Mark X, Toyota Vitz 2 - Copy.jpg',
  '/product-images/doorhandle3 - Copy.jpg': '/product-images/Door Handle - Toyota Harrier, Toyota Mark X, Toyota Vitz 3 - Copy.jpg',
  
  // Fender Left
  '/product-images/fender left - Copy.jpg': '/product-images/Fender - Left - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio 1 - Copy.jpg',
  '/product-images/fender left 3 - Copy.jpg': '/product-images/Fender - Left - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio 3 - Copy.jpg',
  '/product-images/fender left 2 - Copy.jpg': '/product-images/Fender - Left - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio 2 - Copy.jpg',
  
  // Fender Right
  '/product-images/fender right - Copy.jpg': '/product-images/Fender - Right - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio 1 - Copy.jpg',
  '/product-images/fender right 1 - Copy.jpg': '/product-images/Fender - Right - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio 2 - Copy.jpg',
  '/product-images/fender right2 - Copy.jpg': '/product-images/Fender - Right - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio 3 - Copy.jpg',
  
  // Grille
  '/product-images/grille 1 - Copy.jpg': '/product-images/Grille - Toyota Harrier, Toyota Mark X, Mazda Demio 1 - Copy.jpg',
  '/product-images/grille2 - Copy.jpg': '/product-images/Grille - Toyota Harrier, Toyota Mark X, Mazda Demio 2 - Copy.jpg',
  '/product-images/grille3 - Copy.jpg': '/product-images/Grille - Toyota Harrier, Toyota Mark X, Mazda Demio 3 - Copy.jpg',
  
  // Rear Bumper
  '/product-images/rear bumper - Copy (2).jpg': '/product-images/Rear Bumper - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio1 - Copy.jpg',
  '/product-images/rear bumper (3) - Copy.jpg': '/product-images/Rear Bumper - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio2 - Copy.jpg',
  '/product-images/rear bumper 1 - Copy.jpg': '/product-images/Rear Bumper - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio3 - Copy.jpg',
  
  // Immobilizer
  '/product-images/immobilizer.jpg': '/product-images/Immobilizer 1 - Copy.jpg',
  '/product-images/immobilizer (2).jpg': '/product-images/Immobilizer 2 - Copy.jpg',
  '/product-images/immobilizer (3).jpg': '/product-images/Immobilizer 3 - Copy.jpg',
  
  // Remote Car Alarm
  '/product-images/remote car alarm - Copy (2).jpg': '/product-images/Remote Car Alarm 1 - Copy.jpg',
  '/product-images/remote car alarm (4).jpg': '/product-images/Remote Car Alarm 2 - Copy.jpg',
  '/product-images/remote car alarm (5).jpg': '/product-images/Remote Car Alarm 1 - Copy.jpg',
  
  // Universal Turbo Timer
  '/product-images/universal turbo - Copy.jpg': '/product-images/Universal Turbo Timer 1 - Copy.jpg',
  '/product-images/universal turbo (2).jpg': '/product-images/Universal Turbo Timer 2 - Copy.jpg',
  '/product-images/universal turbo (3).jpg': '/product-images/Universal Turbo Timer 3 - Copy.jpg',
  
  // Universal Electric Horn
  '/product-images/uniersal electic horn - Copy (2).jpg': '/product-images/Universal Electric Horn 1.jpg',
  '/product-images/universal ele horn - Copy.jpg': '/product-images/Universal Electric Horn 2.jpg',
  '/product-images/universal electric horn - Copy.jpg': '/product-images/Universal Electric Horn 3.jpg',
  
  // Single LED Projector
  '/product-images/single led - Copy (2).jpg': '/product-images/Single LED Projector Headlights 1 - Copy.jpg',
  '/product-images/sinle led - Copy.jpg': '/product-images/Single LED Projector Headlights 2 - Copy.jpg',
  '/product-images/single led projector.jpg': '/product-images/Single LED Projector Headlights 3 - Copy.jpg',
  
  // Tri-LED Projector
  '/product-images/tri led - Copy (2).jpg': '/product-images/Tri-LED Projector Headlights 1 - Copy.jpg',
  '/product-images/tri led (4).jpg': '/product-images/Tri-LED Projector Headlights 2 - Copy.jpg',
  '/product-images/tri led (5).jpg': '/product-images/Tri-LED Projector Headlights 3 - Copy.jpg',
  
  // Round Fog Lights
  '/product-images/round foglights - Copy (2).jpg': '/product-images/Round Fog Lights - 3 inch, 4 inch, 5 inch 1 - Copy.jpg',
  '/product-images/round foglights (4).jpg': '/product-images/Round Fog Lights - 3 inch, 4 inch, 5 inch 2 - Copy.jpg',
  '/product-images/round foglights (5).jpg': '/product-images/Round Fog Lights - 3 inch, 4 inch, 5 inch 3 - Copy.jpg',
  
  // Square Fog Lights
  '/product-images/square foglights - Copy (2).jpg': '/product-images/Square Fog Lights - 3x3 inch, 4x4 inch 1.jpg',
  '/product-images/square foglights (4).jpg': '/product-images/Square Fog Lights - 3x3 inch, 4x4 inch 2.jpg',
  '/product-images/square foglights (5).jpg': '/product-images/Square Fog Lights - 3x3 inch, 4x4 inch 3.jpg',
  
  // Universal LED Fog Lights
  '/product-images/universal led foglights - Copy.jpg': '/product-images/Universal LED Fog Lights - Round, Square 1.jpg',
  '/product-images/universal led f - Copy.jpg': '/product-images/Universal LED Fog Lights - Round, Square 2.jpg',
  '/product-images/universal led f (2).jpg': '/product-images/Universal LED Fog Lights - Round, Square 1.jpg',
  
  // Headlight Lenses
  '/product-images/headlight lenses.jpg': '/product-images/Headlight Lenses - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit 1 - Copy.jpg',
  '/product-images/headlight lenses (2).jpg': '/product-images/Headlight Lenses - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit 2 - Copy.jpg',
  '/product-images/headlight lenses (3).jpg': '/product-images/Headlight Lenses - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit 1 - Copy.jpg',
  
  // Strip DRL
  '/product-images/strip drl - Copy (2).jpg': '/product-images/Strip DRL 1.jpg',
  '/product-images/strip drl (4).jpg': '/product-images/Strip DRL 2.jpg',
  '/product-images/strip drl (5).jpg': '/product-images/Strip DRL 3.jpg',
  
  // Round DRL
  '/product-images/round drl - Copy (2).jpg': '/product-images/Round DRL 1 - Copy.jpg',
  '/product-images/round drl (4).jpg': '/product-images/Round DRL 2 - Copy.jpg',
  '/product-images/round drl (5).jpg': '/product-images/Round DRL 3 - Copy.jpg',
  
  // Square DRL
  '/product-images/square drl - Copy (2).jpg': '/product-images/Square DRL 1 - Copy.jpg',
  '/product-images/square drl (4).jpg': '/product-images/Square DRL 2.jpg',
  '/product-images/square drl (5).jpg': '/product-images/Square DRL 3.jpg',
  
  // Universal DRL
  '/product-images/universal drl kit - Copy.jpg': '/product-images/Universal DRL Kit 1.jpg',
  '/product-images/universal drl kit (2) - Copy.jpg': '/product-images/Universal DRL Kit 1.jpg',
  '/product-images/universal drl kit (3) - Copy.jpg': '/product-images/Universal DRL Kit 3.jpg',
  
  // LED Tail Lights
  '/product-images/led tail lights.jpg': '/product-images/LED Tail Lights 1 - Copy.jpg',
  '/product-images/led tail lights - Copy.jpg': '/product-images/LED Tail Lights 2 - Copy.jpg',
  '/product-images/led tail - Copy (2).jpg': '/product-images/LED Tail Lights 3 - Copy.jpg',
  
  // LED Brake Lights
  '/product-images/led brake.jpg': '/product-images/LED Brake Light 1 - Copy.jpg',
  '/product-images/led brake (2) - Copy.jpg': '/product-images/LED Brake Light 2 - Copy.jpg',
  '/product-images/led brake lights.jpg': '/product-images/LED Brake Light 3 - Copy.jpg',
  
  // LED Turn Signals
  '/product-images/led turn signals - Copy (2).jpg': '/product-images/LED Turn Signals1 - Copy.jpg',
  '/product-images/led turn signals (4) - Copy.jpg': '/product-images/LED Turn Signals2 - Copy.jpg',
  '/product-images/led turn signals (5) - Copy.jpg': '/product-images/LED Turn Signals3 - Copy.jpg',
  
  // LED Interior Lights
  '/product-images/led interior.jpg': '/product-images/LED Interior Lights1 - Copy.jpg',
  '/product-images/led interior lights - Copy - Copy.jpg': '/product-images/LED Interior Lights2 - Copy.jpg',
  '/product-images/led interior lights.jpg': '/product-images/LED Interior Lights3 - Copy.jpg',
  
  // LED License Plate
  '/product-images/led license plate.jpg': '/product-images/LED License Plate Lights1 - Copy.jpg',
  '/product-images/led license plate (2).jpg': '/product-images/LED License Plate Lights2 - Copy.jpg',
  '/product-images/led locense plate.jpg': '/product-images/LED License Plate Lights3 - Copy.jpg',
  
  // Mark X LED Headlights
  '/product-images/mark x - Copy (2).jpg': '/product-images/Mark X LED Headlights 1 - Copy.jpg',
  '/product-images/mark x headlights - Copy (2).jpg': '/product-images/Mark X LED Headlights 2 - Copy.jpg',
  '/product-images/mark x headlights.jpg': '/product-images/Mark X LED Headlights 3 - Copy.jpg',
  
  // Saloon Spoiler
  '/product-images/saloon spoiler 1 - Copy.jpg': '/product-images/Saloon Spoiler - Toyota Mark X, Toyota Camry, Honda Accord1 - Copy.jpg',
  '/product-images/saloon spoiler 2 - Copy.jpg': '/product-images/Saloon Spoiler - Toyota Mark X, Toyota Camry, Honda Accord2 - Copy.jpg',
  '/product-images/saloon spoiler 3 - Copy.jpg': '/product-images/Saloon Spoiler - Toyota Mark X, Toyota Camry, Honda Accord3 - Copy.jpg',
  
  // Hatchback Spoiler
  '/product-images/hatchback spoiler 1 - Copy.jpg': '/product-images/Hatchback Spoiler - Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note 1 - Copy.jpg',
  '/product-images/hatchback spoiler 2 - Copy.jpg': '/product-images/Hatchback Spoiler - Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note 2 - Copy.jpg',
  '/product-images/hatchback sp[oiler 3 - Copy.jpg': '/product-images/Hatchback Spoiler - Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note 3 - Copy.jpg',
  
  // Side Mirror Left
  '/product-images/side mirror left - Copy.jpg': '/product-images/Side Mirror - Left - Toyota Harrier, Toyota Mark X, Toyota Vitz 1 - Copy.jpg',
  '/product-images/side ,irror left - Copy.jpg': '/product-images/Side Mirror - Left - Toyota Harrier, Toyota Mark X, Toyota Vitz 2 - Copy.jpg',
  '/product-images/side mirror 2 - Copy.jpg': '/product-images/Side Mirror - Left - Toyota Harrier, Toyota Mark X, Toyota Vitz 3 - Copy.jpg',
  
  // Side Mirror Right
  '/product-images/side mirror right2 - Copy.jpg': '/product-images/Side Mirror - Right - Toyota Harrier, Toyota Mark X, Toyota Vitz 1 - Copy.jpg',
  '/product-images/side mirror roght1 - Copy.jpg': '/product-images/Side Mirror - Right - Toyota Harrier, Toyota Mark X, Toyota Vitz 2 - Copy.jpg',
  '/product-images/side morror right3 - Copy.jpg': '/product-images/Side Mirror - Right - Toyota Harrier, Toyota Mark X, Toyota Vitz 3 - Copy.jpg',
  
  // Wind Breaker
  '/product-images/Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy - Copy (3).jpg': '/product-images/Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy - Copy (3).jpg',
  '/product-images/Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy (5) - Copy.jpg': '/product-images/Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy (5) - Copy.jpg',
  '/product-images/Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy (6).jpg': '/product-images/Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy (6).jpg',
};

export const getImagePath = (imagePath) => {
  if (!imagePath) return null;
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Check direct mapping first
  if (IMAGE_PATH_MAPPING[imagePath]) {
    return IMAGE_PATH_MAPPING[imagePath];
  }
  
  // Extract filename from path
  const filename = imagePath.split('/').pop();
  
  // If path already starts with /product-images/, try to use it as-is
  // Some paths might be correct
  if (imagePath.startsWith('/product-images/')) {
    return imagePath;
  }
  
  // If it's already a relative path starting with /, return as is
  if (imagePath.startsWith('/')) {
    return imagePath;
  }
  
  // Default: assume it's in product-images
  return `/product-images/${filename}`;
};

// Get image from assets folder (for imports)
export const getAssetImage = (filename) => {
  if (!filename) return null;
  return `/src/assets/images/${filename}`;
};

// Utility to get correct image paths
// Maps products.js image paths to HD images in public/product-images/

const IMAGE_PATH_MAPPING = {
  // === LED HEADLIGHTS (Toby's T2 Plus, APP LED) ===
  '/product-images/led - Copy.avif': '/product-images/led-headlight-1.jpg',
  '/product-images/New-High-Power-P11-Lampada-H7-H4-LED-Headlights-for-Cars-Bulbs-12V-White-6500K-20000lm-H1-H3-H11-H13-9005-9006-Fog-Lights-Carro-Headlight-Bulb - Copy.avif': '/product-images/led-headlight-2.jpg',
  '/product-images/download tobby.jpg': '/product-images/led-headlight-1.jpg',
  '/product-images/Tobys-T2-Plus-H4-LED-Headlight-HiLo-Beam-150W - Copy (2).webp': '/product-images/led-headlight-2.jpg',
  '/product-images/download (100) - Copy.jpg': '/product-images/led-headlight-3.jpg',

  // === AIR HORN KIT ===
  '/product-images/air horn kit.jpg': '/product-images/horn-2.jpg',
  '/product-images/air horn kit (2).jpg': '/product-images/horn-3.jpg',
  '/product-images/air horn kit (3).jpg': '/product-images/horn-1.jpg',

  // === AUTOMATIC GEAR KNOB ===
  '/product-images/Automatic Gear Knob1 - Copy.jpg': '/product-images/gear-knob-1.jpg',
  '/product-images/Automatic Gear Knob2 - Copy.jpg': '/product-images/gear-knob-2.jpg',
  '/product-images/Automatic Gear Knob3 - Copy.jpg': '/product-images/gear-knob-4.jpg',

  // === BASIC CAR ALARM ===
  '/product-images/basic car alarm 1.jpg': '/product-images/car-alarm-1.jpg',
  '/product-images/basic car alarm 2.jpg': '/product-images/car-alarm-2.jpg',
  '/product-images/basic car alarm3.jpg': '/product-images/car-alarm-3.jpg',

  // === BI-LED PROJECTOR HEADLIGHTS ===
  '/product-images/bi led 1.jpg': '/product-images/led-projector-1.jpg',
  '/product-images/bi led (2).jpg': '/product-images/led-projector-2.jpg',
  '/product-images/bi led (3).jpg': '/product-images/led-projector-3.jpg',

  // === B-LED PROJECTOR F-SERIES ===
  '/product-images/bled projector 1.jpg': '/product-images/led-projector-4.jpg',
  '/product-images/bled projector (2).jpg': '/product-images/led-projector-1.jpg',
  '/product-images/bled projector (3).jpg': '/product-images/led-projector-2.jpg',

  // === BONNET ===
  '/product-images/bonnet1.jpg': '/product-images/bonnet-new-2.jpg',
  '/product-images/bonnet (2).jpg': '/product-images/bonnet-new-1.jpg',
  '/product-images/bonnet (3).jpg': '/product-images/front-bumper-new-1.jpg',

  // === BOOT LEFT SHOCK ===
  '/product-images/boot shock left1 - Copy.jpg': '/product-images/boot-shock-1.jpg',
  '/product-images/bootshock left2 - Copy.jpg': '/product-images/boot-shock-2.jpg',
  '/product-images/bootshock left 3 - Copy.jpg': '/product-images/boot-shock-3.jpg',

  // === BOOT RIGHT SHOCK ===
  '/product-images/boot shock r1ght1 - Copy.jpg': '/product-images/boot-shock-1.jpg',
  '/product-images/bootright shock2 - Copy.jpg': '/product-images/boot-shock-2.jpg',
  '/product-images/bootright shock 3 - Copy.jpg': '/product-images/boot-shock-3.jpg',

  // === BUMPER LIP ===
  '/product-images/bumper lip 1 - Copy.jpg': '/product-images/bumper-lip-new-1.jpg',
  '/product-images/bumper lip2 - Copy.jpg': '/product-images/bumper-lip-new-2.jpg',
  '/product-images/bumper lip 3 - Copy.jpg': '/product-images/bumper-lip-3.jpg',

  // === FRONT BUMPER ===
  '/product-images/front bumper.jpg': '/product-images/front-bumper-new-1.jpg',
  '/product-images/front bumper (2).jpg': '/product-images/bumper-lip-4.jpg',
  '/product-images/front bumper (3).jpg': '/product-images/bumper-lip-3.jpg',

  // === REAR BUMPER ===
  '/product-images/real bumper 1 - Copy.jpg': '/product-images/rear-bumper-new-1.jpg',
  '/product-images/real bumper 2 - Copy.jpg': '/product-images/rear-bumper-new-1.jpg',
  '/product-images/real bumper 3 - Copy.jpg': '/product-images/rear-bumper-new-1.jpg',
  '/product-images/rear bumper - Copy (2).jpg': '/product-images/rear-bumper-new-1.jpg',
  '/product-images/rear bumper (3) - Copy.jpg': '/product-images/rear-bumper-new-1.jpg',
  '/product-images/rear bumper 1 - Copy.jpg': '/product-images/rear-bumper-new-1.jpg',

  // === HORN (Toyota) ===
  '/product-images/horn toyota.jpg': '/product-images/horn-1.jpg',
  '/product-images/horn toyota (2).jpg': '/product-images/horn-2.jpg',
  '/product-images/horn toyota (3).jpg': '/product-images/horn-3.jpg',

  // === HORN (Mazda) ===
  '/product-images/horn mazda.jpg': '/product-images/horn-1.jpg',
  '/product-images/horn mazda (2).jpg': '/product-images/horn-2.jpg',
  '/product-images/horn mazda (3).jpg': '/product-images/horn-3.jpg',

  // === HKS TURBO TIMER ===
  '/product-images/hks turbo timer.jpg': '/product-images/turbo-timer-2.jpg',
  '/product-images/hks turbo.jpg': '/product-images/turbo-timer-1.jpg',
  '/product-images/hks turbo (2).jpg': '/product-images/turbo-timer-3.jpg',

  // === GPS CAR ALARM ===
  '/product-images/gps.jpg': '/product-images/car-alarm-1.jpg',
  '/product-images/gps (2).jpg': '/product-images/car-alarm-2.jpg',
  '/product-images/gps (3).jpg': '/product-images/car-alarm-3.jpg',

  // === MANUAL GEAR KNOB ===
  '/product-images/Manual Gear Knob1 - Copy.jpg': '/product-images/gear-knob-3.jpg',
  '/product-images/Manual Gear Knob2 - Copy.jpg': '/product-images/gear-knob-5.jpg',
  '/product-images/Manual Gear Knob3 - Copy.jpg': '/product-images/gear-knob-6.jpg',

  // === SPORT GEAR KNOB ===
  '/product-images/Sport Gear Knob1 - Copy.jpg': '/product-images/gear-knob-4.jpg',
  '/product-images/Sport Gear Knob2 - Copy.jpg': '/product-images/gear-knob-3.jpg',
  '/product-images/Sport Gear Knob3 - Copy.jpg': '/product-images/gear-knob-1.jpg',

  // === LEATHER GEAR KNOB ===
  '/product-images/Leather Gear Knob1 - Copy.jpg': '/product-images/gear-knob-2.jpg',
  '/product-images/Leather Gear Knob2 - Copy.jpg': '/product-images/gear-knob-5.jpg',
  '/product-images/Leather Gear Knob3 - Copy.jpg': '/product-images/gear-knob-6.jpg',

  // === STANDARD CAR MATS ===
  '/product-images/Standard Car Mats1 - Copy.jpg': '/product-images/car-mats-new-1.jpg',
  '/product-images/Standard Car Mats2 - Copy.jpg': '/product-images/car-mats-new-2.jpg',
  '/product-images/Standard Car Mats3 - Copy.jpg': '/product-images/car-mats-3.jpg',

  // === PREMIUM CAR MATS ===
  '/product-images/Premium Car Mats1 - Copy.jpg': '/product-images/car-mats-5.jpg',
  '/product-images/Premium Car Mats2 - Copy.jpg': '/product-images/car-mats-6.jpg',
  '/product-images/Premium Car Mats3 - Copy.jpg': '/product-images/car-mats-new-1.jpg',

  // === RUBBER CAR MATS ===
  '/product-images/Rubber Car Mats1 - Copy.jpg': '/product-images/car-mats-3.jpg',
  '/product-images/Rubber Car Mats2 - Copy.jpg': '/product-images/car-mats-4.jpg',
  '/product-images/Rubber Car Mats3 - Copy.jpg': '/product-images/car-mats-6.jpg',

  // === CUSTOM FIT CAR MATS ===
  '/product-images/Custom Fit Car Mats1 - Copy.jpg': '/product-images/car-mats-new-2.jpg',
  '/product-images/Custom Fit Car Mats2 - Copy.jpg': '/product-images/car-mats-5.jpg',
  '/product-images/Custom Fit Car Mats3 - Copy.jpg': '/product-images/car-mats-new-1.jpg',

  // === DASHBOARD TRIM ===
  '/product-images/Dashboard Trim1 - Copy.jpg': '/product-images/interior-trim-1.jpg',
  '/product-images/Dashboard Trim2 - Copy.jpg': '/product-images/interior-trim-1.jpg',
  '/product-images/Dashboard Trim3 - Copy.jpg': '/product-images/interior-trim-1.jpg',

  // === DOOR TRIM ===
  '/product-images/Door Trim1 - Copy.jpg': '/product-images/interior-trim-1.jpg',
  '/product-images/Door Trim2 - Copy.jpg': '/product-images/interior-trim-1.jpg',
  '/product-images/Door Trim3 - Copy.jpg': '/product-images/interior-trim-1.jpg',

  // === CENTER CONSOLE TRIM ===
  '/product-images/Center Console Trim1 - Copy.jpg': '/product-images/interior-trim-1.jpg',
  '/product-images/Center Console Trim2 - Copy.jpg': '/product-images/interior-trim-1.jpg',
  '/product-images/Center Console Trim3 - Copy.jpg': '/product-images/interior-trim-1.jpg',

  // === STEERING WHEEL TRIM ===
  '/product-images/Steering Wheel Trim1 - Copy.jpg': '/product-images/steering-cover-1.jpg',
  '/product-images/Steering Wheel Trim2 - Copy (2).jpg': '/product-images/steering-cover-2.jpg',
  '/product-images/Steering Wheel Trim3 - Copy (2).jpg': '/product-images/steering-cover-3.jpg',

  // === FRONT MUD FLAPS ===
  '/product-images/Front Mud Flaps1 - Copy.jpg': '/product-images/mud-flap-1.jpg',
  '/product-images/Front Mud Flaps2 - Copy.jpg': '/product-images/mud-flap-2.jpg',
  '/product-images/Front Mud Flaps3 - Copy.jpg': '/product-images/mud-flap-3.jpg',

  // === REAR MUD FLAPS ===
  '/product-images/Rear Mud Flaps1 - Copy.jpg': '/product-images/mud-flap-3.jpg',
  '/product-images/Rear Mud Flaps2 - Copy.jpg': '/product-images/mud-flap-4.jpg',
  '/product-images/Rear Mud Flaps3 - Copy.jpg': '/product-images/mud-flap-5.jpg',

  // === FULL SET MUD FLAPS ===
  '/product-images/Full Set Mud Flaps1 - Copy.jpg': '/product-images/mud-flap-4.jpg',
  '/product-images/Full Set Mud Flaps2 - Copy.jpg': '/product-images/mud-flap-5.jpg',
  '/product-images/Full Set Mud Flaps3 - Copy.jpg': '/product-images/mud-flap-1.jpg',

  // === DOOR HANDLE ===
  '/product-images/door handle1 - Copy.jpg': '/product-images/door-handle-1.jpg',
  '/product-images/doorhandle2 - Copy.jpg': '/product-images/door-handle-1.jpg',
  '/product-images/doorhandle3 - Copy.jpg': '/product-images/door-handle-1.jpg',

  // === FENDER LEFT ===
  '/product-images/fender left - Copy.jpg': '/product-images/fender-new-1.jpg',
  '/product-images/fender left 3 - Copy.jpg': '/product-images/fender-new-1.jpg',
  '/product-images/fender left 2 - Copy.jpg': '/product-images/fender-new-1.jpg',

  // === FENDER RIGHT ===
  '/product-images/fender right - Copy.jpg': '/product-images/fender-new-1.jpg',
  '/product-images/fender right 1 - Copy.jpg': '/product-images/fender-new-1.jpg',
  '/product-images/fender right2 - Copy.jpg': '/product-images/fender-new-1.jpg',

  // === GRILLE ===
  '/product-images/grille 1 - Copy.jpg': '/product-images/grille-harrier-new-1.jpg',
  '/product-images/grille2 - Copy.jpg': '/product-images/grille-harrier-new-2.jpg',
  '/product-images/grille3 - Copy.jpg': '/product-images/grille-3.jpg',

  // === IMMOBILIZER ===
  '/product-images/immobilizer.jpg': '/product-images/immobilizer-1.jpg',
  '/product-images/immobilizer (2).jpg': '/product-images/car-alarm-1.jpg',
  '/product-images/immobilizer (3).jpg': '/product-images/car-alarm-2.jpg',

  // === REMOTE CAR ALARM ===
  '/product-images/remote car alarm - Copy (2).jpg': '/product-images/car-alarm-2.jpg',
  '/product-images/remote car alarm (4).jpg': '/product-images/car-alarm-3.jpg',
  '/product-images/remote car alarm (5).jpg': '/product-images/car-alarm-1.jpg',

  // === UNIVERSAL TURBO TIMER ===
  '/product-images/universal turbo - Copy.jpg': '/product-images/turbo-timer-1.jpg',
  '/product-images/universal turbo (2).jpg': '/product-images/turbo-timer-3.jpg',
  '/product-images/universal turbo (3).jpg': '/product-images/turbo-timer-4.jpg',

  // === UNIVERSAL ELECTRIC HORN ===
  '/product-images/uniersal electic horn - Copy (2).jpg': '/product-images/horn-1.jpg',
  '/product-images/universal ele horn - Copy.jpg': '/product-images/horn-2.jpg',
  '/product-images/universal electric horn - Copy.jpg': '/product-images/horn-3.jpg',

  // === SINGLE LED PROJECTOR ===
  '/product-images/single led - Copy (2).jpg': '/product-images/led-projector-1.jpg',
  '/product-images/sinle led - Copy.jpg': '/product-images/led-projector-2.jpg',
  '/product-images/single led projector.jpg': '/product-images/led-projector-3.jpg',

  // === TRI-LED PROJECTOR ===
  '/product-images/tri led - Copy (2).jpg': '/product-images/led-projector-3.jpg',
  '/product-images/tri led (4).jpg': '/product-images/led-projector-4.jpg',
  '/product-images/tri led (5).jpg': '/product-images/led-projector-1.jpg',

  // === ROUND FOG LIGHTS ===
  '/product-images/round foglights - Copy (2).jpg': '/product-images/fog-light-1.jpg',
  '/product-images/round foglights (4).jpg': '/product-images/fog-light-3.jpg',
  '/product-images/round foglights (5).jpg': '/product-images/fog-light-2.jpg',

  // === SQUARE FOG LIGHTS ===
  '/product-images/square foglights - Copy (2).jpg': '/product-images/fog-light-4.jpg',
  '/product-images/square foglights (4).jpg': '/product-images/fog-light-2.jpg',
  '/product-images/square foglights (5).jpg': '/product-images/fog-light-3.jpg',

  // === UNIVERSAL LED FOG LIGHTS ===
  '/product-images/universal led foglights - Copy.jpg': '/product-images/fog-light-1.jpg',
  '/product-images/universal led f - Copy.jpg': '/product-images/fog-light-4.jpg',
  '/product-images/universal led f (2).jpg': '/product-images/fog-light-2.jpg',

  // === HEADLIGHT LENSES ===
  '/product-images/headlight lenses.jpg': '/product-images/led-projector-2.jpg',
  '/product-images/headlight lenses (2).jpg': '/product-images/led-projector-3.jpg',
  '/product-images/headlight lenses (3).jpg': '/product-images/led-projector-4.jpg',

  // === STRIP DRL ===
  '/product-images/strip drl - Copy (2).jpg': '/product-images/fog-light-1.jpg',
  '/product-images/strip drl (4).jpg': '/product-images/fog-light-2.jpg',
  '/product-images/strip drl (5).jpg': '/product-images/fog-light-3.jpg',

  // === ROUND DRL ===
  '/product-images/round drl - Copy (2).jpg': '/product-images/fog-light-3.jpg',
  '/product-images/round drl (4).jpg': '/product-images/fog-light-1.jpg',
  '/product-images/round drl (5).jpg': '/product-images/fog-light-2.jpg',

  // === SQUARE DRL ===
  '/product-images/square drl - Copy (2).jpg': '/product-images/fog-light-4.jpg',
  '/product-images/square drl (4).jpg': '/product-images/fog-light-3.jpg',
  '/product-images/square drl (5).jpg': '/product-images/fog-light-2.jpg',

  // === UNIVERSAL DRL ===
  '/product-images/universal drl kit - Copy.jpg': '/product-images/fog-light-1.jpg',
  '/product-images/universal drl kit (2) - Copy.jpg': '/product-images/fog-light-4.jpg',
  '/product-images/universal drl kit (3) - Copy.jpg': '/product-images/fog-light-2.jpg',

  // === LED TAIL LIGHTS ===
  '/product-images/led tail lights.jpg': '/product-images/led-tail-1.jpg',
  '/product-images/led tail lights - Copy.jpg': '/product-images/led-tail-2.jpg',
  '/product-images/led tail - Copy (2).jpg': '/product-images/led-tail-1.jpg',

  // === LED BRAKE LIGHTS ===
  '/product-images/led brake.jpg': '/product-images/led-tail-2.jpg',
  '/product-images/led brake (2) - Copy.jpg': '/product-images/led-tail-1.jpg',
  '/product-images/led brake lights.jpg': '/product-images/led-tail-2.jpg',

  // === LED TURN SIGNALS ===
  '/product-images/led turn signals - Copy (2).jpg': '/product-images/led-tail-2.jpg',
  '/product-images/led turn signals (4) - Copy.jpg': '/product-images/led-headlight-4.jpg',
  '/product-images/led turn signals (5) - Copy.jpg': '/product-images/led-tail-1.jpg',

  // === LED INTERIOR LIGHTS ===
  '/product-images/led interior.jpg': '/product-images/led-interior-1.jpg',
  '/product-images/led interior lights - Copy - Copy.jpg': '/product-images/led-interior-2.jpg',
  '/product-images/led interior lights.jpg': '/product-images/led-interior-3.jpg',

  // === LED LICENSE PLATE LIGHTS ===
  '/product-images/led license plate.jpg': '/product-images/led-license-plate-1.jpg',
  '/product-images/led license plate (2).jpg': '/product-images/led-license-plate-2.jpg',
  '/product-images/led locense plate.jpg': '/product-images/led-license-plate-1.jpg',

  // === MARK X LED HEADLIGHTS ===
  '/product-images/mark x - Copy (2).jpg': '/product-images/led-projector-4.jpg',
  '/product-images/mark x headlights - Copy (2).jpg': '/product-images/led-projector-1.jpg',
  '/product-images/mark x headlights.jpg': '/product-images/led-projector-2.jpg',

  // === SALOON SPOILER ===
  '/product-images/saloon spoiler 1 - Copy.jpg': '/product-images/spoiler-wing-new-1.jpg',
  '/product-images/saloon spoiler 2 - Copy.jpg': '/product-images/spoiler-2.jpg',
  '/product-images/saloon spoiler 3 - Copy.jpg': '/product-images/spoiler-3.jpg',

  // === HATCHBACK SPOILER ===
  '/product-images/hatchback spoiler 1 - Copy.jpg': '/product-images/spoiler-wing-new-1.jpg',
  '/product-images/hatchback spoiler 2 - Copy.jpg': '/product-images/spoiler-4.jpg',
  '/product-images/hatchback sp[oiler 3 - Copy.jpg': '/product-images/spoiler-2.jpg',

  // === SIDE MIRROR LEFT ===
  '/product-images/side mirror left - Copy.jpg': '/product-images/side-mirror-1.jpg',
  '/product-images/side ,irror left - Copy.jpg': '/product-images/side-mirror-1.jpg',
  '/product-images/side mirror 2 - Copy.jpg': '/product-images/side-mirror-1.jpg',

  // === SIDE MIRROR RIGHT ===
  '/product-images/side mirror right2 - Copy.jpg': '/product-images/side-mirror-1.jpg',
  '/product-images/side mirror roght1 - Copy.jpg': '/product-images/side-mirror-1.jpg',
  '/product-images/side morror right3 - Copy.jpg': '/product-images/side-mirror-1.jpg',

  // === WIND BREAKER ===
  '/product-images/Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy - Copy (3).jpg': '/product-images/wind-breaker-new-1.jpg',
  '/product-images/Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy (5) - Copy.jpg': '/product-images/wind-breaker-new-1.jpg',
  '/product-images/Wind Breaker - Toyota Harrier, Toyota Mark X, Toyota Vitz, Mazda Demio, Honda Fit, Nissan Note3 - Copy (6).jpg': '/product-images/wind-breaker-new-1.jpg',
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

  // Return path as-is (already correct or handled elsewhere)
  return imagePath;
};

// Get image from assets folder (for imports)
export const getAssetImage = (filename) => {
  if (!filename) return null;
  return `/src/assets/images/${filename}`;
};

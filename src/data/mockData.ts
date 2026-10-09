import { Product, Recipe, Testimonial } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_palm_oil_bottle_1790991679361.jpg';
export const STUDIO_BOTTLE_IMAGE = '/src/assets/images/product_drop_bottle_studio_1790991690774.jpg';
export const PLANTATION_IMAGE = '/src/assets/images/palm_plantation_harvest_1790991700793.jpg';
export const EGUSI_SOUP_IMAGE = '/src/assets/images/nigerian_egusi_soup_cooking_1790991712054.jpg';
export const DROP_LOGO_IMAGE = '/src/assets/images/drop_logo.png';
export const DROP_ABOUT_OIL_IMAGE = '/src/assets/images/drop_about_oil.png';
export const DROP_BOTTLE_NEW_IMAGE = '/src/assets/images/drop_bottle_new.png';
export const HARVEST_BUNCHES_IMAGE = '/src/assets/images/palm_fruit_harvest_bunches_1791152945605.jpg';
export const MILL_PROCESSING_IMAGE = '/src/assets/images/palm_oil_mill_processing_1791152955494.jpg';
export const VISION_HERO_IMAGE = '/src/assets/images/vision_hero_drop22.png';
export const MISSION_TRUST_IMAGE = '/src/assets/images/mission_trust_drop1.png';
export const OFADA_STEW_IMAGE = '/src/assets/images/recipe_ofada_stew.png';
export const JOLLOF_RICE_IMAGE = '/src/assets/images/recipe_jollof_rice.png';
export const BANGA_SOUP_IMAGE = '/src/assets/images/recipe_banga_soup.png';

export const PRODUCTS: Product[] = [
  {
    id: 'drop-palm-oil-1l',
    name: 'Drop Palm Oil — 1L',
    size: '1 Litre',
    volumeLiters: 1,
    priceNgn: 4500,
    tagline: 'The daily kitchen staple for authentic Nigerian aroma.',
    description: 'Freshly extracted from pristine palm fruit harvests in Edo State. Bottled without chemical solvents, artificial food colorants (Sudan dyes), or preservatives. Delivers deep red color, velvety mouthfeel, and traditional warm nutty aroma to every pot.',
    inStock: true,
    image: DROP_BOTTLE_NEW_IMAGE,
    lifestyleImage: HERO_IMAGE,
    rating: 4.9,
    reviewCount: 142,
    isBestseller: true,
    idealFor: 'Everyday family cooking, soups, vegetable sautés & quick stews',
    specifications: {
      freeFattyAcids: '< 1.8% (Extra Grade)',
      moistureContent: '< 0.12% (Long shelf stability)',
      smokePoint: '232°C (High heat tolerance)',
      additives: '0.00% Pure Unadulterated',
      origin: 'Ovia Palm Belt, Edo State, Nigeria'
    }
  },
  {
    id: 'drop-palm-oil-2l',
    name: 'Drop Palm Oil — 2L',
    size: '2 Litres',
    volumeLiters: 2,
    priceNgn: 9000,
    tagline: 'The ideal size for weekly Nigerian family feast cooking.',
    description: 'Double the capacity for households that cook authentic soups multiple times a week. Retains fresh beta-carotene and vitamin E content in an airtight UV-resistant amber bottle to prevent oxidation.',
    inStock: true,
    image: DROP_BOTTLE_NEW_IMAGE,
    lifestyleImage: EGUSI_SOUP_IMAGE,
    rating: 4.95,
    reviewCount: 98,
    isBestseller: true,
    idealFor: 'Active family kitchens, weekend pot preparations, Sunday feasts',
    specifications: {
      freeFattyAcids: '< 1.8% (Extra Grade)',
      moistureContent: '< 0.12%',
      smokePoint: '232°C',
      additives: 'Zero chemical dyes or additives',
      origin: 'Ovia Palm Belt, Edo State, Nigeria'
    }
  },
  {
    id: 'drop-palm-oil-5l',
    name: 'Drop Palm Oil — 5L',
    size: '5 Litres',
    volumeLiters: 5,
    priceNgn: 22500,
    tagline: 'Generous value for avid home cooks and small food vendors.',
    description: 'Our convenient easy-pour jerrycan with a leak-proof induction-sealed cap. Specially molded handle for ergonomic pouring into measuring cups and stockpots without oily drips.',
    inStock: true,
    image: DROP_BOTTLE_NEW_IMAGE,
    lifestyleImage: HERO_IMAGE,
    rating: 4.88,
    reviewCount: 76,
    isBestseller: false,
    idealFor: 'Busy households, holiday festivities, small food businesses',
    specifications: {
      freeFattyAcids: '< 2.0%',
      moistureContent: '< 0.14%',
      smokePoint: '230°C',
      additives: 'Zero chemical dyes or additives',
      origin: 'Ovia Palm Belt, Edo State, Nigeria'
    }
  },
  {
    id: 'drop-palm-oil-25l',
    name: 'Drop Palm Oil — 25L',
    size: '25 Litres',
    volumeLiters: 25,
    priceNgn: 112500,
    tagline: 'Commercial grade purity for restaurants, caterers & hotels.',
    description: 'Heavy-duty industrial food-grade drum designed for high-volume commercial kitchens, wedding caterers, and food processors. Guarantees uniform soup color and customer taste consistency across thousands of servings.',
    inStock: true,
    image: DROP_BOTTLE_NEW_IMAGE,
    lifestyleImage: PLANTATION_IMAGE,
    rating: 5.0,
    reviewCount: 53,
    isBestseller: false,
    idealFor: 'Buka operators, luxury hotels, event caterers, food manufacturers',
    specifications: {
      freeFattyAcids: '< 2.0%',
      moistureContent: '< 0.15%',
      smokePoint: '230°C',
      additives: 'Zero chemical dyes or additives',
      origin: 'Ovia Palm Belt, Edo State, Nigeria'
    }
  },
  {
    id: 'drop-gift-duo',
    name: 'Drop Culinary Heritage Duo Pack',
    size: '2 x 1L Bottles',
    volumeLiters: 2,
    priceNgn: 11500,
    tagline: 'Artisanal gift box with two bottles of pristine virgin palm oil.',
    description: 'Packaged in a bespoke sustainable wooden presentation box with our traditional recipe card collection. The thoughtful gift for foodies, weddings, festive hampers, and diaspora friends craving home.',
    inStock: true,
    image: DROP_BOTTLE_NEW_IMAGE,
    lifestyleImage: EGUSI_SOUP_IMAGE,
    rating: 4.96,
    reviewCount: 39,
    isBestseller: false,
    idealFor: 'Gift hampers, weddings, housewarming, culinary enthusiasts',
    specifications: {
      freeFattyAcids: '< 1.7%',
      moistureContent: '< 0.10%',
      smokePoint: '234°C',
      additives: 'Zero chemical dyes or additives',
      origin: 'Ovia Palm Belt, Edo State, Nigeria'
    }
  }
];

export const FARM_TO_BOTTLE_STEPS = [
  {
    number: '01',
    phaseLabel: 'Phase 01',
    title: 'The Palm Farm',
    shortDesc: 'Hand-picked from certified smallholder agroforest groves in Southern Nigeria.',
    details: 'Our oil begins in sustainably managed palm groves where wild and nurtured oil palms grow alongside natural biodiverse flora, free from synthetic pesticides.',
    badge: 'Sustainable Groves',
    image: PLANTATION_IMAGE,
  },
  {
    number: '02',
    phaseLabel: 'Phase 02',
    title: 'Palm Fruit Harvest',
    shortDesc: 'Climbing master harvesters cutting and gathering ripe palm fruit bunches.',
    details: 'Harvest timing is critical: ripe oil palm fruit bunches are harvested fresh from tall palms and swiftly transported to preserve natural beta-carotenes and guarantee ultra-low Free Fatty Acids (FFA).',
    badge: 'Harvested Fruit Bunches',
    image: HARVEST_BUNCHES_IMAGE,
  },
  {
    number: '03',
    phaseLabel: 'Phase 03',
    title: 'Steam Processing & Milling',
    shortDesc: 'Hygienic mill processing where fresh palm fruit is gently extracted.',
    details: 'Fresh palm fruitlets are softened with clean pressurized steam and pressed through mechanical screw presses—never petroleum chemical extraction solvents, kerosene, or synthetic coloring agents.',
    badge: 'Zero Chemical Solvents',
    image: MILL_PROCESSING_IMAGE,
  },
  {
    number: '05',
    phaseLabel: 'Phase 05',
    title: 'The Pure Bottle of Drop Palm Oil',
    shortDesc: '100% unadulterated Nigerian palm oil bottled with honesty and integrity.',
    details: 'Induction-sealed in UV-protected food-grade bottles. Pure, unadulterated virgin palm oil that brings the unmistakable aroma, deep golden-red hue, and authentic taste of home to your kitchen.',
    badge: 'Drop Palm Oil Bottle',
    image: DROP_BOTTLE_NEW_IMAGE,
  }
];

export const RECIPES: Recipe[] = [
  {
    id: 'egusi-soup',
    title: 'Authentic Egusi Soup (Melon Seed Soup)',
    category: 'Soup',
    prepTime: '20 mins',
    cookTime: '45 mins',
    servings: '6 servings',
    difficulty: 'Intermediate',
    summary: 'The reigning crown jewel of Nigerian tables. Ground melon seeds simmered gently in rich Drop Palm Oil with smoked catfish, tender beef cuts, and fresh pumpkin leaves.',
    image: EGUSI_SOUP_IMAGE,
    oilQuantity: '¾ cup Drop Palm Oil',
    ingredients: [
      '2 cups raw melon seeds (egusi), finely ground',
      '¾ cup Drop Palm Oil',
      '1 kg assorted meats (beef, tripe/shaki, cow foot), pre-cooked with stock',
      '2 pieces medium dried smoked catfish, cleaned and debars',
      '3 tablespoons ground crayfish',
      '1 medium red onion, diced',
      '4 scotch bonnet peppers (ata rodo), blended coarsely',
      '2 cups chopped fresh ugu (fluted pumpkin) or spinach leaves',
      '2 seasoning cubes & sea salt to taste',
      '3 cups rich meat stock'
    ],
    instructions: [
      'Heat Drop Palm Oil in a wide cooking pot over medium-low heat for 90 seconds until translucent. Do not bleach the oil—its rich red tone is the secret to Egusi’s radiant color.',
      'Add half the diced onions and sauté until fragrant. Mix the ground egusi with 4 tablespoons of warm water to form a thick crumbly paste.',
      'Spoon small clumps of egusi paste into the warm oil. Lower heat, cover pot, and let fry without stirring for 5 minutes so curds set.',
      'Gently stir with a wooden spoon to break into soft, pebble-sized nuggets. Pour in the rich meat stock and blended scotch bonnet peppers.',
      'Add cooked meats, deboned smoked catfish, ground crayfish, seasoning cubes, and salt. Stir gently, cover, and simmer for 20 minutes.',
      'Fold in the fresh chopped pumpkin leaves. Simmer for an additional 3 minutes, then turn off heat and let steam for 5 minutes before serving with hot pounded yam or eba.'
    ],
    chefTip: 'Never bleach Drop Palm Oil for Egusi soup! Gentle heating preserves the rich vitamins and imparts a warm, nutty foundation that complements the egusi seeds.'
  },
  {
    id: 'banga-soup',
    title: 'Delta-Style Banga Soup (Ofe Akwu)',
    category: 'Soup',
    prepTime: '25 mins',
    cookTime: '50 mins',
    servings: '6-8 servings',
    difficulty: 'Master Cook',
    summary: 'A fragrant, earthy delicacy from the Niger Delta. Silky palm fruit concentrate enriched with Drop Palm Oil, scented with beletete leaves and traditional oburunbebe bark.',
    image: BANGA_SOUP_IMAGE,
    oilQuantity: '½ cup Drop Palm Oil (to finish & enrich)',
    ingredients: [
      '1.5 kg fresh palm fruit concentrate or purée',
      '½ cup Drop Palm Oil',
      '1 kg fresh catfish steaks or assorted wild bushmeat',
      '1 piece dried smoked fish',
      '2 tablespoons Banga spice blend (rohojie and oburunbebe bark)',
      '1 piece dried beletete leaves, crushed',
      '1 piece oburunbebe aromatic stick',
      '3 tablespoons ground crayfish',
      '3 scotch bonnet peppers, pounded',
      'Salt and seasoning cubes to taste'
    ],
    instructions: [
      'Pour the rich palm extract into a clay or heavy cast-iron pot over medium-high heat. Bring to an energetic boil for 20 minutes until oil begins to break to the surface.',
      'Add the traditional Banga spice blend, crushed beletete leaves, and drop in the oburunbebe aromatic stick.',
      'Introduce the pre-cleaned catfish steaks and smoked fish. Swirl the pot gently rather than stirring with a ladle to prevent the fish from breaking.',
      'Add the pounded peppers, ground crayfish, and seasoning cubes. Lower the heat and simmer for 15 minutes as the soup thickens into a glossy, velvety consistency.',
      'Drizzle ½ cup of fresh Drop Palm Oil over the top during the final 4 minutes to achieve that glorious mirror-like sheen and deep aroma.',
      'Serve steaming hot with warm yellow cassava starch, pounded yam, or boiled white rice.'
    ],
    chefTip: 'The oburunbebe stick infuses a subtle woody, medicinal depth that makes Banga unmistakable. Remove the stick right before serving.'
  },
  {
    id: 'ofada-stew',
    title: 'Designer Ofada Stew (Ayamase Sauce)',
    category: 'Stew',
    prepTime: '30 mins',
    cookTime: '40 mins',
    servings: '8 servings',
    difficulty: 'Intermediate',
    summary: 'The iconic Yoruba party stew. Coarsely crushed green bell peppers and scotch bonnets, slow-bleached Drop Palm Oil, fermented locust beans (iru), and assorted bite-sized meats.',
    image: OFADA_STEW_IMAGE,
    oilQuantity: '1 cup Drop Palm Oil',
    ingredients: [
      '1 cup Drop Palm Oil',
      '8 large green bell peppers (tatashe green), roughly pulsed',
      '5 green scotch bonnet peppers (ata rodo)',
      '2 large brown onions (1 diced, 1 blended)',
      '3 tablespoons fermented locust beans (iru woro), washed thoroughly',
      '500g boiled beef and cow tripe (shaki), diced small',
      '4 hard-boiled eggs',
      '3 tablespoons ground crayfish',
      'Seasoning cubes and salt to taste'
    ],
    instructions: [
      'Coarsely blend the green peppers and 1 onion. Boil the pepper mix in a pot until almost all excess water evaporates into a thick paste.',
      'In a dry heavy-bottomed pot, pour Drop Palm Oil. Cover with a tight lid and heat on low for 10-12 minutes until it becomes translucent and smoky. Turn off flame and let cool completely with lid closed.',
      'Open the cooled pot, turn heat back to medium, and toss in the diced onions and fermented locust beans. Fry for 2 minutes until intensely aromatic.',
      'Pour in the reduced green pepper base. Fry on medium heat for 15-20 minutes, stirring periodically until oil separates from the stew base.',
      'Add the diced boiled meats, crayfish, seasoning cubes, and salt. Cook for another 10 minutes so flavors meld into the meats.',
      'Gently place hard-boiled eggs into the simmering sauce. Serve over steaming aromatic unpolished Ofada rice wrapped in uma leaves.'
    ],
    chefTip: 'Safety rule: Always let your covered pot cool down for 15 minutes after bleaching before opening the lid to prevent any smoke or hot oil splatter.'
  },
  {
    id: 'ewa-riro',
    title: 'Slow-Simmered Ewa Riro (Rich Stewed Beans)',
    category: 'Rice & Beans',
    prepTime: '15 mins',
    cookTime: '60 mins',
    servings: '4 servings',
    difficulty: 'Easy',
    summary: 'Sweet Nigerian honey beans slow-cooked until meltingly tender, combined with a luscious sauce of Drop Palm Oil, caramelized red onions, crayfish, and dried fish.',
    image: EGUSI_SOUP_IMAGE,
    oilQuantity: '½ cup Drop Palm Oil',
    ingredients: [
      '3 cups Nigerian brown honey beans (Ewa Oloyin), picked clean',
      '½ cup Drop Palm Oil',
      '2 large red onions, thinly sliced',
      '3 scotch bonnet peppers, crushed',
      '3 tablespoons ground crayfish',
      '1 piece smoked deboned mackerel or dried bonga fish',
      '2 ripe plantains, diced and fried till golden (dodo)',
      'Salt and 1 seasoning cube'
    ],
    instructions: [
      'Rinse beans thoroughly and boil in a heavy pot with 5 cups of water and half of the sliced onions until soft (about 45 minutes). Add hot water as needed.',
      'In a separate skillet, warm Drop Palm Oil over medium heat. Add the remaining sliced onions and fry gently until caramelized and sweet (about 6 minutes).',
      'Stir in the crushed scotch bonnets, ground crayfish, and flaked smoked mackerel. Sauté for 3 minutes until fragrant.',
      'Pour the fragrant palm oil sauce directly into the soft beans. Mash a quarter of the beans with a wooden spoon to create a thick, comforting gravy.',
      'Simmer for 10 minutes on low heat so the beans drink up the palm oil essence. Season with salt and seasoning cube.',
      'Serve alongside crispy sweet fried plantains (dodo) and cold garri or freshly baked bread.'
    ],
    chefTip: 'Sautéing the onions slowly in Drop Palm Oil creates natural sweet caramelized notes that elevate simple beans to restaurant status.'
  },
  {
    id: 'native-rice',
    title: 'Native Smoked Fish Jollof Rice (Iwuk Edesi)',
    category: 'Rice & Beans',
    prepTime: '20 mins',
    cookTime: '40 mins',
    servings: '6 servings',
    difficulty: 'Intermediate',
    summary: 'Village-style smoky concoction rice cooked in pure Drop Palm Oil with flaked smoked fish, dried shrimp, scent leaves, and whole scotch bonnets.',
    image: JOLLOF_RICE_IMAGE,
    oilQuantity: '⅔ cup Drop Palm Oil',
    ingredients: [
      '3 cups parboiled long grain or local rice, washed and drained',
      '⅔ cup Drop Palm Oil',
      '2 whole smoked catfish, cleaned and shredded',
      '½ cup whole dried crayfish / prawns',
      '4 fresh scotch bonnet peppers, roughly pounded',
      '2 medium red onions, sliced',
      '2 tablespoons locust beans (iru)',
      '1 cup shredded fresh scent leaves (nchanwu/efirin)',
      '4 cups rich meat or smoked fish stock',
      'Salt and seasoning cubes'
    ],
    instructions: [
      'Warm Drop Palm Oil in a large pot. Add sliced onions and locust beans, sautéing until fragrant and glistening.',
      'Add pounded peppers, shredded smoked fish, and dried prawns. Fry for 4 minutes so the seafood flavors infuse the oil.',
      'Pour in the stock, seasoning cubes, and salt. Bring to a rolling boil.',
      'Add the washed rice, ensuring the liquid sits about 1 inch above the rice level. Stir once, cover tightly with foil and pot lid.',
      'Cook on low-medium heat for 25 minutes until liquid is fully absorbed and rice grains are tender and separated.',
      'Toss in the freshly shredded scent leaves, gently fold with a fork, cover for 3 minutes off the heat, and serve hot.'
    ],
    chefTip: 'The scent leaves added at the very end release an essential herbal perfume that harmonizes perfectly with the warm palm oil.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Chef Femi Adeniyi',
    role: 'Head Chef & Co-owner',
    location: 'Buka Royale, Lekki Phase 1, Lagos',
    content: 'In commercial kitchens, consistency is everything. Before Drop Palm Oil, we had to reject market batches weekly due to terrible odor or unnatural chemical dyes. Drop has given us consistent golden color, low acidity, and that authentic motherland aroma in every pot of soup we serve.',
    rating: 5,
    verifiedPurchase: true,
    favoriteDish: 'Delta Banga Soup'
  },
  {
    id: 'test-2',
    name: 'Mrs. Chioma Okonkwo',
    role: 'Home Cook & Mother of Three',
    location: 'Maitama, Abuja',
    content: 'My mother visited from Enugu and immediately inspected my palm oil. She smelled it, touched a drop to her tongue, and smiled. That was the ultimate test. Drop Palm Oil is completely pure—no bitter aftertaste, no heavy sand residue, just rich taste of home.',
    rating: 5,
    verifiedPurchase: true,
    favoriteDish: 'Egusi & Pounded Yam'
  },
  {
    id: 'test-3',
    name: 'Tunde & Sarah Balogun',
    role: 'Event Caterer',
    location: 'Ikeja GRA, Lagos',
    content: 'We order the 25L drums for 500-guest wedding receptions. The smoke point is noticeably higher than open-market oil, which means our Ofada stew and party Native Jollof never taste burnt or acrid. The delivery arrives fast and impeccably packaged.',
    rating: 5,
    verifiedPurchase: true,
    favoriteDish: 'Designer Ofada Stew'
  },
  {
    id: 'test-4',
    name: 'Amaka Ezeh',
    role: 'Culinary Blogger',
    location: 'London / Lagos Diaspora',
    content: 'Whenever my family travels back, my priority luggage item is 5L of Drop Palm Oil. You simply cannot replicate Nigerian dishes with processed supermarket cooking oils. Drop brings our culinary heritage to life wherever we are in the world.',
    rating: 5,
    verifiedPurchase: true,
    favoriteDish: 'Ewa Riro'
  }
];

export const WHY_CHOOSE_US_POINTS = [
  {
    title: 'Naturally Rich',
    tagline: 'Deep vibrant color and unadulterated flavor.',
    description: 'Brimming with natural beta-carotenes and Vitamin E. No artificial coloring agents, no bleaching chemicals, and no watering down.',
    icon: 'Sparkles'
  },
  {
    title: 'Quality You Can Trust',
    tagline: 'Laboratory tested and batch-inspected.',
    description: 'Every batch undergoes rigorous Free Fatty Acid (FFA) and moisture testing to guarantee long-lasting freshness and pristine clarity.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Made for Nigerian Cooking',
    tagline: 'Engineered for high-heat traditional dishes.',
    description: 'High smoke point of 232°C. Perfect for slow simmering Egusi, bleaching for Ofada stew, frying dodo, and finishing fragrant Banga.',
    icon: 'Flame'
  },
  {
    title: 'From Farm to Kitchen',
    tagline: 'Ethically sourced with 100% traceability.',
    description: 'We partner directly with smallholder farming communities in Edo State, guaranteeing fair trade compensation and sustainable agroforestry.',
    icon: 'Trees'
  }
];

export const VISION_PILLARS = [
  {
    title: 'Quality',
    subtitle: 'Uncompromising Pure Standards',
    description: 'We hold our extraction and filtration to international food-grade standards, ensuring low acidity (<2.0% FFA) and complete absence of industrial dye contaminants like Sudan IV.',
    metric: '< 1.8% FFA'
  },
  {
    title: 'Trust',
    subtitle: 'Transparent Chain of Custody',
    description: 'Every bottle features batch identification traceable back to the regional harvesting cluster. Consumers and restaurant chefs never have to guess what is in their oil.',
    metric: '100% Traceable'
  },
  {
    title: 'Community',
    subtitle: 'Empowering Smallholders',
    description: 'We work closely with 450+ multi-generational farming families in Edo and Ondo, paying guaranteed above-market prices and providing modern processing machinery.',
    metric: '450+ Farmers'
  },
  {
    title: 'Growth',
    subtitle: 'Modern African Food Brand',
    description: 'Building world-class agro-processing infrastructure in Nigeria that elevates African agricultural exports and sets new global benchmarks for sustainable red palm oil.',
    metric: 'Zero Solvent Tech'
  }
];

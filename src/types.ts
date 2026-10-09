export interface Product {
  id: string;
  name: string;
  size: string;
  volumeLiters: number;
  priceNgn: number;
  tagline: string;
  description: string;
  inStock: boolean;
  image: string;
  lifestyleImage?: string;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  idealFor: string;
  specifications: {
    freeFattyAcids: string;
    moistureContent: string;
    smokePoint: string;
    additives: string;
    origin: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: 'Soup' | 'Stew' | 'Rice & Beans' | 'Traditional';
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: 'Easy' | 'Intermediate' | 'Master Cook';
  summary: string;
  image: string;
  oilQuantity: string;
  ingredients: string[];
  instructions: string[];
  chefTip: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  verifiedPurchase: boolean;
  favoriteDish: string;
}

export interface OrderDetails {
  orderId: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: 'card' | 'bank_transfer' | 'whatsapp';
  date: string;
}

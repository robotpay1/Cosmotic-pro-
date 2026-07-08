export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: "Focus" | "Calm" | "Lucidity" | "Energy";
  imageUrl: string;
  energyIndex: string;
  components: string[];
  primaryColor: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface OrderStep {
  name: string;
  done: boolean;
  desc: string;
}

export interface Order {
  id: string;
  date: string;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  total: number;
  status: string;
  step: number;
  steps: OrderStep[];
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  productName: string;
  comment: string;
}

export interface Analytics {
  totalSales: number;
  ordersCount: number;
  averageBasket: number;
  visitorCount: number;
  conversionRate: string;
  activeUsers: number;
}

export interface LiveSale {
  city: string;
  item: string;
  amount: number;
  time: string;
}

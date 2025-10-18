export type Category = string; // Changed from union to string for admin management
export type Size = "S" | "M" | "L" | "XL";
export type Color = "Fırtına Mavisi" | "Yeşilova Yeşili" | "Ahşap Beji" | "Köpük Beyazı" | "Paslı Turuncu";
export type OrderStatus = "Yeni" | "Hazırlanıyor" | "Kargoya Verildi" | "Tamamlandı" | "İptal";

export interface Review {
  id: number;
  author: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  sizes: Size[];
  color: Color;
  stock: number;
  material: string;
  care: string;
  reviews: Review[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: Size;
}

export interface Address {
  street: string;
  city: string;
  zip: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed
  addresses: Address[];
  wishlist: number[]; // Array of product IDs
}

export interface Order {
  id: string;
  userId: number;
  customerName: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  trackingNumber?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: string;
  date: string;
  imageUrl: string;
  content: string; // Markdown or HTML content
}
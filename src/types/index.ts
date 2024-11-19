// src/types/index.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin'; 
}

export interface OrderType {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}
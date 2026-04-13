export interface Product {
  id: number;
  name: string;
  price: number;
  category: 'Books' | 'Pens' | 'Notebooks' | 'Stationery Kits';
  image: string;
  description: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  username: string;
  displayName: string;
}

export interface CheckoutFormData {
  name: string;
  address: string;
  phone: string;
  paymentMethod: 'cod' | 'upi' | 'card';
}

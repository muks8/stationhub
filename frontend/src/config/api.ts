const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  // Auth
  login: async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error('Invalid credentials');
    return res.json();
  },

  // Products
  getProducts: async (category?: string) => {
    const token = localStorage.getItem('token');
    const url   = category && category !== 'All'
      ? `${API_URL}/api/products?category=${category}`
      : `${API_URL}/api/products`;
    const res   = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  getProduct: async (id: number) => {
    const token = localStorage.getItem('token');
    const res   = await fetch(`${API_URL}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Product not found');
    return res.json();
  },

  // Orders
  createOrder: async (items: any[], totalAmount: number) => {
    const token = localStorage.getItem('token');
    const res   = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items, total_amount: totalAmount }),
    });
    if (!res.ok) throw new Error('Order failed');
    return res.json();
  },
};

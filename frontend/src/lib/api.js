import { sampleProducts } from '../data/products';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const headers = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...headers(), ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed');
  return data;
};

export const api = {
  async getProducts(params = {}) {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, value]) => value !== undefined && value !== '' && value !== 'All')
    ).toString();
    try {
      return await request(`/products${query ? `?${query}` : ''}`);
    } catch {
      return sampleProducts;
    }
  },
  async getProduct(id) {
    try {
      return await request(`/products/${id}`);
    } catch {
      return sampleProducts.find((product) => product._id === id) || sampleProducts[0];
    }
  },
  createOrder(payload) {
    return request('/orders', { method: 'POST', body: JSON.stringify(payload) });
  },
  login(credentials) {
    return request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
  },
  setupAdmin() {
    return request('/auth/setup', { method: 'POST' });
  },
  analytics() {
    return request('/admin/analytics');
  },
  adminProducts() {
    return request('/admin/products');
  },
  saveProduct(product) {
    const method = product._id ? 'PUT' : 'POST';
    const path = product._id ? `/admin/products/${product._id}` : '/admin/products';
    return request(path, { method, body: JSON.stringify(product) });
  },
  deleteProduct(id) {
    return request(`/admin/products/${id}`, { method: 'DELETE' });
  },
  orders() {
    return request('/admin/orders');
  },
  updateOrderStatus(id, status) {
    return request(`/admin/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
  },
  customers() {
    return request('/admin/customers');
  }
};

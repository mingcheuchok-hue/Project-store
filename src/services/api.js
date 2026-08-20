// src/services/api.js
const API_BASE_URL = 'https://fakestoreapi.com';

export const api = {
  products: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/products`);
      return response.json();
    },
    getById: async (id) => {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      return response.json();
    },
    getByCategory: async (category) => {
      const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
      return response.json();
    },
    getCategories: async () => {
      const response = await fetch(`${API_BASE_URL}/products/categories`);
      return response.json();
    },
    getLimited: async (limit) => {
      const response = await fetch(`${API_BASE_URL}/products?limit=${limit}`);
      return response.json();
    }
  }
};

export default api;
// src/apiConfig.js
const API_BASE_URL = "http://localhost:2500/api";

export const endpoints = {
  fetchAllTires: `${API_BASE_URL}/customer-tires`,
  addTire: `${API_BASE_URL}/customer-tires`,
  updateTire: (id) => `${API_BASE_URL}/customer-tires/${id}`,
  deleteTire: (id) => `${API_BASE_URL}/customer-tires/${id}`,
  searchTires: (query) => `${API_BASE_URL}/customer-tires/search?q=${query}`,
};

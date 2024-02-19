const BASE_URL = "http://localhost:2500/api";

export const API_ENDPOINTS = {
  FETCH_CUSTOMER_TIRES: `${BASE_URL}/customer-tires`,
  SEARCH_CUSTOMER_TIRES: `${BASE_URL}/customer-tires/search`,
  ADD_CUSTOMER_TIRE: `${BASE_URL}/customer-tires`,
  UPDATE_CUSTOMER_TIRE: (id) => `${BASE_URL}/customer-tires/${id}`,
  DELETE_CUSTOMER_TIRE: (id) => `${BASE_URL}/customer-tires/${id}`,
};

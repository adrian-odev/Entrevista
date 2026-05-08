import { apiFetch } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export async function getProducts() {
  return apiFetch(API_ENDPOINTS.products);
}

export async function getProductById(productId) {
  return apiFetch(API_ENDPOINTS.productById(productId));
}

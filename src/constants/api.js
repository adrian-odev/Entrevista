/**
 * Configuración de API
 */

export const API_BASE_URL = 'https://fakestoreapi.com';

export const API_ENDPOINTS = {
  login: '/auth/login',
  products: '/products',
  productById: (productId) => `/products/${productId}`,
};

/**
 * Timeouts y reintentos
 */
export const API_TIMEOUTS = {
  default: 15000, // 15 segundos
  short: 5000,    // 5 segundos
  long: 30000,    // 30 segundos
};

export const API_RETRY = {
  maxAttempts: 3,
  delayMs: 1000,
};

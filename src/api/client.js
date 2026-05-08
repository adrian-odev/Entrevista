import { API_BASE_URL } from './endpoints';

let authToken = '';

export function setAuthToken(token) {
  authToken = token;
}

export function clearAuthToken() {
  authToken = '';
}

export async function apiFetch(endpoint, options = {}) {
  const authorizationHeader = authToken
    ? {
        Authorization: `Bearer ${authToken}`,
      }
    : {};

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...authorizationHeader,
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

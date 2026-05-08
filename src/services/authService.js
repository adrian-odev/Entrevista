import { apiFetch } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

export async function login(username, password) {
  return apiFetch(API_ENDPOINTS.login, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
  });
}

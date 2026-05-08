import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { clearAuthToken, setAuthToken } from '../api/client';

const AUTH_TOKEN_KEY = 'auth_token';

export const useAuthStore = create((set, get) => ({
  token: '',
  isBootstrapping: true,
  isAuthenticated: false,

  restoreSession: async () => {
    if (!get().isBootstrapping) {
      return;
    }

    try {
      const storedToken = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);

      if (storedToken) {
        setAuthToken(storedToken);
        set({
          token: storedToken,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      clearAuthToken();
      set({
        token: '',
        isAuthenticated: false,
      });
    } finally {
      set({ isBootstrapping: false });
    }
  },

  login: async (nextToken) => {
    setAuthToken(nextToken);
    set({
      token: nextToken,
      isAuthenticated: true,
    });
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, nextToken);
  },

  logout: async () => {
    clearAuthToken();
    set({
      token: '',
      isAuthenticated: false,
    });
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  },
}));

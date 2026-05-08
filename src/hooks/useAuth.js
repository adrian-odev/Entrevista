import { useAuthStore } from '../store/useAuthStore';

export function useAuth() {
  const store = useAuthStore();
  
  return {
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    isBootstrapping: store.isBootstrapping,
    login: store.login,
    logout: store.logout,
    restoreSession: store.restoreSession,
  };
}

import { create } from 'zustand';
import { useCallback } from 'react';

const useNotificationStore = create((set) => ({
  notifications: [],
  
  addNotification: (message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const notification = { id, message, type };
    
    set((state) => ({
      notifications: [...state.notifications, notification],
    }));
    
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id),
        }));
      }, duration);
    }
    
    return id;
  },
  
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id),
    }));
  },
  
  clearNotifications: () => {
    set({ notifications: [] });
  },
}));

export function useNotification() {
  const store = useNotificationStore();
  
  const success = useCallback((message, duration) => {
    return store.addNotification(message, 'success', duration);
  }, [store]);
  
  const error = useCallback((message, duration) => {
    return store.addNotification(message, 'error', duration);
  }, [store]);
  
  const info = useCallback((message, duration) => {
    return store.addNotification(message, 'info', duration);
  }, [store]);
  
  return {
    notifications: store.notifications,
    success,
    error,
    info,
    remove: store.removeNotification,
    clear: store.clearNotifications,
  };
}

import { useState, useCallback } from 'react';
import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  
  addItem: (product, quantity) => {
    set((state) => {
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      
      return {
        items: [...state.items, { ...product, quantity }],
      };
    });
  },
  
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== productId),
    }));
  },
  
  updateQuantity: (productId, quantity) => {
    set((state) => ({
      items: state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0),
    }));
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getTotalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
}));

export function useCart() {
  return useCartStore();
}

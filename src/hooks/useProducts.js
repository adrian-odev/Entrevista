import { useState, useCallback } from 'react';
import { getProducts } from '../services/productService';
import { MESSAGES } from '../constants/messages';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(MESSAGES.PRODUCTS.loadError);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  return {
    products,
    loading,
    refreshing,
    error,
    loadProducts,
  };
}

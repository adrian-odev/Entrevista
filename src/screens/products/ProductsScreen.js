import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  RefreshControl,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import ProductCard from '../../components/ProductCard';
import { ProductCardSkeleton } from '../../components/SkeletonLoader';
import { getProducts } from '../../services/productService';
import { styles } from './ProductsScreen.styles';
import { ROUTES } from '../../types/routes';
import { MESSAGES } from '../../constants/messages';
import { useDebounce } from '../../hooks/useDebounce';
import { useNotification } from '../../hooks/useNotification';
import { FILTER_OPTIONS } from '../../constants/filters';

export default function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const heroAnimation = useRef(new Animated.Value(0)).current;
  const listAnimation = useRef(new Animated.Value(0)).current;
  const filtersHeightAnim = useRef(new Animated.Value(0)).current;
  const notification = useNotification();
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const loadProducts = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else if (!hasLoadedOnce) {
        setLoading(true);
      }

      setError('');
      const data = await getProducts();
      setProducts(data);
      setHasLoadedOnce(true);
    } catch (err) {
      setError(MESSAGES.PRODUCTS.loadError);
      if (isRefresh) {
        notification.error(MESSAGES.PRODUCTS.loadError);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [hasLoadedOnce, notification]);

  useFocusEffect(
    useCallback(() => {
      if (!hasLoadedOnce) {
        loadProducts();
      }
    }, [hasLoadedOnce, loadProducts])
  );

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (!products.length) {
      return;
    }

    heroAnimation.setValue(0);
    listAnimation.setValue(0);

    Animated.parallel([
      Animated.spring(heroAnimation, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 45,
      }),
      Animated.timing(listAnimation, {
        toValue: 1,
        duration: 320,
        useNativeDriver: true,
      }),
    ]).start();
  }, [heroAnimation, listAnimation, products.length]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedRating > 0) {
      filtered = filtered.filter(p => (p.rating?.rate || 0) >= selectedRating);
    }

    const normalizedQuery = debouncedSearchQuery.trim().toLowerCase();
    if (normalizedQuery) {
      filtered = filtered.filter(product => {
        return [product.title, product.category]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);
      });
    }

    return filtered;
  }, [products, selectedCategory, selectedRating, debouncedSearchQuery]);

  const displayedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    if (sortMode === 'price-asc') {
      sorted.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortMode === 'price-desc') {
      sorted.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortMode === 'rating') {
      sorted.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }
    
    return sorted;
  }, [filteredProducts, sortMode]);

  const clearAllFilters = useCallback(() => {
    setSortMode('featured');
    setSelectedCategory(null);
    setSelectedRating(0);
  }, []);

  const activeFiltersCount = (selectedCategory ? 1 : 0) + (sortMode !== 'featured' ? 1 : 0);

  if (loading) {
    return (
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item) => String(item)}
        renderItem={() => <ProductCardSkeleton />}
        contentContainerStyle={styles.container}
        scrollEnabled={false}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.heroSection,
          {
            opacity: heroAnimation,
            transform: [
              {
                translateY: heroAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [14, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>Catálogo</Text>
        </View>

        <Text style={styles.heroTitle}>Explorá el catálogo disponible</Text>
        <Text style={styles.heroSubtitle}>
          Consultá productos, precios y detalles actualizados en una sola vista.
        </Text>

        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={18} color="#64748b" style={styles.searchIcon} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar por nombre o categoría"
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
          />
          {searchQuery ? (
            <Pressable onPress={() => setSearchQuery('')} style={styles.clearSearchButton}>
              <Ionicons name="close-outline" size={18} color="#64748b" />
            </Pressable>
          ) : null}
        </View>

        <Pressable
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons name="options-outline" size={16} color="#2563eb" />
          <Text style={styles.filterButtonText}>Filtros</Text>
          {activeFiltersCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
            </View>
          )}
          <Ionicons 
            name={showFilters ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color="#2563eb" 
            style={styles.filterChevron}
          />
        </Pressable>

        {showFilters && (
          <View style={styles.filtersPanelCompact}>
            <View style={styles.filterCompactRow}>
              <View style={styles.filterCompactSection}>
                <Text style={styles.filterCompactLabel}>Ordenar</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={16}
                  style={styles.filterCompactScroll}
                >
                  {[
                    { id: 'featured', label: 'Relevancia' },
                    { id: 'price-asc', label: 'Menor $' },
                    { id: 'price-desc', label: 'Mayor $' },
                    { id: 'rating', label: 'Rating' },
                  ].map((option) => (
                    <Pressable
                      key={option.id}
                      style={[
                        styles.filterCompactChip,
                        sortMode === option.id && styles.filterCompactChipActive,
                      ]}
                      onPress={() => setSortMode(option.id)}
                    >
                      <Text
                        style={[
                          styles.filterCompactChipText,
                          sortMode === option.id && styles.filterCompactChipTextActive,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>

            <View style={styles.filterCompactRow}>
              <View style={styles.filterCompactSection}>
                <View style={styles.filterCompactLabelRow}>
                  <Text style={styles.filterCompactLabel}>Categoría</Text>
                </View>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  scrollEventThrottle={16}
                  style={styles.filterCompactScroll}
                >
                  {FILTER_OPTIONS.categories.map((category) => (
                    <Pressable
                      key={category.id}
                      onPress={() => setSelectedCategory(category.value)}
                      style={[
                        styles.filterCompactCategoryChip,
                        selectedCategory === category.value && styles.filterCompactCategoryChipActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterCompactCategoryChipText,
                          selectedCategory === category.value && styles.filterCompactCategoryChipTextActive,
                        ]}
                      >
                        {category.label}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>

            {activeFiltersCount > 0 && (
              <Pressable
                style={styles.filterCompactResetButton}
                onPress={clearAllFilters}
              >
                <Ionicons name="close-circle" size={14} color="#ffffff" />
                <Text style={styles.filterCompactResetButtonText}>Resetear filtros</Text>
              </Pressable>
            )}
          </View>
        )}
      </Animated.View>

      {error ? (
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>No pudimos cargar el catálogo</Text>
          <Text style={styles.error}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={() => loadProducts()}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </Pressable>
        </View>
      ) : null}

      <FlatList
        data={displayedProducts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item, index }) => {
          const itemOpacity = listAnimation.interpolate({
            inputRange: [0, 0.4, 1],
            outputRange: [0, 0, 1],
          });

          const itemTranslateY = listAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [12 + index * 4, 0],
          });

          return (
            <Animated.View
              style={{
                opacity: itemOpacity,
                transform: [{ translateY: itemTranslateY }],
              }}
            >
              <ProductCard
                product={item}
                onPress={() => navigation.navigate(ROUTES.productDetail, { productId: item.id })}
              />
            </Animated.View>
          );
        }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>
            {debouncedSearchQuery ? 'Resultados de búsqueda' : 'Productos destacados'} ({displayedProducts.length})
          </Text>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color="#cbd5e1" style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>No encontramos productos</Text>
            <Text style={styles.emptyText}>
              {debouncedSearchQuery 
                ? 'Probá con otro nombre o categoría.' 
                : 'Intenta ajustar tus filtros.'}
            </Text>
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadProducts(true)}
            tintColor="#2563eb"
          />
        }
      />
    </View>
  );
}

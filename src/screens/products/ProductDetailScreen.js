import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { getProductById } from '../../services/productService';
import { ProductDetailSkeleton } from '../../components/SkeletonLoader';
import { styles } from './ProductDetailScreen.styles';
import { formatPrice } from '../../utils/formatters';
import { validateQuantity } from '../../helpers/validation';
import { MESSAGES } from '../../constants/messages';
import { useCart } from '../../hooks/useCart';
import { useNotification } from '../../hooks/useNotification';

export default function ProductDetailScreen({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState('1');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const heroAnimation = useRef(new Animated.Value(0)).current;
  const cart = useCart();
  const notification = useNotification();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        setError(MESSAGES.PRODUCTS.detailError);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  useEffect(() => {
    if (!product) {
      return;
    }

    heroAnimation.setValue(0);

    Animated.spring(heroAnimation, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 45,
    }).start();
  }, [heroAnimation, product]);

  const handleQuantityChange = (value) => {
    const validation = validateQuantity(value);
    if (validation.valid) {
      setQuantity(String(validation.value));
    }
  };

  const handleAddToCart = () => {
    const validation = validateQuantity(quantity);
    if (!validation.valid) {
      notification.error(validation.error);
      return;
    }

    cart.addItem(product, validation.value);
    notification.success('Producto agregado correctamente al carrito');
  };

  if (loading) {
    return (
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container}>
          <ProductDetailSkeleton />
        </ScrollView>
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error || MESSAGES.PRODUCTS.notFound}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.View
          style={[
            styles.card,
            {
              opacity: heroAnimation,
              transform: [
                {
                  translateY: heroAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.mediaSection}>
            <View style={styles.imagePanel}>
              <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
            </View>


          </View>

          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.purchaseCard}>
            <Text style={styles.label}>Cantidad</Text>
            <TextInput
              value={quantity}
              onChangeText={handleQuantityChange}
              keyboardType="number-pad"
              style={styles.quantityInput}
            />

            <Pressable style={styles.button} onPress={handleAddToCart}>
              <Text style={styles.buttonText}>Agregar al carrito</Text>
            </Pressable>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

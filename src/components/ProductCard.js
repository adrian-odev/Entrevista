import React, { useRef } from 'react';
import { Animated, Image, Pressable, Text, View } from 'react-native';
import { styles } from './ProductCard.styles';
import { formatPrice } from '../utils/formatters';

export default function ProductCard({ product, onPress }) {
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnimation, {
      toValue: 0.985,
      useNativeDriver: true,
      friction: 7,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnimation }] }}>
      <Pressable style={styles.card} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.content}>
          <Text style={styles.category} numberOfLines={1}>
            {product.category}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>

          <View style={styles.footerRow}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            <View style={styles.ctaPill}>
              <Text style={styles.ctaText}>Ver detalle</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

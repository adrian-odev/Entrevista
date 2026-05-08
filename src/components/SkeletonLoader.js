import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

/**
 * Skeleton Loader Component
 * Muestra un placeholder animado mientras se carga el contenido
 */
export function SkeletonLoader({ width = '100%', height = 20, borderRadius = 8, style }) {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnimation]);

  const opacity = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.8],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: COLORS.lightGray,
          opacity,
        },
        style,
      ]}
    />
  );
}

/**
 * Product Card Skeleton
 */
export function ProductCardSkeleton() {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
      }}
    >
      {/* Imagen */}
      <SkeletonLoader width="100%" height={120} borderRadius={8} style={{ marginBottom: SPACING.md }} />

      {/* Categoría */}
      <SkeletonLoader width="40%" height={12} borderRadius={4} style={{ marginBottom: SPACING.sm }} />

      {/* Título */}
      <SkeletonLoader width="100%" height={16} borderRadius={4} style={{ marginBottom: SPACING.sm }} />
      <SkeletonLoader width="85%" height={16} borderRadius={4} style={{ marginBottom: SPACING.md }} />

      {/* Precio y botón */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <SkeletonLoader width="30%" height={18} borderRadius={4} />
        <SkeletonLoader width="35%" height={32} borderRadius={8} />
      </View>
    </View>
  );
}

/**
 * Product Detail Skeleton
 */
export function ProductDetailSkeleton() {
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 28,
        padding: SPACING.xl,
      }}
    >
      {/* Imagen */}
      <SkeletonLoader
        width="100%"
        height={220}
        borderRadius={24}
        style={{ marginBottom: SPACING.xl }}
      />

      {/* Badge */}
      <SkeletonLoader width="15%" height={20} borderRadius={999} style={{ marginBottom: SPACING.md }} />

      {/* Categoría */}
      <SkeletonLoader width="25%" height={12} borderRadius={4} style={{ marginBottom: SPACING.md }} />

      {/* Título */}
      <SkeletonLoader width="100%" height={24} borderRadius={4} style={{ marginBottom: SPACING.sm }} />
      <SkeletonLoader width="80%" height={24} borderRadius={4} style={{ marginBottom: SPACING.xl }} />

      {/* Precio */}
      <SkeletonLoader width="25%" height={28} borderRadius={4} style={{ marginBottom: SPACING.md }} />

      {/* Descripción */}
      <SkeletonLoader width="100%" height={16} borderRadius={4} style={{ marginBottom: SPACING.sm }} />
      <SkeletonLoader width="100%" height={16} borderRadius={4} style={{ marginBottom: SPACING.sm }} />
      <SkeletonLoader width="85%" height={16} borderRadius={4} style={{ marginBottom: SPACING.xl }} />

      {/* Cantidad y botón */}
      <View style={{ backgroundColor: COLORS.background, borderRadius: 22, padding: SPACING.lg }}>
        <SkeletonLoader width="20%" height={14} borderRadius={4} style={{ marginBottom: SPACING.md }} />
        <SkeletonLoader width="100%" height={44} borderRadius={16} style={{ marginBottom: SPACING.lg }} />
        <SkeletonLoader width="100%" height={48} borderRadius={16} />
      </View>
    </View>
  );
}

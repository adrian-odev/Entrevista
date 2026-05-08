/**
 * Tema centralizado - Colores y estilos globales
 */

export const COLORS = {
  // Primario
  primary: '#2563eb',
  primaryLight: '#eff6ff',
  primaryDark: '#1d4ed8',

  // Secundario
  secondary: '#7c3aed',
  secondaryLight: '#f3e8ff',

  // Neutral
  dark: '#0f172a',
  darkGray: '#4b5563',
  lightGray: '#cbd5e1',
  background: '#f8fafc',
  white: '#ffffff',

  // Status
  success: '#16a34a',
  successLight: '#ecfdf5',
  successBorder: '#86efac',
  successDark: '#15803d',
  error: '#dc2626',
  errorLight: '#fee2e2',
  errorBorder: '#fca5a5',

  // Gradients
  gradientStart: '#0f172a',
  gradientEnd: '#1e293b',
};

export const BORDER_RADIUS = {
  small: 12,
  medium: 16,
  large: 22,
  extraLarge: 28,
  pill: 999,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 28,
  xxxl: 30,
};

export const FONT_WEIGHTS = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

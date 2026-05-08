import React, { createContext, useState, useCallback } from 'react';
import { useColorScheme } from 'react-native';

const LIGHT_THEME = {
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceVariant: '#f1f5f9',
  text: '#0f172a',
  textSecondary: '#64748b',
  textTertiary: '#94a3b8',
  primary: '#2563eb',
  primaryLight: '#eff6ff',
  secondary: '#7c3aed',
  error: '#dc2626',
  errorLight: '#fee2e2',
  success: '#16a34a',
  successLight: '#ecfdf5',
  border: '#e2e8f0',
};

const DARK_THEME = {
  background: '#0f172a',
  surface: '#1e293b',
  surfaceVariant: '#334155',
  text: '#f8fafc',
  textSecondary: '#cbd5e1',
  textTertiary: '#94a3b8',
  primary: '#3b82f6',
  primaryLight: '#1e3a8a',
  secondary: '#a78bfa',
  error: '#ef4444',
  errorLight: '#7f1d1d',
  success: '#4ade80',
  successLight: '#1b4332',
  border: '#475569',
};

export const ThemeContext = createContext({
  isDark: false,
  theme: LIGHT_THEME,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  
  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);
  
  const theme = isDark ? DARK_THEME : LIGHT_THEME;
  
  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

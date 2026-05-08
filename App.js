import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { Toast } from './src/components/Toast';

function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <>
      <NavigationContainer>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

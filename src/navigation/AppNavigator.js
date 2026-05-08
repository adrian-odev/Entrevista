import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Modal, Pressable, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, ProductDetailScreen, ProductsScreen } from '../screens';
import { useAuthStore } from '../store/useAuthStore';
import { ROUTES } from '../types/routes';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated, isBootstrapping, login, logout, restoreSession } = useAuthStore();
  const [isUserMenuVisible, setIsUserMenuVisible] = React.useState(false);

  React.useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const toggleUserMenu = () => {
    setIsUserMenuVisible((current) => !current);
  };

  const handleLogout = async () => {
    setIsUserMenuVisible(false);
    await logout();
  };

  const handleViewAccount = () => {
    setIsUserMenuVisible(false);
  };

  if (isBootstrapping) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <>
      <Modal transparent visible={isUserMenuVisible} animationType="fade" onRequestClose={toggleUserMenu}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.12)' }} onPress={() => setIsUserMenuVisible(false)}>
          <View
            style={{
              marginTop: 92,
              marginRight: 18,
              marginLeft: 'auto',
              width: 210,
              backgroundColor: '#ffffff',
              borderRadius: 20,
              padding: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.12,
              shadowRadius: 20,
              elevation: 8,
            }}
          >
            <Pressable
              onPress={handleViewAccount}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 14,
                backgroundColor: pressed ? '#f8fafc' : '#ffffff',
                transform: [{ scale: pressed ? 0.985 : 1 }],
              })}
            >
              <Ionicons name="person-outline" size={18} color="#2563eb" />
              <Text style={{ color: '#0f172a', fontWeight: '600' }}>Mi sesión activa</Text>
            </Pressable>

            <View style={{ height: 1, backgroundColor: '#e2e8f0', marginVertical: 6, marginHorizontal: 6 }} />

            <Pressable
              onPress={handleLogout}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 12,
                paddingVertical: 12,
                borderRadius: 14,
                backgroundColor: pressed ? '#fef2f2' : '#fff7f7',
                transform: [{ scale: pressed ? 0.985 : 1 }],
              })}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fee2e2',
                  }}
                >
                  <Ionicons name="log-out-outline" size={16} color="#b91c1c" />
                </View>
                <Text style={{ color: '#991b1b', fontWeight: '700' }}>Cerrar sesión</Text>
              </View>
              <Ionicons name="chevron-forward-outline" size={16} color="#b91c1c" />
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          contentStyle: { backgroundColor: '#f8fafc' },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#f8fafc',
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '700',
            color: '#0f172a',
          },
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name={ROUTES.login} options={{ headerShown: false }}>
            {(props) => (
              <LoginScreen
                {...props}
                onLoginSuccess={login}
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name={ROUTES.products}
              component={ProductsScreen}
              options={{
                title: 'Tienda',
                headerLeft: () => <Ionicons name="storefront-outline" size={22} color="#2563eb" />,
                headerRight: () => (
                  <Pressable onPress={toggleUserMenu} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
                    <Ionicons name="person-circle-outline" size={30} color="#0f172a" />
                  </Pressable>
                ),
              }}
            />
            <Stack.Screen
              name={ROUTES.productDetail}
              component={ProductDetailScreen}
              options={{
                title: 'Detalle del producto',
                headerRight: () => (
                  <Pressable onPress={toggleUserMenu} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
                    <Ionicons name="person-circle-outline" size={30} color="#0f172a" />
                  </Pressable>
                ),
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}

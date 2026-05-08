import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ActivityIndicator,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { login } from '../../services/authService';
import { styles } from './LoginScreen.styles';
import { validateLoginCredentials } from '../../helpers/validation';
import { handleError } from '../../helpers/errorHandler';
import { MESSAGES } from '../../constants/messages';
import { COLORS } from '../../constants/theme';
import { useNotification } from '../../hooks/useNotification';

export default function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cardAnimation] = useState(new Animated.Value(0));
  const [buttonScale] = useState(new Animated.Value(1));
  const [errorAnimation] = useState(new Animated.Value(0));
  const [shakeAnimation] = useState(new Animated.Value(0));
  const notification = useNotification();

  React.useEffect(() => {
    Animated.spring(cardAnimation, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 45,
    }).start();
  }, [cardAnimation]);

  const showError = (message) => {
    setErrorMessage(message);
    errorAnimation.setValue(0);
    shakeAnimation.setValue(0);

    Animated.parallel([
      Animated.sequence([
        Animated.timing(errorAnimation, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(errorAnimation, {
          toValue: 1,
          useNativeDriver: true,
          friction: 6,
        }),
      ]),
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 1,
          duration: 70,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -1,
          duration: 70,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 1,
          duration: 70,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 70,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const clearError = () => {
    if (!errorMessage) {
      return;
    }

    setErrorMessage('');
    errorAnimation.setValue(0);
  };

  const animateButtonIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.97,
      useNativeDriver: true,
      friction: 6,
    }).start();
  };

  const animateButtonOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
  };

  const handleLogin = async () => {
    clearError();

    const validation = validateLoginCredentials(username, password);
    if (!validation.isValid) {
      showError(validation.errors[0]);
      return;
    }

    try {
      setLoading(true);
      const response = await login(username.trim(), password);

      if (response?.token) {
        await onLoginSuccess(response.token);
        return;
      }

      showError(MESSAGES.AUTH.loginError);
    } catch (error) {
      const errorInfo = handleError(error, 'LoginScreen');
      showError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient colors={["#eef2ff", "#dbeafe", "#ede9fe"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.backgroundGlowTop} />
          <View style={styles.backgroundGlowBottom} />
          <Animated.View
            style={[
              styles.card,
              {
                opacity: cardAnimation,
                transform: [
                  {
                    translateX: shakeAnimation.interpolate({
                      inputRange: [-1, 0, 1],
                      outputRange: [-5, 0, 5],
                    }),
                  },
                  {
                    translateY: cardAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                  {
                    scale: cardAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.96, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Store Demo</Text>
            </View>

            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>Iniciá sesión para explorar productos y ver su detalle</Text>

            {errorMessage ? (
              <Animated.View
                style={[
                  styles.notice,
                  {
                    opacity: errorAnimation,
                    transform: [
                      {
                        translateY: errorAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-6, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.noticeAccent} />
                <Text style={styles.noticeText}>{errorMessage}</Text>
              </Animated.View>
            ) : null}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Usuario</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="#64748b" style={styles.inputIcon} />
                <TextInput
                  value={username}
                  onChangeText={(value) => {
                    setUsername(value);
                    clearError();
                  }}
                  placeholder="Ingresá tu usuario"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="none"
                  style={styles.inputField}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="#64748b" style={styles.inputIcon} />
                <TextInput
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    clearError();
                  }}
                  placeholder="Ingresá tu contraseña"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!isPasswordVisible}
                  style={styles.inputField}
                />
                <Pressable onPress={() => setIsPasswordVisible((current) => !current)} style={styles.visibilityButton}>
                  <Ionicons
                    name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#64748b"
                  />
                </Pressable>
              </View>
            </View>

            <Animated.View style={[styles.buttonWrapper, { transform: [{ scale: buttonScale }] }]}>
              <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                onPress={handleLogin}
                onPressIn={animateButtonIn}
                onPressOut={animateButtonOut}
                disabled={loading}
              >
                <LinearGradient
                  colors={["#2563eb", "#1d4ed8"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.buttonGradient}
                >
                  {loading ? (
                    <View style={styles.buttonLoadingContent}>
                      <ActivityIndicator color="#ffffff" />
                      <Text style={styles.buttonText}>Ingresando...</Text>
                    </View>
                  ) : (
                    <Text style={styles.buttonText}>Ingresar</Text>
                  )}
                </LinearGradient>
              </Pressable>
            </Animated.View>
          </Animated.View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

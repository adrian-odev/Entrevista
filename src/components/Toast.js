import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNotification } from '../hooks/useNotification';
import { COLORS } from '../constants/theme';

export function Toast() {
  const { notifications } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {notifications.map((notification) => (
        <ToastMessage key={notification.id} notification={notification} />
      ))}
    </View>
  );
}

function ToastMessage({ notification }) {
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity]);

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'error':
        return COLORS.errorLight;
      case 'success':
        return COLORS.successLight;
      case 'info':
        return '#dbeafe';
      default:
        return COLORS.successLight;
    }
  };

  const getTextColor = () => {
    switch (notification.type) {
      case 'error':
        return COLORS.error;
      case 'success':
        return COLORS.success;
      case 'info':
        return COLORS.primary;
      default:
        return COLORS.success;
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'error':
        return COLORS.errorBorder;
      case 'success':
        return COLORS.successBorder;
      case 'info':
        return '#7dd3fc';
      default:
        return COLORS.successBorder;
    }
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'error':
        return 'close-circle';
      case 'success':
        return 'checkmark-circle';
      case 'info':
        return 'information-circle';
      default:
        return 'checkmark-circle';
    }
  };

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          opacity,
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
        },
      ]}
    >
      <Ionicons name={getIcon()} size={20} color={getTextColor()} style={styles.icon} />
      <Text
        style={[
          styles.message,
          {
            color: getTextColor(),
          },
        ]}
      >
        {notification.message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    zIndex: 9999,
  },
  toast: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  message: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
    flex: 1,
  },
});

/**
 * Centralized error handler for consistent error messages and logging
 */

export const ErrorTypes = {
  VALIDATION: 'validation_error',
  NETWORK: 'network_error',
  AUTH: 'auth_error',
  SERVER: 'server_error',
  UNKNOWN: 'unknown_error',
};

export class AppError extends Error {
  constructor(message, type = ErrorTypes.UNKNOWN, originalError = null) {
    super(message);
    this.type = type;
    this.originalError = originalError;
  }
}

export function handleError(error, context = '') {
  console.error(`[${context}]`, error);

  if (error instanceof AppError) {
    return {
      type: error.type,
      message: error.message,
    };
  }

  if (error?.response?.status === 401) {
    return {
      type: ErrorTypes.AUTH,
      message: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
    };
  }

  if (error?.response?.status >= 500) {
    return {
      type: ErrorTypes.SERVER,
      message: 'Ocurrió un error en el servidor. Por favor, intenta más tarde.',
    };
  }

  if (error?.message?.includes('Network') || error?.message?.includes('network')) {
    return {
      type: ErrorTypes.NETWORK,
      message: 'Error de conexión. Verifica tu conexión a internet.',
    };
  }

  return {
    type: ErrorTypes.UNKNOWN,
    message: 'Ocurrió un error inesperado. Por favor, intenta nuevamente.',
  };
}

export function isNetworkError(error) {
  return error?.type === ErrorTypes.NETWORK;
}

export function isAuthError(error) {
  return error?.type === ErrorTypes.AUTH;
}

export function isValidationError(error) {
  return error?.type === ErrorTypes.VALIDATION;
}

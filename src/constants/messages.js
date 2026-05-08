/**
 * Mensajes centralizados - Para consistencia y fácil mantenimiento
 */

export const MESSAGES = {
  // Autenticación
  AUTH: {
    loginError: 'No pudimos iniciar sesión con esos datos',
    invalidCredentials: 'Credenciales inválidas',
    networkError: 'Sin conexión. Verifica tu internet',
    serverError: 'Error del servidor. Intenta más tarde',
    logoutSuccess: 'Sesión cerrada correctamente',
  },

  // Productos
  PRODUCTS: {
    loadError: 'No se pudieron cargar los productos',
    detailError: 'No se pudo cargar el detalle del producto',
    notFound: 'Producto no encontrado',
    empty: 'Sin productos disponibles',
  },

  // Carrito
  CART: {
    added: 'Producto añadido al carrito',
    addedTitle: '¡Agregado!',
    removed: 'Producto eliminado del carrito',
    updated: 'Carrito actualizado',
  },

  // Validaciones
  VALIDATION: {
    requiredField: 'Este campo es requerido',
    invalidEmail: 'Por favor ingresa un email válido',
    invalidPassword: 'La contraseña debe tener al menos 6 caracteres',
    invalidUsername: 'El usuario debe tener al menos 3 caracteres',
    quantityInvalid: 'Cantidad inválida',
  },

  // General
  GENERAL: {
    loading: 'Cargando...',
    retry: 'Reintentar',
    error: 'Error',
    success: 'Éxito',
    close: 'Cerrar',
  },
};

/**
 * Demo credentials para el README
 */
export const DEMO_CREDENTIALS = {
  username: 'mor_2314',
  password: '83r5^_',
};

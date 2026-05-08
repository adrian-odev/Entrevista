/**
 * Enhanced validation helpers
 */

export function hasCredentials(username, password) {
  return Boolean(username?.trim() && password?.trim());
}

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isStrongPassword(password) {
  // At least 6 characters, at least one letter and one number
  return password?.length >= 6 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
}

export function validateLoginCredentials(username, password) {
  const errors = [];

  if (!username?.trim()) {
    errors.push('El usuario es requerido.');
  }

  if (!password?.trim()) {
    errors.push('La contraseña es requerida.');
  } else if (password.length < 3) {
    errors.push('La contraseña debe tener al menos 3 caracteres.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function sanitizeQuantity(value) {
  if (!value) return '1';
  
  const num = parseInt(value, 10);
  if (isNaN(num)) return '1';
  if (num < 1) return '1';
  if (num > 999) return '999';
  
  return String(num);
}

export function validateQuantity(quantity) {
  const num = parseInt(quantity, 10);
  
  if (isNaN(num)) {
    return { valid: false, error: 'Cantidad inválida' };
  }
  
  if (num < 1) {
    return { valid: false, error: 'La cantidad debe ser al menos 1' };
  }
  
  if (num > 999) {
    return { valid: false, error: 'La cantidad máxima es 999' };
  }
  
  return { valid: true, value: num };
}

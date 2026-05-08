export function hasCredentials(username, password) {
  return Boolean(username.trim() && password.trim());
}

export function sanitizeQuantity(value) {
  const sanitized = value.replace(/[^0-9]/g, '');

  return sanitized || '1';
}

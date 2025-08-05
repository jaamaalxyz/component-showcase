import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function isValidPassword(password: string): boolean {
  // At least 8 characters, one uppercase, one lowercase, one number, and one special character
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
}

export function isValidPhoneNumber(phone: string): boolean {
  const re = /^\+?[1-9]\d{1,14}$/; // E.164 format
  return re.test(phone);
}

export function isValidHexColor(hex: string): boolean {
  const re = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  return re.test(hex);
}

export function isValidDate(date: string): boolean {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}

export function isValidTime(time: string): boolean {
  const re = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:mm format
  return re.test(time);
}

export function isValidDateTime(dateTime: string): boolean {
  const re = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?([+-]\d{2}:\d{2}|Z)?$/; // ISO 8601 format
  return re.test(dateTime);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

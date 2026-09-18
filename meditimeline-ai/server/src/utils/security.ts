import bcrypt from 'bcryptjs';
import { randomBytes } from 'node:crypto';
import { generateSecret, verify } from 'otplib';

export type Role = 'ADMIN' | 'DOCTOR' | 'STAFF';
export type UserStatus = 'ACTIVE' | 'LOCKED' | 'DISABLED';

export function sanitizeInput(value: string) {
  return value.trim().replace(/[<>]/g, '');
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateRecoveryCodes(count = 8) {
  return Array.from({ length: count }, () => randomBytes(4).toString('hex').slice(0, 8).toUpperCase());
}

export function generateTotpSecret() {
  return generateSecret();
}

export function validateTotp(secret: string, code: string) {
  return verify({ token: code, secret });
}

export function canAccessResource(userRole: string, allowedRoles: string[]) {
  return allowedRoles.includes(userRole);
}

export function isWithinLockoutWindow(until: Date | null) {
  return Boolean(until && new Date(until).getTime() > Date.now());
}

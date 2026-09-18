import test from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, verifyPassword, canAccessResource } from './security.js';

test('password hashing and verification work', async () => {
  const hash = await hashPassword('StrongPassword123!');
  assert.match(hash, /^\$2[aby]\$/);
  assert.equal(await verifyPassword('StrongPassword123!', hash), true);
  assert.equal(await verifyPassword('WrongPassword123!', hash), false);
});

test('role access helper enforces allowed roles', () => {
  assert.equal(canAccessResource('ADMIN', ['ADMIN', 'DOCTOR']), true);
  assert.equal(canAccessResource('STAFF', ['ADMIN', 'DOCTOR']), false);
  assert.equal(canAccessResource('DOCTOR', ['ADMIN', 'DOCTOR']), true);
});

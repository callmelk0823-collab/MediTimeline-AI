import type { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma.js';
import { env } from '../utils/env.js';
import { generateRecoveryCodes, hashPassword, validateTotp, verifyPassword, generateTotpSecret } from '../utils/security.js';

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
  code: z.string().optional(),
});

const demoUsers = [
  {
    email: env.demoAdminEmail,
    username: env.demoAdminUsername,
    password: env.demoAdminPassword,
    name: 'System Administrator',
    role: 'ADMIN',
  },
  {
    email: env.demoDoctorEmail,
    username: env.demoDoctorUsername,
    password: env.demoDoctorPassword,
    name: 'Clinical Doctor',
    role: 'DOCTOR',
  },
  {
    email: env.demoStaffEmail,
    username: env.demoStaffUsername,
    password: env.demoStaffPassword,
    name: 'Clinical Staff',
    role: 'STAFF',
  },
] as const;

async function ensureSeededUsers() {
  for (const userSeed of demoUsers) {
    const userExists = await prisma.user.findUnique({ where: { username: userSeed.username } });
    if (!userExists) {
      const passwordHash = await hashPassword(userSeed.password);
      await prisma.user.create({
        data: {
          email: userSeed.email,
          username: userSeed.username,
          name: userSeed.name,
          role: userSeed.role,
          passwordHash,
          recoveryCodes: JSON.stringify(generateRecoveryCodes()),
          totpSecretEncrypted: null,
        },
      });
    }
  }
}

export async function login(req: Request, res: Response) {
  try {
    await ensureSeededUsers();

    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ success: false, message: 'Invalid login payload', error: parsed.error.issues.map((issue) => issue.message).join(', ') });
    }

    const { username, password, code } = parsed.data;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials', error: 'Unauthorized' });
    }

    if (user.status === 'LOCKED') {
      return res.status(403).json({ success: false, message: 'Account locked', error: 'Forbidden' });
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      const failedAttempts = user.failedLoginAttempts + 1;
      const lockThreshold = 5;
      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: failedAttempts,
          lockedUntil: failedAttempts >= lockThreshold ? new Date(Date.now() + 15 * 60 * 1000) : null,
          status: failedAttempts >= lockThreshold ? 'LOCKED' : user.status,
        },
      });
      return res.status(401).json({ success: false, message: 'Invalid credentials', error: 'Unauthorized' });
    }

    if (user.totpSecretEncrypted) {
      if (!code) {
        return res.status(401).json({ success: false, message: 'Two-factor authentication required', error: 'MFA_REQUIRED' });
      }

      const isValidTotp = validateTotp(user.totpSecretEncrypted, code);
      if (!isValidTotp) {
        return res.status(401).json({ success: false, message: 'Invalid MFA code', error: 'MFA_INVALID' });
      }
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lockedUntil: null, status: 'ACTIVE' },
    });

    req.session.userId = user.id;
    req.session.userRole = user.role;

    return res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      },
      message: 'Login successful',
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Login failed', error: error.message || 'Unexpected login error' });
  }
}

export async function logout(req: Request, res: Response) {
  req.session.destroy(() => undefined);
  return res.json({ success: true, message: 'Logged out successfully' });
}

export async function me(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required', error: 'Unauthorized' });
  }

  return res.json({
    success: true,
    data: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      status: req.user.status,
    },
    message: 'Authenticated user retrieved',
  });
}

export async function verifyTotp(req: Request, res: Response) {
  const { code } = req.body as { code?: string };
  const user = req.user;

  if (!user) {
    return res.status(401).json({ success: false, message: 'Authentication required', error: 'Unauthorized' });
  }

  const storedUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!storedUser || !storedUser.totpSecretEncrypted) {
    const secret = generateTotpSecret();
    await prisma.user.update({ where: { id: user.id }, data: { totpSecretEncrypted: secret } });
    return res.json({ success: true, data: { secret, issuer: 'MediTimeline AI', label: storedUser?.email || user.email }, message: 'TOTP setup initialized' });
  }

  if (!code || !validateTotp(storedUser.totpSecretEncrypted, code)) {
    return res.status(400).json({ success: false, message: 'Invalid MFA code', error: 'MFA_INVALID' });
  }

  return res.json({ success: true, message: 'TOTP verified' });
}

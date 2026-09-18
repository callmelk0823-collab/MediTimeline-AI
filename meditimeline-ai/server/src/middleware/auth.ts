import type { NextFunction, Request, Response } from 'express';
import { prisma } from '../utils/prisma.js';
import { canAccessResource, isWithinLockoutWindow } from '../utils/security.js';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    userRole?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        username: string;
        role: string;
        status: string;
      };
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Authentication required', error: 'Unauthorized' });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    req.session.destroy(() => undefined);
    return res.status(401).json({ success: false, message: 'Session invalid', error: 'Unauthorized' });
  }

  if (user.status !== 'ACTIVE' || isWithinLockoutWindow(user.lockedUntil)) {
    req.session.destroy(() => undefined);
    return res.status(403).json({ success: false, message: 'Account is locked or inactive', error: 'Forbidden' });
  }

  req.user = {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    status: user.status,
  };

  return next();
}

export function requireRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required', error: 'Unauthorized' });
    }

    if (!canAccessResource(req.user.role, allowedRoles)) {
      return res.status(403).json({ success: false, message: 'Insufficient permissions', error: 'Forbidden' });
    }

    return next();
  };
}

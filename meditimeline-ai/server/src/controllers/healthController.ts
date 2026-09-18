import type { Request, Response } from 'express';

export async function healthCheck(_req: Request, res: Response) {
  return res.json({
    success: true,
    data: { status: 'ok', timestamp: new Date().toISOString() },
    message: 'Server is healthy',
  });
}

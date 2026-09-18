import type { NextFunction, Request, Response } from 'express';

export function notFoundHandler(req: Request, res: Response) {
  return res.status(404).json({
    success: false,
    message: 'Resource not found',
    error: `Route not found: ${req.originalUrl}`,
  });
}

export function globalErrorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  return res.status(statusCode).json({
    success: false,
    message: 'An unexpected server error occurred',
    error: err.message || 'Internal server error',
  });
}

import * as express from 'express';
import { logger } from '~/utils/logger';

/**
 * ログを出力するためのミドルウェア
 * @param req
 * @param res
 * @param next
 */
export const requestLoggerMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  logger({ message: `${req.method} ${req.originalUrl}`, status: 'info' });
  const start = new Date().getTime();
  res.on('finish', () => {
    const elapsed = new Date().getTime() - start;
    logger({
      message: `${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`,
      status: 'info',
    });
  });
  next();
};

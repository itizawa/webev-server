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
  logger(`${req.method} ${req.originalUrl}`);
  const start = new Date().getTime();
  res.on('finish', () => {
    const elapsed = new Date().getTime() - start;
    logger(`${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`);
  });
  next();
};

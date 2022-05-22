import { Response, NextFunction, Request } from 'express';
import { User } from '~/domain/User';
import { logger } from '~/utils/logger';

/**
 * ログイン状態をチェックするミドルウェア
 * @param req
 * @param res
 * @param next
 * @returns 403
 */
export const loginRequired = (
  req: Request & { user: User },
  res: Response,
  next: NextFunction,
): Response | void => {
  if (req.user == null) {
    logger('Error: login required', 'error');
    return res.sendStatus(403);
  }

  return next();
};

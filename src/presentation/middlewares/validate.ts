import express from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { logger } from '~/utils/logger';

/**
 * バリデーションするためのミドルウェア
 * @param validations ValidationChain
 * @param callback 成功後に実行する関数
 */
export const validate = (validations: ValidationChain[], callback) => {
  return async (req: express.Request, res: express.Response) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return callback(req, res);
    }
    logger({ errors }, 'error');

    res.status(400).json({ errors: errors.array() });
  };
};

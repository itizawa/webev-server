import { Request, Response } from 'express';

/**
 * ログイン中のユーザーを取得する
 * @path GET /api/v1/user/me
 * @returns
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  return res.status(200).json({ currentUser: req.user });
};

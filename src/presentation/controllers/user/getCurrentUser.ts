import { Request, Response } from 'express';

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     description: ログイン中のユーザーを取得する
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: ログイン中のユーザーを返す
 *         schema:
 *           type: object
 *           properties:
 *             currentUser:
 *               $ref: '#/definitions/User'
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  return res.status(200).json({ currentUser: req.user });
};

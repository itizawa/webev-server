import { Request, Response } from 'express';
import { FindPagesByUserIdUseCase } from '~/application/useCases/page';
import { User } from '~/domain/User';
import { PageRepository } from '~/infrastructure/repositories/PageRepository';

const postPageByUrlUseCase = new FindPagesByUserIdUseCase(new PageRepository());

/**
 * @swagger
 * /api/v1/pages/list:
 *   get:
 *     description: ユーザーに紐付いたページを取得する
 *     parameters:
 *      - name: userId
 *        in: query
 *        description: userId
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: 検索条件にあったページを返す
 *         schema:
 *           type: object
 *           properties:
 *             pages:
 *               $ref: '#/definitions/Page'
 */
export const findPagesByUserId = async (
  req: Request & { user: User },
  res: Response,
) => {
  try {
    const paginationPage = await postPageByUrlUseCase.execute({
      userId: req.user.id,
    });
    return res.status(200).json({ paginationPage });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

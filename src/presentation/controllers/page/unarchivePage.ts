import { Request, Response } from 'express';

import { UnarchivePageUseCase } from '~/application/useCases/page';
import { User } from '~/domain/User';
import { PageRepository } from '~/infrastructure/repositories/PageRepository';

const unarchivePageUseCase = new UnarchivePageUseCase(new PageRepository());

/**
 * @swagger
 * /api/v1/pages/:id/unarchive:
 *   get:
 *     description: ページをアーカイブから戻す
 *     parameters:
 *      - name: pageId
 *        in: params
 *        description: pageId
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: 変更後のページを返す
 *         schema:
 *           type: object
 *           properties:
 *             page:
 *               $ref: '#/definitions/Page'
 */
export const unarchivePage = async (
  req: Request & { user: User },
  res: Response,
) => {
  const { id } = req.params;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'idはstringである必要があります' });
  }

  try {
    const page = await unarchivePageUseCase.execute({
      pageId: id,
      userId: req.user.id,
    });
    return res.status(200).json({ page });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

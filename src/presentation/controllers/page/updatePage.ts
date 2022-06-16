import { Request, Response } from 'express';

import { UpdatePageUseCase } from '~/application/useCases/page';
import { Page } from '~/domain/Page';
import { User } from '~/domain/User';
import { PageRepository } from '~/infrastructure/repositories/PageRepository';
import { logger } from '~/utils/logger';

const updatePageUseCase = new UpdatePageUseCase(new PageRepository());

export const updatePage = async (
  req: Request<
    { pageId: string },
    Record<string, never>,
    { magazineId?: string; isRead?: 'true' | 'false' }
  > & {
    user: User;
  },
  res: Response,
) => {
  const { user } = req;
  const { pageId } = req.params;

  if (typeof pageId !== 'string') {
    return res.status(400);
  }

  const newObject: Partial<Page> = {};

  if (req.body.isRead) {
    newObject.isRead = Boolean(req.body.isRead);
  }

  if (req.body.magazineId) {
    newObject.magazineId = req.body.magazineId;
  }

  try {
    const page = await updatePageUseCase.execute(user.id, pageId, newObject);
    return res.status(200).json({ page });
  } catch (error) {
    logger(error, 'error');
    return res.status(500).json({ message: error.message });
  }
};

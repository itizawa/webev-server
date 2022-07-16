import { Request, Response } from 'express';
import { CreatePageMagazineRelationUseCase } from '~/application/useCases/PageMagazineRelation';
import { User } from '~/domain/User';
import { PageMagazineRelationRepository } from '~/infrastructure/repositories/PageMagazineRelationRepository';
import { logger } from '~/utils/logger';

const createPageMagazineRelationUseCase = new CreatePageMagazineRelationUseCase(
  new PageMagazineRelationRepository(),
);

export const createPageMagazineRelation = async (
  req: Request & { user: User },
  res: Response,
) => {
  const { user } = req;

  const { pageId, magazineIds } = req.body;

  if (typeof pageId !== 'string') {
    return res.status(400).json({ message: '入力値が不正です' });
  }

  try {
    await createPageMagazineRelationUseCase.execute({
      pageId,
      magazineIds,
      userId: user.id,
    });
    return res.status(200).json();
  } catch (error) {
    logger(error, 'error');
    return res.status(500).json({ message: error.message });
  }
};

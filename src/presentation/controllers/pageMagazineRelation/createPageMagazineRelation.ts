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
  const { pageId, magazineId } = req.body;

  if (typeof pageId !== 'string' || typeof magazineId !== 'string') {
    return res.status(400).json({ message: '入力値が不正です' });
  }

  try {
    const pageMagazineRelation =
      await createPageMagazineRelationUseCase.execute({
        pageId,
        magazineId,
        userId: user.id,
      });
    return res.status(200).json({ pageMagazineRelation });
  } catch (error) {
    logger(error, 'error');
    return res.status(500).json({ message: error.message });
  }
};

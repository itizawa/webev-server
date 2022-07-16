import { Request, Response } from 'express';

import { User } from '~/domain/User';
import { FindPageMagazineRelationUseCase } from '~/application/useCases/PageMagazineRelation';
import { PageMagazineRelationRepository } from '~/infrastructure/repositories/PageMagazineRelationRepository';
import { FilterQuery } from 'mongoose';
import { PageMagazineRelation } from '~/domain/PageMagazineRelation';
import { PaginationOptions } from '~/domain/shared';

const findPageMagazineRelationUseCase = new FindPageMagazineRelationUseCase(
  new PageMagazineRelationRepository(),
);

export const findPageMagazineRelations = async (
  req: Request<{ id: string }> & { user: User },
  res: Response,
) => {
  const { pageId, magazineId } = req.query;

  if (typeof pageId !== 'string' && typeof magazineId !== 'string') {
    return res.status(400).json({ message: 'リクエストが不正です' });
  }

  const query: FilterQuery<PageMagazineRelation> = {
    createdUser: req.user.id,
  };

  if (pageId) {
    query.pageId = pageId;
  }

  if (magazineId) {
    query.magazineId = magazineId;
  }

  const options = new PaginationOptions({
    page: 1,
    limit: 100,
    sort: '-createdAt',
  });

  try {
    const pageMagazineRelationPagination =
      await findPageMagazineRelationUseCase.execute(query, options);
    return res.status(200).json({ pageMagazineRelationPagination });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

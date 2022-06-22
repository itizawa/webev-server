import { Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { escapeRegExp } from 'lodash';

import { Magazine } from '~/domain/Magazine';
import { PaginationOptions } from '~/domain/shared';
import { User } from '~/domain/User';
import { MagazineRepository } from '~/infrastructure/repositories/MagazineRepository';

const findMagazinesByUserIdUseCase = new FindMagazinesByUserIdUseCase(
  new MagazineRepository(),
);

export const findMagazines = async (
  req: Request<{ isPublic: 'true' | 'false' }> & { user: User },
  res: Response,
) => {
  const { sort, page = '1', limit = '10', q = '', isPublic } = req.query;

  if (
    typeof q !== 'string' ||
    typeof page !== 'string' ||
    typeof limit !== 'string' ||
    typeof sort !== 'string'
  ) {
    return res.status(400).json({ message: 'urlはstringである必要があります' });
  }

  const query: FilterQuery<Magazine> = {
    createdUser: req.user.id,
    isDeleted: false,
  };

  if (isPublic !== undefined) {
    query.isPublic = isPublic === 'true';
  }

  if (q) {
    const safeQuery = escapeRegExp(q);
    query.$or = [
      { url: new RegExp(safeQuery) },
      { title: new RegExp(safeQuery) },
      { siteName: new RegExp(safeQuery) },
      { description: new RegExp(safeQuery) },
    ];
  }

  const options = new PaginationOptions({
    page: parseInt(page),
    limit: parseInt(limit),
    sort,
  });

  try {
    const magazinePagination = await findMagazinesByUserIdUseCase.execute(
      query,
      options,
    );
    return res.status(200).json({ magazinePagination });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

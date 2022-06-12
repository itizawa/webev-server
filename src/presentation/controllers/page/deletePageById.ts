import { Request, Response } from 'express';

import { DeletePageByIdUseCase } from '~/application/useCases/page';
import { User } from '~/domain/User';
import { PageRepository } from '~/infrastructure/repositories/PageRepository';

const deletePageByIdUseCase = new DeletePageByIdUseCase(new PageRepository());

export const deletePageById = async (
  req: Request & { user: User },
  res: Response,
) => {
  const { user } = req;
  const { id } = req.params;

  try {
    const count = await deletePageByIdUseCase.execute(id, user.id);
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import { Request, Response } from 'express';
import { CreateMagazineUseCase } from '~/application/useCases/Magazine';
import { User } from '~/domain/User';
import { MagazineRepository } from '~/infrastructure/repositories/MagazineRepository';
import { logger } from '~/utils/logger';

const createMagazineUseCase = new CreateMagazineUseCase(
  new MagazineRepository(),
);

export const createMagazine = async (
  req: Request & { user: User },
  res: Response,
) => {
  const { user } = req;
  const { name, description } = req.body;

  if (typeof name !== 'string' || typeof description !== 'string') {
    return res.status(400).json({ message: '入力値が不正です' });
  }

  try {
    const page = await createMagazineUseCase.execute({
      name,
      description,
      createdUserId: user.id,
    });
    return res.status(200).json({ page });
  } catch (error) {
    logger(error, 'error');
    return res.status(500).json({ message: error.message });
  }
};

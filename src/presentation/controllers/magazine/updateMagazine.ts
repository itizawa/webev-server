import { Request, Response } from 'express';
import { UpdateMagazineUseCase } from '~/application/useCases/Magazine/UpdateMagazineUseCase/UpdateMagazineUseCase';
import { Magazine } from '~/domain/Magazine';

import { User } from '~/domain/User';
import { MagazineRepository } from '~/infrastructure/repositories/MagazineRepository';
import { logger } from '~/utils/logger';

const updateMagazineUseCase = new UpdateMagazineUseCase(
  new MagazineRepository(),
);

export const updateMagazine = async (
  req: Request<
    { id: string },
    Record<string, never>,
    {
      name?: string;
      description?: string;
      isDeleted?: 'true' | 'false';
      isPublic?: 'true' | 'false';
    }
  > & {
    user: User;
  },
  res: Response,
) => {
  const { user } = req;
  const { id } = req.params;

  if (typeof id !== 'string') {
    return res.status(400);
  }

  const newObject: Partial<Magazine> = {};

  if (req.body.description) {
    newObject.description = req.body.description;
  }

  if (req.body.name) {
    newObject.name = req.body.name;
  }

  if (req.body.isDeleted) {
    newObject.isDeleted = req.body.isDeleted === 'true';
  }

  if (req.body.isPublic) {
    newObject.isPublic = req.body.isPublic === 'true';
  }

  try {
    const magazine = await updateMagazineUseCase.execute(
      user.id,
      id,
      newObject,
    );
    return res.status(200).json({ magazine });
  } catch (error) {
    logger(error, 'error');
    return res.status(500).json({ message: error.message });
  }
};

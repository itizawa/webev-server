import { Request, Response } from 'express';

import { ReadPageUseCase } from '~/application/useCases/page';
import { PageRepository } from '~/infrastructure/repositories/PageRepository';
import { logger } from '~/utils/logger';

const readPageUseCase = new ReadPageUseCase(new PageRepository());

export const readPage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const page = await readPageUseCase.execute(id);
    return res.status(200).json({ page });
  } catch (error) {
    logger(error, 'error');
    return res.status(500).json({ message: error.message });
  }
};

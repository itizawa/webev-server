import { Request, Response } from 'express';

import { CountAllPagesUseCase } from '~/application/useCases/page';
import { PageRepository } from '~/infrastructure/repositories/PageRepository';

const countAllPagesUseCase = new CountAllPagesUseCase(new PageRepository());

export const countAllPages = async (_req: Request, res: Response) => {
  try {
    const count = await countAllPagesUseCase.execute();
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

import { Request, Response } from 'express';

import { User } from '~/domain/User';
import { PageRepository } from '~/infrastructure/repositories/PageRepository';
import { FindPageByUserIdUseCase } from '~/application/useCases/page';

const findPagesByUserIdUseCase = new FindPageByUserIdUseCase(
  new PageRepository(),
);

export const findPage = async (
  req: Request<{ id: string }> & { user: User },
  res: Response,
) => {
  const { user } = req;
  const { id: pageId } = req.params;

  if (typeof pageId !== 'string') {
    return res
      .status(400)
      .json({ message: 'pageIdはstringである必要があります' });
  }

  try {
    const page = await findPagesByUserIdUseCase.execute(user.id, pageId);
    return res.status(200).json({ page });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

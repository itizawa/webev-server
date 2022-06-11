import { Request, Response } from 'express';
import { CountPagesByUserIdUseCase } from '~/application/useCases/page';
import { PageRepository } from '~/infrastructure/repositories/PageRepository';

const countPagesByUserIdUseCase = new CountPagesByUserIdUseCase(
  new PageRepository(),
);

// ユーザーに紐付いたページの個数を返す
export const getUserPagesCount = async (req: Request, res: Response) => {
  const { id: userId } = req.params;

  if (typeof userId === 'string') {
    return res.status(400).json({ message: '不正なリクエストです' });
  }

  try {
    const count = await countPagesByUserIdUseCase.execute(userId);
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

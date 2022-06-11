import { IPageRepository } from '~/infrastructure/repositories/PageRepository';

/**
 * userIdをもとにページの件数を取得するUseCase
 */
export class CountPagesByUserIdUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  async execute(userId: string): Promise<number> {
    return await this.pageRepository.countByUserId(userId);
  }
}

import { Page } from '~/domain/Page';
import { PaginationResult } from '~/domain/shared';
import { IPageRepository } from '~/infrastructure/repositories/PageRepository';

/**
 * userIdをもとにpageの一覧を取得するUseCase
 * @param {string} userId
 */
export class FindPagesByUserIdUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  async execute({
    userId,
  }: {
    userId: string;
  }): Promise<PaginationResult<Page>> {
    return await this.pageRepository.findPagesByUserId(userId);
  }
}

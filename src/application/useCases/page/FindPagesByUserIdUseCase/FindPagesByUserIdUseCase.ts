import { FilterQuery } from 'mongoose';
import { Page } from '~/domain/Page';
import { PaginationResult } from '~/domain/shared';
import { PaginationOptions } from '~/domain/shared/PaginationOptions';
import { IPageRepository } from '~/infrastructure/repositories/PageRepository';

/**
 * userIdをもとにpageの一覧を取得するUseCase
 * @param {string} userId
 */
export class FindPagesByUserIdUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  async execute(
    query: FilterQuery<Page>,
    option: PaginationOptions,
  ): Promise<PaginationResult<Page>> {
    return await this.pageRepository.findPages(query, option);
  }
}

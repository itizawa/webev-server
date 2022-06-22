import { FilterQuery } from 'mongoose';
import { Magazine } from '~/domain/Magazine';
import { PaginationResult } from '~/domain/shared';
import { PaginationOptions } from '~/domain/shared/PaginationOptions';
import { IMagazineRepository } from '~/infrastructure/repositories/MagazineRepository';

/**
 * userIdをもとにpageの一覧を取得するUseCase
 * @param {string} userId
 */
export class FindMagazinesByUserIdUseCase {
  constructor(private readonly pageRepository: IMagazineRepository) {}

  async execute(
    query: FilterQuery<Magazine>,
    option: PaginationOptions,
  ): Promise<PaginationResult<Magazine>> {
    return await this.pageRepository.findMagazines(query, option);
  }
}

import { IPageRepository } from '~/infrastructure/repositories/PageRepository';

/**
 * 全てのページの件数を取得するUseCase
 */
export class CountAllPagesUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  async execute(): Promise<number> {
    return await this.pageRepository.count();
  }
}

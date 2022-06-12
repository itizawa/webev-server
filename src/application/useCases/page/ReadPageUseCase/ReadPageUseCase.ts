import { Page } from '~/domain/Page';
import { IPageRepository } from '~/infrastructure/repositories/PageRepository';

/**
 * @param {string} id
 */
export class ReadPageUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  async execute(id: string): Promise<Page> {
    return await this.pageRepository.update(id, { isRead: true });
  }
}

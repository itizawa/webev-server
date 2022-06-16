import { Page } from '~/domain/Page';
import { IPageRepository } from '~/infrastructure/repositories/PageRepository';

/**
 * PageにマガジンをセットするUseCase
 */
export class UpdatePageUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  async execute(
    userId: string,
    pageId: string,
    newObject: Partial<Page>,
  ): Promise<Page> {
    const page = await this.pageRepository.findById(pageId);

    if (page.createdUser !== userId) {
      throw new Error('権限がありません');
    }

    return await this.pageRepository.update(page.id, newObject);
  }
}

import { Page } from '~/domain/Page';
import { IPageRepository } from '~/infrastructure/repositories/PageRepository';

/**
 * id を元に page をアーカイブする
 * @param {string} url
 * @param {string} userId
 */
export class ArchivePageUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  async execute({
    pageId,
    userId,
  }: {
    pageId: string;
    userId: string;
  }): Promise<Page> {
    const page = await this.pageRepository.findById(pageId);

    if (!page) {
      throw new Error('ページが見つかりません');
    }

    if (page.createdUser !== userId) {
      throw new Error('変更できるのは自身が作成したページだけです');
    }

    return await this.pageRepository.update(page.id, {
      archivedAt: new Date(),
    });
  }
}

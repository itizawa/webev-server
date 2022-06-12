import { Page } from '~/domain/Page';
import { IPageRepository } from '~/infrastructure/repositories/PageRepository';

/**
 * pageIdをもとにページ削除するUseCase
 */
export class DeletePageByIdUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  async execute(id: string, userId: string): Promise<Page> {
    const page = await this.pageRepository.findById(id);

    if (!page || page.createdUser === userId) {
      throw new Error('ページを削除する権限がありません');
    }

    return await this.pageRepository.update(id, { isDeleted: true });
  }
}

import { Page } from '~/domain/Page';
import { IPageRepository } from '~/infrastructure/repositories/PageRepository';

/**
 * idをもとにpageを取得するUseCase
 * @param {string} userId
 */
export class FindPageByUserIdUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  async execute(userId: string, pageId: string): Promise<Page> {
    const page = await this.pageRepository.findById(pageId);

    if (page.createdUser !== userId) {
      throw new Error('作成者しか取得できません');
    }

    return page;
  }
}

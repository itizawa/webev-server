import { IOgpAdapter } from '~/application/adapters/IOgpAdapter';
import { Page } from '~/domain/Page';
import { IPageRepository } from '~/infrastructure/repositories/PageRepository';
import { logger } from '~/utils/logger';

/**
 * url をもとに page を複数生成する
 * @param {string} url
 * @param {string} userId
 */
export class PostPageByUrlUseCase {
  constructor(
    private readonly ogpAdapter: IOgpAdapter,
    private readonly pageRepository: IPageRepository,
  ) {}

  async execute({
    url,
    userId,
  }: {
    url: string;
    userId: string;
  }): Promise<Page> {
    const ogp = await this.ogpAdapter.fetch(url);

    logger({ ogp, message: 'Ogpを取得しました' });

    return await this.pageRepository.create(
      Page.create({ ...ogp, isDeleted: false, createdUser: userId }),
    );
  }
}

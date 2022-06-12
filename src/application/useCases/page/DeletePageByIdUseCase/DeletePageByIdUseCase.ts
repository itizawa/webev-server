import { Page } from '~/domain/Page';
import { IPageRepository } from '~/infrastructure/repositories/PageRepository';

/**
 * pageIdをもとにページ削除するUseCase
 */
export class DeletePageByIdUseCase {
  constructor(private readonly pageRepository: IPageRepository) {}

  async execute(id: string): Promise<Page> {
    return await this.pageRepository.deleteById(id);
  }
}

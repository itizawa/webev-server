import { Magazine } from '~/domain/Magazine';
import { IMagazineRepository } from '~/infrastructure/repositories/MagazineRepository';

/**
 * PageにマガジンをセットするUseCase
 */
export class UpdateMagazineUseCase {
  constructor(private readonly magazineRepository: IMagazineRepository) {}

  async execute(
    userId: string,
    pageId: string,
    newObject: Partial<Magazine>,
  ): Promise<Magazine> {
    const magazine = await this.magazineRepository.update(pageId, newObject);

    if (magazine.createdUserId !== userId) {
      throw new Error('権限がありません');
    }

    return await this.magazineRepository.update(magazine.id, newObject);
  }
}

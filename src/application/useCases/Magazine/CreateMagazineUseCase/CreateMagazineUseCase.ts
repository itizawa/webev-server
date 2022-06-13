import { Magazine } from '~/domain/Magazine';
import { IMagazineRepository } from '~/infrastructure/repositories/MagazineRepository';

export class CreateMagazineUseCase {
  constructor(private readonly magazineRepository: IMagazineRepository) {}
  /**
   * Ogp を取得する
   * @param url {string} 対象のurl
   */
  async execute({
    name,
    description,
    createdUserId,
  }: {
    name: string;
    description?: string;
    createdUserId: string;
  }): Promise<Magazine> {
    return await this.magazineRepository.create(
      Magazine.create({
        name,
        description,
        createdUserId,
      }),
    );
  }
}

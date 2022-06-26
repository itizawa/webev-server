import { PageMagazineRelation } from '~/domain/PageMagazineRelation';
import { IPageMagazineRelationRepository } from '~/infrastructure/repositories/PageMagazineRelationRepository';

export class CreatePageMagazineRelationUseCase {
  constructor(
    private readonly pageMagazineRelationRepository: IPageMagazineRelationRepository,
  ) {}

  async execute({
    pageId,
    magazineId,
    userId,
  }: {
    pageId: string;
    magazineId: string;
    userId: string;
  }): Promise<PageMagazineRelation> {
    return await this.pageMagazineRelationRepository.create(
      PageMagazineRelation.create({
        magazineId,
        pageId,
        createdUserId: userId,
      }),
    );
  }
}

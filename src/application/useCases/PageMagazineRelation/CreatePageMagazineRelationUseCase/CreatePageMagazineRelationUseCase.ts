import { PageMagazineRelation } from '~/domain/PageMagazineRelation';
import { IPageMagazineRelationRepository } from '~/infrastructure/repositories/PageMagazineRelationRepository';

export class CreatePageMagazineRelationUseCase {
  constructor(
    private readonly pageMagazineRelationRepository: IPageMagazineRelationRepository,
  ) {}

  async execute({
    pageId,
    magazineIds,
    userId,
  }: {
    pageId: string;
    magazineIds: string[];
    userId: string;
  }): Promise<void> {
    // TODO: transaction
    const asyncJobs = magazineIds.map((magazineId) => {
      return this.pageMagazineRelationRepository.create(
        PageMagazineRelation.create({
          magazineId,
          pageId,
          createdUserId: userId,
        }),
      );
    });

    await Promise.all(asyncJobs);
  }
}

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
    console.log(pageId, userId);

    const magazineRelations = await this.pageMagazineRelationRepository.find(
      { pageId, createdUserId: userId },
      {
        page: 1,
        limit: 100,
      },
    );
    console.log(magazineRelations);

    const idsForDelete = magazineRelations.docs.flatMap((magazineRelation) =>
      magazineIds.includes(magazineRelation.id) ? [] : magazineRelation.id,
    );

    // TODO: transaction
    const asyncJobs = magazineIds.map((magazineId) => {
      return this.pageMagazineRelationRepository.update(
        PageMagazineRelation.create({
          magazineId,
          pageId,
          createdUserId: userId,
        }),
      );
    });

    await this.pageMagazineRelationRepository.deleteMany({
      _id: { $in: idsForDelete },
    });

    await Promise.all(asyncJobs);
  }
}

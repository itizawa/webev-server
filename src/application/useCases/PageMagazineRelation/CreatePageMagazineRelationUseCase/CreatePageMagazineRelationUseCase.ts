import { isEmpty } from 'lodash';
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
    const magazineRelations = await this.pageMagazineRelationRepository.find(
      { pageId, createdUserId: userId },
      {
        page: 1,
        limit: 100,
      },
    );

    const existedMagazineIds = magazineRelations.docs.map(
      (doc) => doc.magazineId,
    );

    const idsForDelete = existedMagazineIds.filter(
      (v) => !magazineIds.includes(v),
    );

    const idsForCreate = magazineIds.filter(
      (v) => !existedMagazineIds.includes(v),
    );

    // TODO: transaction
    const asyncJobs = idsForCreate.map((magazineId) => {
      return this.pageMagazineRelationRepository.create(
        PageMagazineRelation.create({
          magazineId,
          pageId,
          createdUserId: userId,
        }),
      );
    });

    if (!isEmpty(idsForDelete)) {
      await this.pageMagazineRelationRepository.deleteMany({
        magazineId: { $in: idsForDelete },
      });
    }

    await Promise.all(asyncJobs);
  }
}

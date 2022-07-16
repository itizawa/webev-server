import { FilterQuery } from 'mongoose';
import { PageMagazineRelation } from '~/domain/PageMagazineRelation';
import { PaginationOptions, PaginationResult } from '~/domain/shared';
import { IPageMagazineRelationRepository } from '~/infrastructure/repositories/PageMagazineRelationRepository';

export class FindPageMagazineRelationUseCase {
  constructor(
    private readonly pageMagazineRelationRepository: IPageMagazineRelationRepository,
  ) {}

  async execute(
    query: FilterQuery<PageMagazineRelation>,
    option: PaginationOptions,
  ): Promise<PaginationResult<PageMagazineRelation>> {
    return await this.pageMagazineRelationRepository.find(query, option);
  }
}

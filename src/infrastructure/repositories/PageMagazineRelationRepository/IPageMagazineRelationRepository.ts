import { FilterQuery } from 'mongoose';
import { PageMagazineRelation } from '~/domain/PageMagazineRelation';
import { PaginationOptions, PaginationResult } from '~/domain/shared';

export interface IPageMagazineRelationRepository {
  create(pages: PageMagazineRelation): Promise<PageMagazineRelation>;
  find(
    query: FilterQuery<PageMagazineRelation>,
    option: PaginationOptions,
  ): Promise<PaginationResult<PageMagazineRelation>>;
}

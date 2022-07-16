import { FilterQuery } from 'mongoose';
import { PageMagazineRelation } from '~/domain/PageMagazineRelation';
import { PaginationOptions, PaginationResult } from '~/domain/shared';

export interface IPageMagazineRelationRepository {
  create(data: PageMagazineRelation): Promise<PageMagazineRelation>;
  deleteMany(query: FilterQuery<PageMagazineRelation>): Promise<void>;
  find(
    query: FilterQuery<PageMagazineRelation>,
    option: PaginationOptions,
  ): Promise<PaginationResult<PageMagazineRelation>>;
}

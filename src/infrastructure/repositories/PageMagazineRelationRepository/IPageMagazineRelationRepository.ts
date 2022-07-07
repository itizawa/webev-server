import { FilterQuery } from 'mongoose';
import { PageMagazineRelation } from '~/domain/PageMagazineRelation';
import { PaginationOptions, PaginationResult } from '~/domain/shared';

export interface IPageMagazineRelationRepository {
  update(pageMagazineRelation: PageMagazineRelation): Promise<void>;
  deleteMany(query: FilterQuery<PageMagazineRelation>): Promise<void>;
  find(
    query: FilterQuery<PageMagazineRelation>,
    option: PaginationOptions,
  ): Promise<PaginationResult<PageMagazineRelation>>;
}

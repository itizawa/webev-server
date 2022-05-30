import { FilterQuery } from 'mongoose';
import { Page } from '~/domain/Page';
import { PaginationResult } from '~/domain/shared';
import { PaginationOptions } from '~/domain/shared/PaginationOptions';

export interface IPageRepository {
  create(pages: Page): Promise<Page>;
  count(): Promise<number>;
  findPages(
    query: FilterQuery<Page>,
    option: PaginationOptions,
  ): Promise<PaginationResult<Page>>;
  // find(query: FilterQuery<Page>, options: PaginationOptions): Promise<PaginationResult<Page>>;
  findById(id: string): Promise<Page | null>;
  update(id: string, newObject: Partial<Page>): Promise<Page | null>;
}

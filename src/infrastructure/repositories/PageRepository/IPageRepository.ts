import { Page } from '~/domain/Page';

export interface IPageRepository {
  create(pages: Page): Promise<Page>;
  count(): Promise<number>;
  // find(query: FilterQuery<Page>, options: PaginationOptions): Promise<PaginationResult<Page>>;
  findById(id: string): Promise<Page | null>;
  update(id: string, newObject: Partial<Page>): Promise<Page | null>;
}

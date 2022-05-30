export class PaginationOptions {
  page: number;
  limit: number;
  sort?: { [key: string]: number };
  constructor({
    page,
    limit,
    sort,
  }: {
    page: number;
    limit: number;
    sort?: string;
  }) {
    this.page = page;
    this.limit = limit;
    if (sort !== undefined && typeof sort === 'string') {
      const sortOrder = sort.startsWith('-') ? -1 : 1;
      const sortKey = sortOrder === -1 ? sort.slice(1) : sort;
      this.sort = { [sortKey]: sortOrder };
    }
  }
}

export class PaginationResult<T> {
  docs: T[];
  hasNextPage: boolean;
  totalPages: number;
  totalDocs: number;
  limit: number;

  constructor(init: PaginationResult<T>) {
    this.docs = init.docs;
    this.hasNextPage = init.hasNextPage;
    this.totalPages = init.totalPages;
    this.totalDocs = init.totalDocs;
    this.limit = init.limit;
  }
}

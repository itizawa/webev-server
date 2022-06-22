import { FilterQuery } from 'mongoose';
import { Magazine } from '~/domain/Magazine';
import { PaginationOptions, PaginationResult } from '~/domain/shared';
import { IMagazineRepository } from './IMagazineRepository';

export class MockMagazineRepository implements IMagazineRepository {
  magazines: Magazine[];
  constructor(magazines: Magazine[] = []) {
    this.magazines = magazines;
  }

  async create(magazine: Magazine): Promise<Magazine> {
    this.magazines.push(magazine);

    return magazine;
  }

  async findMagazines(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: FilterQuery<Magazine>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    option: PaginationOptions,
  ): Promise<PaginationResult<Magazine>> {
    return new PaginationResult({
      docs: this.magazines,
      hasNextPage: true,
      totalPages: 1,
      totalDocs: 100,
      limit: 1,
    });
  }

  async update(id: string, newObject: Partial<Magazine>): Promise<Magazine> {
    const magazine = this.magazines.find((v) => v.id === id);
    const newMagazine = new Magazine({ ...magazine, ...newObject });

    this.magazines = this.magazines.map((v) => {
      if (v.id !== id) return v;
      return newMagazine;
    });

    return newMagazine;
  }
}

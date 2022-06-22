import { FilterQuery } from 'mongoose';
import { Magazine } from '~/domain/Magazine';
import { PaginationOptions, PaginationResult } from '~/domain/shared';

export interface IMagazineRepository {
  create(magazine: Magazine): Promise<Magazine>;
  findMagazines(
    query: FilterQuery<Magazine>,
    option: PaginationOptions,
  ): Promise<PaginationResult<Magazine>>;
  update(id: string, newObject: Partial<Magazine>): Promise<Magazine | null>;
}

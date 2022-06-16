import { Magazine } from '~/domain/Magazine';
import { IMagazineRepository } from './IMagazineRepository';

export class MockMagazineRepository implements IMagazineRepository {
  constructor(private readonly magazines: Magazine[] = []) {}

  async create(magazine: Magazine): Promise<Magazine> {
    this.magazines.push(magazine);

    return magazine;
  }
}

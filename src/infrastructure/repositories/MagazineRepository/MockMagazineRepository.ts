import { Magazine } from '~/domain/Magazine';
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

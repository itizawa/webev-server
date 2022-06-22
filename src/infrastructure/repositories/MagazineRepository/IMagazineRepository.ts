import { Magazine } from '~/domain/Magazine';

export interface IMagazineRepository {
  create(magazine: Magazine): Promise<Magazine>;
  update(id: string, newObject: Partial<Magazine>): Promise<Magazine | null>;
}

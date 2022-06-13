import { Magazine } from '~/domain/Magazine';

export interface IMagazineRepository {
  create(magazine: Magazine): Promise<Magazine>;
}

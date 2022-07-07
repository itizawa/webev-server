import { PageMagazineRelation } from '~/domain/PageMagazineRelation';

export interface IPageMagazineRelationRepository {
  create(pages: PageMagazineRelation): Promise<PageMagazineRelation>;
  findByPageId(id: string): Promise<PageMagazineRelation[]>;
  findByMagazineId(id: string): Promise<PageMagazineRelation[]>;
}

import { PageMagazineRelation } from '~/domain/PageMagazineRelation';

export interface IPageMagazineRelationRepository {
  create(pages: PageMagazineRelation): Promise<PageMagazineRelation>;
}

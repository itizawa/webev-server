import { ObjectId } from 'mongodb';

export class PageMagazineRelation {
  id: string;
  pageId: string;
  magazineId: string;
  createdUserId: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(init: PageMagazineRelation) {
    this.id = init.id;
    this.pageId = init.pageId;
    this.magazineId = init.magazineId;
    this.createdUserId = init.createdUserId;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }

  public static create(
    params: Omit<PageMagazineRelation, 'id' | 'createdAt' | 'updatedAt'>,
  ) {
    return new PageMagazineRelation({
      // 本来生成する場所はdomainに書くべきではない
      id: new ObjectId().toString(),
      pageId: params.pageId,
      createdUserId: params.createdUserId,
      magazineId: params.magazineId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

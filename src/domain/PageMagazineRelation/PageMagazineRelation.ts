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
}

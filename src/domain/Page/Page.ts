/**
 * @swagger
 * definitions:
 *   Page:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       url:
 *         type: string
 *       image:
 *         type: string
 *       favicon:
 *         type: string
 *       description:
 *         type: string
 *       title:
 *         type: string
 *       body:
 *         type: string
 *       siteName:
 *         type: string
 *       isDeleted:
 *         type: boolean
 *       createdUser:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 *       archivedAt:
 *         type: string
 */
export class Page {
  id: string;
  url: string;
  image: string;
  favicon: string;
  description: string;
  title: string;
  body?: string;
  siteName: string;
  isDeleted: boolean;
  createdUser: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt?: Date | null;
  constructor(init: Page) {
    this.id = init.id;
    this.url = init.url;
    this.image = init.image;
    this.favicon = init.favicon;
    this.description = init.description;
    this.title = init.title;
    this.body = init.body;
    this.siteName = init.siteName;
    this.isDeleted = init.isDeleted;
    this.createdUser = init.createdUser;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
    this.archivedAt = init.archivedAt;
  }
}
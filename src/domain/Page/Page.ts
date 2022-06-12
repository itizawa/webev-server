import { ObjectId } from 'mongodb';

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
 */
export class Page {
  id: string;
  url?: string;
  image?: string;
  favicon?: string;
  description?: string;
  title?: string;
  body?: string;
  siteName?: string;
  isDeleted: boolean;
  isRead?: boolean;
  createdUser: string;
  createdAt: Date;
  updatedAt: Date;
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
    this.isRead = init.isRead;
    this.createdUser = init.createdUser;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }

  public static create(params: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) {
    return new Page({
      // 本来生成する場所はdomainに書くべきではない
      id: new ObjectId().toString(),
      url: params.url,
      image: params.image,
      favicon: params.favicon,
      description: params.description,
      title: params.title,
      body: params.body,
      siteName: params.siteName,
      isDeleted: params.isDeleted,
      isRead: params.isRead,
      createdUser: params.createdUser,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

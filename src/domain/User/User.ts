import { ObjectId } from 'mongodb';

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */
export class User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(init: User) {
    this.id = init.id;
    this.username = init.username;
    this.email = init.email;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
  }

  public static create(params: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
    return new User({
      // 本来生成する場所はdomainに書くべきではない
      id: new ObjectId().toString(),
      username: params.username,
      email: params.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

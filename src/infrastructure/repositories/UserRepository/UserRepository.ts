import { model, models, Model, Schema, Document } from 'mongoose';
import { IUserRepository } from './IUserRepository';

import { User } from '~/domain/user';

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export class UserRepository implements IUserRepository {
  UserModel: Model<User & Document>;

  constructor() {
    this.UserModel = models.User || model<User & Document>('User', UserSchema);
  }

  private convert(user: User): User {
    return new User({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.UserModel.findById(id);

    if (!user) {
      return null;
    }

    return this.convert(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.UserModel.findOne({ email });

    if (!user) {
      return null;
    }

    return this.convert(user);
  }
}

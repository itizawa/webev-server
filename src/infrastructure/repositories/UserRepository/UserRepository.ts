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

type UserForDB = Omit<User, 'id'> & {
  _id: string;
};
export class UserRepository implements IUserRepository {
  UserModel: Model<User & Document>;

  constructor() {
    this.UserModel = models.User || model<User & Document>('User', UserSchema);
  }

  private convertToDB(user: User): UserForDB {
    return {
      ...user,
      _id: user.id,
    };
  }

  private convertFromDB(user: UserForDB): User {
    return new User({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      createdAt: new Date(user.createdAt),
      updatedAt: new Date(user.updatedAt),
    });
  }

  async create(user: User): Promise<User> {
    return this.convertFromDB(
      await this.UserModel.create(this.convertToDB(user)),
    );
  }

  async findById(id: string): Promise<User> {
    const user = await this.UserModel.findById(id);

    if (!user) {
      return null;
    }

    return this.convertFromDB(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.UserModel.findOne({ email });

    if (!user) {
      return null;
    }

    return this.convertFromDB(user);
  }
}

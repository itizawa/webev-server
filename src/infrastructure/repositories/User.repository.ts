import { Injectable } from '@nestjs/common';
import { IUserRepository } from '~/application/repositories/IUser.repository';
import { User } from '~/domain/user/User';
import { Schema, model, Model } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

const UserSchema = new Schema<User>({
  id: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// export const UserModelSchema = model<UserModel>('users', schema);
// export type UserDocument = User & Document;
// export const CatSchema = SchemaFactory.createForClass(User);
const UserModel = model('User', UserSchema);

@Injectable()
export class UserRepository implements IUserRepository {
  public UserModel: Model<User & Document>;

  constructor() {
    this.UserModel = model<User & Document>('User', UserSchema);
  }
  private readonly users: User[] = [
    {
      id: '1',
      username: 'john',
      password: 'changeme',
    },
    {
      id: '2',
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    // const users = await UserModel.create({
    //   username: 'hoge',
    //   password: 'hoge',
    // });
    console.log('fire');

    const users = await this.UserModel.find();
    console.log(users);

    return this.users.find((user) => user.username === username);
  }
}

import { Injectable } from '@nestjs/common';
import { IUserRepository } from '~/application/repositories/IUser.repository';
import { User } from '~/domain/user/User';

@Injectable()
export class UserRepository implements IUserRepository {
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
    return this.users.find((user) => user.username === username);
  }
}

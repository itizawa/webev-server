import { Injectable } from '@nestjs/common';
import { User } from '~/domain/user/User';

@Injectable()
export abstract class IUserRepository {
  abstract findOne(username: string): Promise<User>;
}

import { User } from '~/domain/User';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
}

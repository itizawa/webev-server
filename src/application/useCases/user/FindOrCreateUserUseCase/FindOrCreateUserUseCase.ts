import { User } from '~/domain/User';
import { IUserRepository } from '~/infrastructure/repositories/UserRepository/IUserRepository';

export class FindOrCreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string, username: string, profileUrl: string) {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      return user;
    }

    return await this.userRepository.create(
      User.create({ username, email, profileUrl }),
    );
  }
}

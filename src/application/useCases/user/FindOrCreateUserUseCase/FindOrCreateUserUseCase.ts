import { User } from '~/domain/User';
import { IUserRepository } from '~/infrastructure/repositories/UserRepository/IUserRepository';

export class FindOrCreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(email: string, username: string) {
    const user = this.userRepository.findByEmail(email);

    if (user) {
      return user;
    }

    const createdUser = User.create({ username, email });
    console.log(15, createdUser);
  }
}

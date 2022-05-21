import { IUserRepository } from '~/infrastructure/repositories/UserRepository/IUserRepository';

export class FindUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(id: string) {
    return this.userRepository.findById(id);
  }
}

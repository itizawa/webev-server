import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from '~/application/repositories/IUser.repository';
import { User } from '~/domain/user/User';

@Injectable()
export class ConnectTestUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  /**
   * テスト
   */
  async execute(): Promise<User> {
    try {
      return await this.userRepository.findOne('john');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

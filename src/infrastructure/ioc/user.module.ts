import { Module } from '@nestjs/common';
import { UserRepository } from '../repositories/User.repository';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UsersModule {}

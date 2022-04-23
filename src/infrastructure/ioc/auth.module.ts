import { Module } from '@nestjs/common';
import { ValidateUserUseCase } from '~/application/useCases/user/ValidateUserUseCase';

import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  providers: [ValidateUserUseCase],
})
export class AuthModule {}

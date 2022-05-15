import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';
import { ValidateUserUseCase } from '~/application/useCases/user/ValidateUserUseCase';
import { IUserRepository } from '~/application/repositories/IUser.repository';
import { UserRepository } from '~/infrastructure/repositories/User.repository';
import { AuthController } from '~/presentation/controllers/auth.controller';
import { LocalStrategy } from '~/middleware/passport/local.strategy';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [
    ValidateUserUseCase,
    LocalStrategy,
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class AuthModule {}

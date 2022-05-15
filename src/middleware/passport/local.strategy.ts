import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserUseCase } from '~/application/useCases/user/ValidateUserUseCase';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUserUseCase: ValidateUserUseCase) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.validateUserUseCase.execute(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

import { Module } from '@nestjs/common';
import { OgpController } from 'src/presentation/controllers/ogp.controller';

import { OgpAdapter } from 'src/infrastructure/adapters/ogp.adapter';
import { IOgpAdapter } from 'src/application/adapters/IOgpAdapter';
import { FetchOgpUseCase } from 'src/application/useCases/ogp/fetchOgp.useCase';
import { ConnectTestUseCase } from '~/application/useCases/ogp/connectTest.useCase';
import { UserRepository } from '../repositories/User.repository';
import { IUserRepository } from '~/application/repositories/IUser.repository';

@Module({
  imports: [],
  controllers: [OgpController],
  providers: [
    FetchOgpUseCase,
    { provide: IOgpAdapter, useClass: OgpAdapter },
    ConnectTestUseCase,
    { provide: IUserRepository, useClass: UserRepository },
  ],
  exports: [],
})
export class OgpModule {}

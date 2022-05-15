import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/ioc/auth.module';
import { OgpModule } from './infrastructure/ioc/ogp.module';

@Module({
  imports: [OgpModule, AuthModule],
})
export class AppModule {}

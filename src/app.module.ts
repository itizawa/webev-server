import { Module } from '@nestjs/common';
import { AuthModule } from './infrastructure/ioc/auth.module';
import { OgpModule } from './infrastructure/ioc/ogp.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    OgpModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost:27017/webev'),
  ],
})
export class AppModule {}

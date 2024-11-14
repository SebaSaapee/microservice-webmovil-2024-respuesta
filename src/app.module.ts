import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RespuestaModule } from './respuesta/respuesta.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env.development'],
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.URI_MONGODB),
  RespuestaModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import {  RespuestaService } from './respuesta.service';

import {  QUESTION, RESPONSE,} from 'src/common/models/models';
import { MongooseModule } from '@nestjs/mongoose';
import {  RespuestaController } from './respuesta.controller';

import { ResponseSchema } from './schema/respuesta.schema';
import { QuestionSchema } from './schema/question.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: RESPONSE.name,
        useFactory: () => ResponseSchema,
      },{
        name: QUESTION.name,
        useFactory: () => QuestionSchema,
      },
    ]),
  ],
  controllers: [RespuestaController],
  providers: [RespuestaService],
})
export class RespuestaModule {}
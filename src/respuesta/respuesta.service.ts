import { Injectable, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RESPONSE, QUESTION } from 'src/common/models/models';

import { RespuestaDTO } from './dto/respuesta.dto';
import { IResponse } from 'src/common/interfaces/respuesta.interface';
import { IQuestion } from 'src/common/interfaces/question.interface';

@Injectable()
export class RespuestaService {
  constructor(
    @InjectModel(RESPONSE.name) private readonly model: Model<IResponse>,
    @InjectModel(QUESTION.name) private readonly questionModel: Model<IQuestion>,
  ) {}

  async create(responseDTO: RespuestaDTO, cuestionarioId: string, userId: string): Promise<IResponse> {
    // Verifica que el cuestionario existe
    const cuestionario = await this.questionModel.findById(cuestionarioId).exec();
    if (!cuestionario) {
      throw new NotFoundException(`Cuestionario con ID ${cuestionarioId} no encontrado`);
    }

    // Asegúrate de que las respuestas sean válidas
    if (!responseDTO.respuestas || responseDTO.respuestas.length === 0) {
      throw new BadRequestException('Las respuestas no pueden estar vacías');
    }

    // Construye el objeto de respuesta con las respuestas seleccionadas
    const respuestas = responseDTO.respuestas.map(respuesta => {
      const pregunta = cuestionario.cuestionario.find(pregunta => pregunta.numero === respuesta.numero);
      if (!pregunta) {
        throw new NotFoundException(`Pregunta con número ${respuesta.numero} no encontrada en el cuestionario`);
      }

      return {
        numero: respuesta.numero,
        respuestaSeleccionada: respuesta.respuestaSeleccionada,
      };
    });

    // Crea una nueva respuesta
    const newResponse = new this.model({
      respuestas: respuestas,
      cuestionario_id: cuestionarioId,
      user_id: userId,
    });

    // Guarda la respuesta
    return await newResponse.save();
}
  async findAll(): Promise<IResponse[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<IResponse> {
    const response = await this.model.findById(id).exec();
    if (!response) {
      throw new NotFoundException(`Response with ID ${id} not found`);
    }
    return response;
  }

  async update(id: string, responseDTO: RespuestaDTO): Promise<IResponse> {
    const updatedResponse = await this.model.findByIdAndUpdate(id, responseDTO, { new: true }).exec();
    if (!updatedResponse) {
      throw new NotFoundException(`Response with ID ${id} not found`);
    }
    return updatedResponse;
  }

  async delete(id: string): Promise<{ status: number, msg: string }> {
    const deletedResponse = await this.model.findByIdAndDelete(id).exec();
    if (!deletedResponse) {
      throw new NotFoundException(`Response with ID ${id} not found`);
    }
    return { status: HttpStatus.OK, msg: 'Deleted' };
  }

  async findByUser(userId: string): Promise<IResponse[]> {
    return await this.model.find({ user_id: userId }).exec();
  }


}

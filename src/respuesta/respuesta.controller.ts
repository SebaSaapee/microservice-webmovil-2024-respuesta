import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RespuestaDTO } from './dto/respuesta.dto';
import { RespuestaService } from './respuesta.service';
import { RespuestaMsg } from 'src/common/constants';

@Controller()
export class RespuestaController {
  private readonly logger = new Logger(RespuestaController.name);

  constructor(private readonly respuestaService: RespuestaService) {}

  @MessagePattern(RespuestaMsg.CREATE)
  async create(
    @Payload() payload: { respuestaDTO: RespuestaDTO; usuarioId: string; cuestionarioId: string },
  ) {
    const { respuestaDTO, usuarioId, cuestionarioId } = payload;

    try {
      // Loguear el payload recibido
      this.logger.log(`Recibido payload para crear respuesta: ${JSON.stringify(payload)}`);

      // Crear la respuesta utilizando el servicio
      const createdRespuesta = await this.respuestaService.create(respuestaDTO, cuestionarioId, usuarioId);

      // Retornar la respuesta exitosa
      return {
        message: 'Respuesta creada con éxito',
        respuesta: createdRespuesta,
      };
    } catch (error) {
      // Loguear cualquier error ocurrido
      this.logger.error(`Error al crear la respuesta: ${error.message}`);
      throw error;
    }
  }

  @MessagePattern(RespuestaMsg.FIND_ALL)
  async findAll() {
    this.logger.log('Solicitando todas las respuestas');
    return await this.respuestaService.findAll();
  }

  @MessagePattern(RespuestaMsg.FIND_ONE)
  async findOne(@Payload() id: string) {
    this.logger.log(`Buscando respuesta con ID: ${id}`);
    return await this.respuestaService.findOne(id);
  }

  @MessagePattern(RespuestaMsg.UPDATE)
  async update(@Payload() payload: { id: string; respuestaDTO: RespuestaDTO }) {
    const { id, respuestaDTO } = payload;

    try {
      this.logger.log(`Actualizando respuesta con ID: ${id}`);
      const updatedResponse = await this.respuestaService.update(id, respuestaDTO);

      return {
        message: 'Respuesta actualizada con éxito',
        respuesta: updatedResponse,
      };
    } catch (error) {
      this.logger.error(`Error al actualizar la respuesta: ${error.message}`);
      throw error;
    }
  }

  @MessagePattern(RespuestaMsg.DELETE)
  async delete(@Payload() id: string) {
    try {
      this.logger.log(`Eliminando respuesta con ID: ${id}`);
      const result = await this.respuestaService.delete(id);

      return {
        message: 'Respuesta eliminada con éxito',
        ...result,
      };
    } catch (error) {
      this.logger.error(`Error al eliminar la respuesta: ${error.message}`);
      throw error;
    }
  }

  @MessagePattern(RespuestaMsg.FIND_BY_USER)
  async findByUser(@Payload() userId: string) {
    this.logger.log(`Buscando respuestas para el usuario con ID: ${userId}`);
    return await this.respuestaService.findByUser(userId);
  }
}
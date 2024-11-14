import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RespuestaDTO } from './dto/respuesta.dto';
import { RespuestaService } from './respuesta.service';
import { RespuestaMsg } from 'src/common/constants'; // Asegúrate de tener este import correcto

@Controller()
export class RespuestaController {
  private readonly logger = new Logger(RespuestaController.name);
  constructor(private readonly respuestaService: RespuestaService) {}

  @MessagePattern(RespuestaMsg.CREATE)
  async create(@Payload() payload: { respuestaDTO: RespuestaDTO, usuarioId: string, cuestionarioId: string }) {
    const { respuestaDTO, usuarioId, cuestionarioId } = payload;

    try {
      // Verifica que el payload esté correctamente recibido y loguea la información si es necesario
      this.logger.log(`Recibido payload: ${JSON.stringify(payload)}`);

      // Llamamos al servicio para crear la respuesta
      const createdRespuesta = await this.respuestaService.create(respuestaDTO, cuestionarioId, usuarioId);

      // Retornamos la respuesta exitosa
      return { message: 'Respuesta created successfully', respuesta: createdRespuesta };
    } catch (error) {
      // En caso de error, logueamos el mensaje y lanzamos una excepción
      this.logger.error(`Error creating respuesta: ${error.message}`);
      throw error;
    }
  }

  @MessagePattern(RespuestaMsg.FIND_ALL)
  async findAll() {
    return await this.respuestaService.findAll();
  }

  @MessagePattern(RespuestaMsg.FIND_ONE)
  async findOne(@Payload() id: string) {
    return await this.respuestaService.findOne(id);
  }

  @MessagePattern(RespuestaMsg.UPDATE)
  async update(@Payload() payload: any) {
    const { id, respuestaDTO } = payload;
    return await this.respuestaService.update(id, respuestaDTO);
  }

  @MessagePattern(RespuestaMsg.DELETE)
  async delete(@Payload() id: string) {
    return await this.respuestaService.delete(id);
  }
  
  @MessagePattern(RespuestaMsg.FIND_BY_USER)
  async findByUser(@Payload() userId: string) {
    return await this.respuestaService.findByUser(userId);
  }
}
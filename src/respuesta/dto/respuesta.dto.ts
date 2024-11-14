

export class RespuestaDTO {
  readonly user_id: string; // ID del usuario que responde el cuestionario
  readonly cuestionario_id: string; // ID del cuestionario respondido
  readonly respuestas: RespuestaPreguntaDTO[]; // Array de respuestas de las preguntas
}

export class RespuestaPreguntaDTO {
  readonly numero: number; // Número de la pregunta correspondiente
  readonly respuestaSeleccionada: string; // Respuesta del usuario (la opción elegida)
}
export class RespuestaDTO {
  readonly user_id: string; // ID del usuario que responde el cuestionario
  readonly cuestionario_id: string; // ID del cuestionario respondido
  readonly respuestas: RespuestaPreguntaDTO[]; // Array de respuestas de las preguntas
  readonly patente: string; // Patente del vehículo utilizado
  readonly fecha_respuesta: Date; // Fecha en que se respondió el cuestionario
  readonly foto: string; 
  readonly geolocalizacion: {
    latitud: number; // Latitud de la ubicación
    longitud: number; // Longitud de la ubicación
  }; // Geolocalización al momento de responder
}

export class RespuestaPreguntaDTO {
  readonly numero: number; // Número de la pregunta correspondiente
  readonly respuestaSeleccionada: string; // Respuesta del usuario (la opción elegida)
}
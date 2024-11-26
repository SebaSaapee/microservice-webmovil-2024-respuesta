
export interface IAnswer {
    numero: number; // Número de la pregunta dentro del cuestionario
    respuestaSeleccionada: string; // Respuesta seleccionada por el usuario
  }
  
  export interface IResponse extends Document {
    cuestionario_id: string; // ID del cuestionario al que pertenece la respuesta
    user_id: string; // ID del usuario que respondió el cuestionario
    respuestas: IAnswer[]; // Array de respuestas para cada pregunta
    patente: string; // Patente del vehículo utilizado al responder
    fecha_respuesta: Date; // Fecha y hora en que se respondió el cuestionario
    geolocalizacion: {
      latitud: number; // Latitud de la ubicación
      longitud: number; // Longitud de la ubicación
    }; // Geolocalización al momento de responder
  }
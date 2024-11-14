
export interface IAnswer {
    numero: number; // Número de la pregunta dentro del cuestionario
    respuestaSeleccionada: string; // Respuesta seleccionada por el usuario
   
}

export interface IResponse extends Document {
    cuestionario_id: string; // ID del cuestionario al que pertenece la respuesta
    user_id: string; // ID del usuario que respondió el cuestionario
    respuestas: IAnswer[]; // Array de respuestas para cada pregunta
}
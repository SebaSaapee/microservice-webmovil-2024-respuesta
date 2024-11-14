import * as mongoose from 'mongoose';

// Esquema para almacenar la respuesta a una pregunta específica
export const RespuestaPreguntaSchema = new mongoose.Schema(
    {
        numero: { type: Number, required: true }, // Número de la pregunta correspondiente
        respuestaSeleccionada: { type: String, required: true }, // Respuesta seleccionada por el usuario
    },
    { _id: false } // No necesita un _id separado para cada respuesta
);

// Esquema principal para las respuestas del cuestionario
export const ResponseSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario que responde el cuestionario
        cuestionario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }, // Referencia al cuestionario que está siendo respondido
        respuestas: [RespuestaPreguntaSchema], // Array de respuestas a las preguntas del cuestionario
    },
    { timestamps: true } // Añade createdAt y updatedAt
);


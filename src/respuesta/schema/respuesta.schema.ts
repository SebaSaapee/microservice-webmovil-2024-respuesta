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
        respuestas: [RespuestaPreguntaSchema],
        patente: { type: String, required: true }, // Patente del vehículo
        fecha_respuesta: { type: Date, default: Date.now }, // Fecha en la que se responde el cuestionario
        foto:{ type: String, required: false },
        geolocalizacion: {
            latitud: { type: Number, required: true }, // Latitud de la ubicación
            longitud: { type: Number, required: true }, // Longitud de la ubicación // Array de respuestas a las preguntas del cuestionario
    }},
    { timestamps: true } // Añade createdAt y updatedAt
);


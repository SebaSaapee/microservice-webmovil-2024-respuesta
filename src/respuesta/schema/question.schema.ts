import * as mongoose from 'mongoose';

// Esquema para las preguntas de tipo alternativa dentro de un cuestionario
export const PreguntaSchema = new mongoose.Schema(
    {
        numero: { type: Number, required: true }, // Número de la pregunta
        pregunta: { type: String, required: true },
        tipo: { type: String, enum: ['multiple'], default: 'multiple', required: true }, // Solo tipo 'multiple'
        opciones: [{ type: String, required: true }], // Opciones para preguntas de tipo 'multiple'
        
    },
    { _id: false } // No se necesita un _id separado para cada pregunta
);

// Esquema principal para los cuestionarios
export const QuestionSchema = new mongoose.Schema(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String, required: true },
        fotos: [{ type: String }],
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al modelo User
        cuestionario: [PreguntaSchema], // Array de preguntas de tipo alternativa
    },
    { timestamps: true } // Añade createdAt y updatedAt
);
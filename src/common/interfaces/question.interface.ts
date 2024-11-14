
import { Document } from 'mongoose';

export interface IPregunta {
    numero: number; // Número de la pregunta
    pregunta: string; // El texto de la pregunta
    tipo: 'multiple'; // Solo permite preguntas de tipo 'multiple'
    opciones: string[]; // Contiene las opciones de respuesta

}

export interface IQuestion extends Document {
    nombre: string; // Nombre del cuestionario
    descripcion: string; // Descripción del cuestionario
    fotos: string[]; // Array de URLs de las fotos
    user_id: string; // ID del usuario que creó el cuestionario
    cuestionario: IPregunta[]; // Array de preguntas de tipo alternativa
}
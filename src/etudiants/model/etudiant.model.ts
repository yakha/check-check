import * as mongoose from 'mongoose';

export const EtudiantSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    student_card: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    qr_code: {
        type: Object,
        default: null
    },
});

export interface Etudiant extends mongoose.Document {
    student_card: string;
    first_name: string;
    last_name: string;
    qr_code: string;
    password: string;
  }
  

export const EtudiantModel = mongoose.model<Etudiant>('Etudiant', EtudiantSchema);
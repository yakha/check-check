import * as mongoose from 'mongoose';

export const SessionSchema = new mongoose.Schema({
    student_card: {
        type: String,
        required: true,
        unique: true
    },
    date_creation: {
        type: Date,
        required: true
    }
});

export interface Session extends mongoose.Document {
    student_card: string;
    date_creation: Date;
  }
  

export const SessionModel = mongoose.model<Session>('Session', SessionSchema);
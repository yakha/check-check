import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Etudiant } from './model/etudiant.model';
import { Session } from './model/session.model';

@Injectable()
export class EtudiantsService {
  constructor(
    @InjectModel('Etudiant') private readonly etudiantModel: Model<Etudiant>,
    @InjectModel('Session') private readonly sessionModel: Model<Session>,
    ) {}

  async register(createEtudiant: Etudiant) {
    let etudiant:Etudiant = await this.etudiantModel.findOne({student_card: createEtudiant.student_card})
    if(etudiant)
      return 'this student is already registered';
    const newEtudiant = new this.etudiantModel(createEtudiant);
    await newEtudiant.save();
    return newEtudiant;
  }

  async login(createEtudiant: Etudiant) {
    let etudiant:Etudiant = await this.etudiantModel.findOne({student_card: createEtudiant.student_card})
    if(!etudiant){
      return `student doesn't registered`;
    }
    if(etudiant.password != createEtudiant.password)
      return 'password incorrect';
    let session:Session = await this.sessionModel.findOne({student_card: createEtudiant.student_card})
    if(session)
      return 'student already connected';
    etudiant.qr_code = createEtudiant.qr_code;
    await this.etudiantModel.updateOne({student_card: etudiant.student_card}, etudiant)
    const createSession = {
      'student_card': etudiant.student_card,
      'date_creation': new Date()
    };
    const newSession = new this.sessionModel(createSession);
    await newSession.save();
    return etudiant;
  }

  async logout(student_card: string){
    const resp = await this.sessionModel.deleteOne({student_card: student_card})
    if(resp.deletedCount == 0)
        return 'student not connected';
    return 'student log out';
  }
  
}

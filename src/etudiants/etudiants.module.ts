import { Module } from '@nestjs/common';
import { EtudiantsService } from './etudiants.service';
import { EtudiantsController } from './etudiants.controller';
import { EtudiantModel } from './model/etudiant.model';
import { SessionModel } from './model/session.model';

@Module({
  controllers: [EtudiantsController],
  providers: [
    EtudiantsService,
    { provide: 'EtudiantModel', useValue: EtudiantModel },
    { provide: 'SessionModel', useValue: SessionModel }
  ]
})
export class EtudiantsModule {}

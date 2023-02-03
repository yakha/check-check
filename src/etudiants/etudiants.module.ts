import { Module } from '@nestjs/common';
import { EtudiantsService } from './etudiants.service';
import { EtudiantsController } from './etudiants.controller';
import { EtudiantModel } from './dto/etudiant.model';
import { SessionModel } from './dto/session.model';

@Module({
  controllers: [EtudiantsController],
  providers: [
    EtudiantsService,
    { provide: 'EtudiantModel', useValue: EtudiantModel },
    { provide: 'SessionModel', useValue: SessionModel }
  ]
})
export class EtudiantsModule {}

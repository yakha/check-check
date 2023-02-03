import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EtudiantsService } from './etudiants.service';
import { Etudiant } from './model/etudiant.model';

@Controller('etudiants')
export class EtudiantsController {
  constructor(private readonly etudiantsService: EtudiantsService) {}

  @Post('register')
  async register(@Body() createEtudiant: Etudiant) {
    return this.etudiantsService.register(createEtudiant);
  }

  @Post('login')
  async login(@Body() createEtudiant: Etudiant) {
    return this.etudiantsService.login(createEtudiant);
  }

  @Get('logout/:student_card')
  async logout(@Param('student_card') student_card: string) {
    return this.etudiantsService.logout(student_card);
  }

}

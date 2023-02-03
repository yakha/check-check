import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EtudiantsModule } from './etudiants/etudiants.module';
import { MongooseModule } from './mongoose/mongoose.module';

@Module({
  imports: [ConfigModule.forRoot(), EtudiantsModule, MongooseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

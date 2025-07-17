import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Curso } from './entities/curso.model';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';

@Module({
  imports: [SequelizeModule.forFeature([Curso])],
  controllers: [CursoController],
  providers: [CursoService],
})
export class CursoModule {}


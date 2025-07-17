import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AlunoCursoService } from './aluno-curso.service';
import { AlunoCursoController } from './aluno-curso.controller';
import { AlunoCurso } from './entities/aluno-curso.model';

@Module({
  imports: [SequelizeModule.forFeature([AlunoCurso])],
  controllers: [AlunoCursoController],
  providers: [AlunoCursoService],
})
export class AlunoCursoModule {}



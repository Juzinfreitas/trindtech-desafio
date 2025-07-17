import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Aluno } from './entities/aluno.model';
import { AlunoCurso } from '../alunoCurso/entities/aluno-curso.model';  // importe o model
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Aluno, AlunoCurso])  // inclua AlunoCurso aqui
  ],
  providers: [AlunoService],
  controllers: [AlunoController],
})
export class AlunoModule {}


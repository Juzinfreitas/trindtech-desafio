import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AlunoModule } from './aluno/aluno.module';
import { CursoModule } from './curso/curso.module';
import { AlunoCursoModule } from './alunoCurso/aluno-curso.module';
import { Aluno } from './aluno/entities/aluno.model';
import { Curso } from './curso/entities/curso.model';
import { AlunoCurso } from './alunoCurso/entities/aluno-curso.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'trindtech',
      models: [Aluno, Curso, AlunoCurso],
      autoLoadModels: true,
      synchronize: true,
      sync: {
        alter: true, 
        force: false, 
      },
    }),
    AlunoModule,
    CursoModule,
    AlunoCursoModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AlunoModule } from './aluno/aluno.module';
import { Aluno } from './aluno/entities/aluno.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'trindtech',
      models: [Aluno],
      autoLoadModels: true,
      synchronize: true,
      sync: {
        alter: true,
        force: false,
      },
    }),
    AlunoModule,
  ],
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Aluno } from './entities/aluno.model';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Aluno])  
  ],
  providers: [AlunoService],
  controllers: [AlunoController],
})
export class AlunoModule {}
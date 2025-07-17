// src/aluno/dto/vincular-curso.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class VincularCursoDto {
  @IsNotEmpty()
  @IsNumber()
  cursoId: number;
}

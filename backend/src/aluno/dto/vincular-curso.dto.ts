import { IsNotEmpty, IsNumber } from 'class-validator';

export class VincularCursoDto {
  @IsNotEmpty()
  @IsNumber()
  cursoId: number;
}

// src/aluno/dto/create-aluno.dto.ts
import { IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class CreateAlunoDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  nome: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsString()
  cidade?: string;

  @IsOptional()
  @IsString()
  logradouro?: string;
}

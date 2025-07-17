export class CreateAlunoCursoDto {
  alunoId: number;
  cursoId: number;
  status: 'andamento' | 'concluido';
  dataConclusao?: Date;
}


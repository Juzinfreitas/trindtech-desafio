import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { Aluno } from 'src/aluno/entities/aluno.model';
import { Curso } from 'src/curso/entities/curso.model';

@Table
export class AlunoCurso extends Model {
  @ForeignKey(() => Aluno)
  @Column
  alunoId: number;

  @ForeignKey(() => Curso)
  @Column
  cursoId: number;

  @Column({ type: DataType.ENUM('andamento', 'concluido') })
  status: 'andamento' | 'concluido';

  @Column({ type: DataType.DATE, allowNull: true })
  dataConclusao: Date;

  @BelongsTo(() => Aluno)
  aluno: Aluno;

  @BelongsTo(() => Curso)
  curso: Curso;
}

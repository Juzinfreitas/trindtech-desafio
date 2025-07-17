import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { AlunoCurso } from 'src/alunoCurso/entities/aluno-curso.model';

@Table
export class Curso extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  nome: string;

  @Column({ type: DataType.STRING })
  descricao: string;

  @HasMany(() => AlunoCurso)
  alunos: AlunoCurso[];
}

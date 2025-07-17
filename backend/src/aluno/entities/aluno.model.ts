import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { AlunoCurso } from 'src/alunoCurso/entities/aluno-curso.model';

@Table
export class Aluno extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  nome: string;

  @Column({ type: DataType.STRING })
  cep: string;

  @Column({ type: DataType.STRING })
  estado: string;

  @Column({ type: DataType.STRING })
  cidade: string;

  @Column({ type: DataType.STRING })
  logradouro: string;

  @HasMany(() => AlunoCurso)
  cursos: AlunoCurso[];
}

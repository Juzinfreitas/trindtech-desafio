import { Table, Column, Model, DataType,} from 'sequelize-typescript';

@Table
export class Aluno extends Model {

  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  nome: string;

  @Column({ type: DataType.STRING })
  sobrenome: string;

  @Column({ type: DataType.STRING })
  email: string;

  @Column({ type: DataType.DATEONLY })
  dataNascimento: string;

  @Column({ type: DataType.STRING })
  cpf: string;

  @Column({ type: DataType.STRING })
  genero: string;

  @Column({ type: DataType.STRING })
  cep: string;

  @Column({ type: DataType.STRING })
  estado: string;

  @Column({ type: DataType.STRING })
  cidade: string;

  @Column({ type: DataType.STRING })
  logradouro: string;

  @Column({ type: DataType.STRING })
  numero: string;

  @Column({ type: DataType.STRING })
  bairro: string;

  @Column({ type: DataType.STRING })
  complemento: string;

  @Column({ type: DataType.STRING })
  pais: string;

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  cursosConcluidos: { nome: string; dataConclusao: string }[];

  @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
  cursosEmAndamento: { nome: string; dataConclusao: string }[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: [],
  })
  cursos: string[];
}
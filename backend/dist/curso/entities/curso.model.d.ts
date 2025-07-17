import { Model } from 'sequelize-typescript';
import { AlunoCurso } from 'src/alunoCurso/entities/aluno-curso.model';
export declare class Curso extends Model {
    nome: string;
    descricao: string;
    alunos: AlunoCurso[];
}

import { Model } from 'sequelize-typescript';
import { AlunoCurso } from 'src/alunoCurso/entities/aluno-curso.model';
export declare class Aluno extends Model {
    nome: string;
    cep: string;
    estado: string;
    cidade: string;
    logradouro: string;
    cursos: AlunoCurso[];
}

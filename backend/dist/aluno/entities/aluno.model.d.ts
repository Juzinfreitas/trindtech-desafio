import { Model } from 'sequelize-typescript';
import { AlunoCurso } from 'src/alunoCurso/entities/aluno-curso.model';
export declare class Aluno extends Model {
    nome: string;
    sobrenome: string;
    email: string;
    dataNascimento: string;
    cpf: string;
    genero: string;
    cep: string;
    estado: string;
    cidade: string;
    logradouro: string;
    numero: string;
    bairro: string;
    complemento: string;
    pais: string;
    cursos: AlunoCurso[];
}

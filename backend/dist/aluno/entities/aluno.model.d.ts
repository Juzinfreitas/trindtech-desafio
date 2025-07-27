import { Model } from 'sequelize-typescript';
export declare class Aluno extends Model {
    id: number;
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
    cursosConcluidos: {
        nome: string;
        dataConclusao: string;
    }[];
    cursosEmAndamento: {
        nome: string;
        dataConclusao: string;
    }[];
    cursos: string[];
}

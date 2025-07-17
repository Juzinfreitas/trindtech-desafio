import { Model } from 'sequelize-typescript';
import { Aluno } from 'src/aluno/entities/aluno.model';
import { Curso } from 'src/curso/entities/curso.model';
export declare class AlunoCurso extends Model {
    alunoId: number;
    cursoId: number;
    status: 'andamento' | 'concluido';
    dataConclusao: Date;
    aluno: Aluno;
    curso: Curso;
}

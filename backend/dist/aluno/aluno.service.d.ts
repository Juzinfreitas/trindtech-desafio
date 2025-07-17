import { Aluno } from './entities/aluno.model';
import { AlunoCurso } from 'src/alunoCurso/entities/aluno-curso.model';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
export declare class AlunoService {
    private alunoModel;
    private alunoCursoModel;
    constructor(alunoModel: typeof Aluno, alunoCursoModel: typeof AlunoCurso);
    findAll(page?: number, limit?: number): Promise<{
        rows: Aluno[];
        count: number;
    }>;
    findOne(id: number): Promise<Aluno>;
    create(data: CreateAlunoDto): Promise<Aluno>;
    update(id: number, data: UpdateAlunoDto): Promise<Aluno>;
    remove(id: number): Promise<void>;
    vincularCurso(alunoId: number, cursoId: number): Promise<Aluno>;
    desvincularCurso(alunoId: number, cursoId: number): Promise<Aluno>;
}

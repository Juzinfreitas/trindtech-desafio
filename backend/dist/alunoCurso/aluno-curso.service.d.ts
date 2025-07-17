import { AlunoCurso } from './entities/aluno-curso.model';
import { CreateAlunoCursoDto } from './dto/create-aluno-curso.dto';
import { UpdateAlunoCursoDto } from './dto/update-aluno-curso.dto';
export declare class AlunoCursoService {
    private alunoCursoModel;
    constructor(alunoCursoModel: typeof AlunoCurso);
    vincular(dto: CreateAlunoCursoDto): Promise<AlunoCurso>;
    listarPorAluno(alunoId: number): Promise<AlunoCurso[]>;
    atualizarStatus(id: number, dto: UpdateAlunoCursoDto): Promise<AlunoCurso>;
    remover(id: number): Promise<void>;
}

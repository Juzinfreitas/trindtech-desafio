import { AlunoCursoService } from './aluno-curso.service';
import { CreateAlunoCursoDto } from './dto/create-aluno-curso.dto';
import { UpdateAlunoCursoDto } from './dto/update-aluno-curso.dto';
export declare class AlunoCursoController {
    private readonly service;
    constructor(service: AlunoCursoService);
    vincular(dto: CreateAlunoCursoDto): Promise<import("./entities/aluno-curso.model").AlunoCurso>;
    listarCursosDoAluno(alunoId: string): Promise<import("./entities/aluno-curso.model").AlunoCurso[]>;
    atualizarStatus(id: string, dto: UpdateAlunoCursoDto): Promise<import("./entities/aluno-curso.model").AlunoCurso>;
    remover(id: string): Promise<void>;
}

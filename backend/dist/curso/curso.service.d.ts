import { Curso } from './entities/curso.model';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
export declare class CursoService {
    private cursoModel;
    constructor(cursoModel: typeof Curso);
    create(data: CreateCursoDto): Promise<Curso>;
    findAll(): Promise<Curso[]>;
    findOne(id: number): Promise<Curso>;
    update(id: number, data: UpdateCursoDto): Promise<Curso>;
    remove(id: number): Promise<void>;
}

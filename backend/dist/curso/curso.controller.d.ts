import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
export declare class CursoController {
    private readonly cursoService;
    constructor(cursoService: CursoService);
    create(data: CreateCursoDto): Promise<import("./entities/curso.model").Curso>;
    findAll(): Promise<import("./entities/curso.model").Curso[]>;
    findOne(id: string): Promise<import("./entities/curso.model").Curso>;
    update(id: string, data: UpdateCursoDto): Promise<import("./entities/curso.model").Curso>;
    remove(id: string): Promise<void>;
}

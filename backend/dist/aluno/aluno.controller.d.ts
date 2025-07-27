import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
export declare class AlunoController {
    private readonly alunoService;
    constructor(alunoService: AlunoService);
    findAll(page?: string, limit?: string): Promise<{
        rows: import("./entities/aluno.model").Aluno[];
        totalCount: number;
    }>;
    findOne(id: number): Promise<import("./entities/aluno.model").Aluno>;
    create(createAlunoDto: CreateAlunoDto): Promise<import("./entities/aluno.model").Aluno>;
    update(id: number, updateAlunoDto: UpdateAlunoDto): Promise<import("./entities/aluno.model").Aluno>;
    remove(id: number): Promise<void>;
}

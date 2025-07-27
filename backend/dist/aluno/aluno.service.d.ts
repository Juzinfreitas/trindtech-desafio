import { Aluno } from './../aluno/entities/aluno.model';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
export declare class AlunoService {
    private alunoModel;
    constructor(alunoModel: typeof Aluno);
    findAll(page?: number, limit?: number): Promise<{
        rows: Aluno[];
        totalCount: number;
    }>;
    findOne(id: number): Promise<Aluno>;
    create(data: CreateAlunoDto): Promise<Aluno>;
    update(id: number, data: UpdateAlunoDto): Promise<Aluno>;
    remove(id: number): Promise<void>;
}

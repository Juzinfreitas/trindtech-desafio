import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Aluno } from './entities/aluno.model';
import { AlunoCurso } from 'src/alunoCurso/entities/aluno-curso.model';
import { Curso } from 'src/curso/entities/curso.model';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunoService {
  constructor(
    @InjectModel(Aluno) private alunoModel: typeof Aluno,
    @InjectModel(AlunoCurso) private alunoCursoModel: typeof AlunoCurso,
  ) {}

  async findAll(
    page = 1,
    limit = 10,
  ): Promise<{ rows: Aluno[]; count: number }> {
    const offset = (page - 1) * limit;
    return this.alunoModel.findAndCountAll({
      offset,
      limit,
      include: [
        {
          model: AlunoCurso,
          include: [Curso],
        },
      ],
    });
  }

  async findOne(id: number): Promise<Aluno> {
    const aluno = await this.alunoModel.findByPk(id, {
      include: [
        {
          model: AlunoCurso,
          include: [Curso],
        },
      ],
    });
    if (!aluno) throw new NotFoundException('Aluno não encontrado');
    return aluno;
  }

  async create(data: CreateAlunoDto): Promise<Aluno> {
    return this.alunoModel.create({ ...data });
  }

  async update(id: number, data: UpdateAlunoDto): Promise<Aluno> {
    const aluno = await this.findOne(id);
    return aluno.update(data);
  }

  async remove(id: number): Promise<void> {
    const aluno = await this.findOne(id);
    await aluno.destroy();
  }

  async vincularCurso(alunoId: number, cursoId: number): Promise<Aluno> {
    await this.alunoCursoModel.findOrCreate({
      where: { alunoId, cursoId },
      defaults: { status: 'andamento' },
    });
    return this.findOne(alunoId);
  }

  async desvincularCurso(alunoId: number, cursoId: number): Promise<Aluno> {
    await this.alunoCursoModel.destroy({ where: { alunoId, cursoId } });
    return this.findOne(alunoId);
  }
}

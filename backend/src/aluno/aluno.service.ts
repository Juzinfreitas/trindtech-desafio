import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Aluno } from './../aluno/entities/aluno.model';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Op } from 'sequelize';

@Injectable()
export class AlunoService {
  constructor(
    @InjectModel(Aluno) private alunoModel: typeof Aluno,
  ) {}

  async findAll(page = 1, limit = 10, filtro?: string): Promise<{ rows: Aluno[]; totalCount: number }> {
    const offset = (page - 1) * limit;
     const where: any = {};

      if (filtro) {
      where[Op.or] = [
        { nome: { [Op.iLike]: `%${filtro}%` } },
        { sobrenome: { [Op.iLike]: `%${filtro}%` } }
      ];
    }
    const { rows, count } = await this.alunoModel.findAndCountAll({
      where,
      offset,
      limit,
    });
    return { rows,totalCount: count };
  }

  async findOne(id: number): Promise<Aluno> {
    const aluno = await this.alunoModel.findByPk(id);
    if (!aluno) {
      throw new NotFoundException('Aluno não encontrado');
    }
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
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Curso } from './entities/curso.model';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursoService {
  constructor(@InjectModel(Curso) private cursoModel: typeof Curso) {}

  async create(data: CreateCursoDto): Promise<Curso> {
    return this.cursoModel.create(data as any);
}

  async findAll(): Promise<Curso[]> {
    return this.cursoModel.findAll();
  }

  async findOne(id: number): Promise<Curso> {
    const curso = await this.cursoModel.findByPk(id);
    if (!curso) throw new NotFoundException('Curso não encontrado');
    return curso;
  }

  async update(id: number, data: UpdateCursoDto): Promise<Curso> {
    const curso = await this.findOne(id);
    return curso.update(data);
  }

  async remove(id: number): Promise<void> {
    const curso = await this.findOne(id);
    await curso.destroy();
  }
}

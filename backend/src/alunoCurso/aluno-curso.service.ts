import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AlunoCurso } from './entities/aluno-curso.model';
import { CreateAlunoCursoDto } from './dto/create-aluno-curso.dto';
import { UpdateAlunoCursoDto } from './dto/update-aluno-curso.dto';

@Injectable()
export class AlunoCursoService {
  constructor(
    @InjectModel(AlunoCurso)
    private alunoCursoModel: typeof AlunoCurso,
  ) {}

  async vincular(dto: CreateAlunoCursoDto): Promise<AlunoCurso> {
    return this.alunoCursoModel.create(dto as any);
  }

  async listarPorAluno(alunoId: number): Promise<AlunoCurso[]> {
    return this.alunoCursoModel.findAll({ where: { alunoId } });
  }

  async atualizarStatus(id: number, dto: UpdateAlunoCursoDto): Promise<AlunoCurso> {
    const registro = await this.alunoCursoModel.findByPk(id);
    if (!registro) throw new NotFoundException('Vínculo não encontrado');
    return registro.update(dto);
  }

  async remover(id: number): Promise<void> {
    const registro = await this.alunoCursoModel.findByPk(id);
    if (!registro) throw new NotFoundException('Vínculo não encontrado');
    await registro.destroy();
  }
}

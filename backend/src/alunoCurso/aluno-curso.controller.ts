import { Controller, Post, Get, Body, Param, Delete, Put } from '@nestjs/common';
import { AlunoCursoService } from './aluno-curso.service';
import { CreateAlunoCursoDto } from './dto/create-aluno-curso.dto';
import { UpdateAlunoCursoDto } from './dto/update-aluno-curso.dto';

@Controller('aluno-curso')
export class AlunoCursoController {
  constructor(private readonly service: AlunoCursoService) {}

  @Post()
  vincular(@Body() dto: CreateAlunoCursoDto) {
    return this.service.vincular(dto);
  }

  @Get('aluno/:id')
  listarCursosDoAluno(@Param('id') alunoId: string) {
    return this.service.listarPorAluno(+alunoId);
  }

  @Put(':id')
  atualizarStatus(@Param('id') id: string, @Body() dto: UpdateAlunoCursoDto) {
    return this.service.atualizarStatus(+id, dto);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.service.remover(+id);
  }
}


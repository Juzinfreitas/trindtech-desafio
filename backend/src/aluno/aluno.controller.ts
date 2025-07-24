import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { VincularCursoDto } from './dto/vincular-curso.dto';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Get()
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNumber = page ? parseInt(page) : 1;
    const limitNumber = limit ? parseInt(limit) : 10;
    return this.alunoService.findAll(pageNumber, limitNumber);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.alunoService.findOne(id);
  }

  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlunoDto: UpdateAlunoDto,
  ) {
    return this.alunoService.update(id, updateAlunoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.alunoService.remove(id);
  }

  @Post(':id/vincular-curso')
  vincularCurso(
    @Param('id', ParseIntPipe) alunoId: number,
    @Body() vincularCursoDto: VincularCursoDto,
  ) {
    return this.alunoService.vincularCurso(alunoId, vincularCursoDto.cursoId);
  }

  @Delete(':id/desvincular-curso/:cursoId')
  desvincularCurso(
    @Param('id', ParseIntPipe) alunoId: number,
    @Param('cursoId', ParseIntPipe) cursoId: number,
  ) {
    return this.alunoService.desvincularCurso(alunoId, cursoId);
  }
}
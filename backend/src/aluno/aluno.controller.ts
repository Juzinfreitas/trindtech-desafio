import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Get()
  async findAll(
  @Query('page') page?: string, 
  @Query('limit') limit?: string,
  @Query('filtro') filtro?: string
) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 10;
    return this.alunoService.findAll(pageNumber, limitNumber, filtro);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.alunoService.findOne(id);
}
  @Post()
  async create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAlunoDto: UpdateAlunoDto,
  ) {
    return this.alunoService.update(id, updateAlunoDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.alunoService.remove(id);
  }
}
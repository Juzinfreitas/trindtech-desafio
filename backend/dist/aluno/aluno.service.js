"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const aluno_model_1 = require("./entities/aluno.model");
const aluno_curso_model_1 = require("../alunoCurso/entities/aluno-curso.model");
const curso_model_1 = require("../curso/entities/curso.model");
let AlunoService = class AlunoService {
    alunoModel;
    alunoCursoModel;
    constructor(alunoModel, alunoCursoModel) {
        this.alunoModel = alunoModel;
        this.alunoCursoModel = alunoCursoModel;
    }
    async findAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        return this.alunoModel.findAndCountAll({
            offset,
            limit,
            include: [
                {
                    model: aluno_curso_model_1.AlunoCurso,
                    include: [curso_model_1.Curso],
                },
            ],
        });
    }
    async findOne(id) {
        const aluno = await this.alunoModel.findByPk(id, {
            include: [
                {
                    model: aluno_curso_model_1.AlunoCurso,
                    include: [curso_model_1.Curso],
                },
            ],
        });
        if (!aluno)
            throw new common_1.NotFoundException('Aluno não encontrado');
        return aluno;
    }
    async create(data) {
        return this.alunoModel.create({ ...data });
    }
    async update(id, data) {
        const aluno = await this.findOne(id);
        return aluno.update(data);
    }
    async remove(id) {
        const aluno = await this.findOne(id);
        await aluno.destroy();
    }
    async vincularCurso(alunoId, cursoId) {
        await this.alunoCursoModel.findOrCreate({
            where: { alunoId, cursoId },
            defaults: { status: 'andamento' },
        });
        return this.findOne(alunoId);
    }
    async desvincularCurso(alunoId, cursoId) {
        await this.alunoCursoModel.destroy({ where: { alunoId, cursoId } });
        return this.findOne(alunoId);
    }
};
exports.AlunoService = AlunoService;
exports.AlunoService = AlunoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(aluno_model_1.Aluno)),
    __param(1, (0, sequelize_1.InjectModel)(aluno_curso_model_1.AlunoCurso)),
    __metadata("design:paramtypes", [Object, Object])
], AlunoService);
//# sourceMappingURL=aluno.service.js.map
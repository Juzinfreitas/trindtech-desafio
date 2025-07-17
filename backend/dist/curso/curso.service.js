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
exports.CursoService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const curso_model_1 = require("./entities/curso.model");
let CursoService = class CursoService {
    cursoModel;
    constructor(cursoModel) {
        this.cursoModel = cursoModel;
    }
    async create(data) {
        return this.cursoModel.create(data);
    }
    async findAll() {
        return this.cursoModel.findAll();
    }
    async findOne(id) {
        const curso = await this.cursoModel.findByPk(id);
        if (!curso)
            throw new common_1.NotFoundException('Curso não encontrado');
        return curso;
    }
    async update(id, data) {
        const curso = await this.findOne(id);
        return curso.update(data);
    }
    async remove(id) {
        const curso = await this.findOne(id);
        await curso.destroy();
    }
};
exports.CursoService = CursoService;
exports.CursoService = CursoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(curso_model_1.Curso)),
    __metadata("design:paramtypes", [Object])
], CursoService);
//# sourceMappingURL=curso.service.js.map
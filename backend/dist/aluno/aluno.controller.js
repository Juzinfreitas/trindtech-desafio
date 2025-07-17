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
exports.AlunoController = void 0;
const common_1 = require("@nestjs/common");
const aluno_service_1 = require("./aluno.service");
const create_aluno_dto_1 = require("./dto/create-aluno.dto");
const update_aluno_dto_1 = require("./dto/update-aluno.dto");
const vincular_curso_dto_1 = require("./dto/vincular-curso.dto");
let AlunoController = class AlunoController {
    alunoService;
    constructor(alunoService) {
        this.alunoService = alunoService;
    }
    findAll(page, limit) {
        const pageNumber = page ? parseInt(page) : 1;
        const limitNumber = limit ? parseInt(limit) : 10;
        return this.alunoService.findAll(pageNumber, limitNumber);
    }
    findOne(id) {
        return this.alunoService.findOne(id);
    }
    create(createAlunoDto) {
        return this.alunoService.create(createAlunoDto);
    }
    update(id, updateAlunoDto) {
        return this.alunoService.update(id, updateAlunoDto);
    }
    remove(id) {
        return this.alunoService.remove(id);
    }
    vincularCurso(alunoId, vincularCursoDto) {
        return this.alunoService.vincularCurso(alunoId, vincularCursoDto.cursoId);
    }
    desvincularCurso(alunoId, cursoId) {
        return this.alunoService.desvincularCurso(alunoId, cursoId);
    }
};
exports.AlunoController = AlunoController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AlunoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AlunoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_aluno_dto_1.CreateAlunoDto]),
    __metadata("design:returntype", void 0)
], AlunoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_aluno_dto_1.UpdateAlunoDto]),
    __metadata("design:returntype", void 0)
], AlunoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AlunoController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/vincular-curso'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, vincular_curso_dto_1.VincularCursoDto]),
    __metadata("design:returntype", void 0)
], AlunoController.prototype, "vincularCurso", null);
__decorate([
    (0, common_1.Delete)(':id/desvincular-curso/:cursoId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('cursoId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AlunoController.prototype, "desvincularCurso", null);
exports.AlunoController = AlunoController = __decorate([
    (0, common_1.Controller)('alunos'),
    __metadata("design:paramtypes", [aluno_service_1.AlunoService])
], AlunoController);
//# sourceMappingURL=aluno.controller.js.map
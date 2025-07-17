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
exports.AlunoCursoController = void 0;
const common_1 = require("@nestjs/common");
const aluno_curso_service_1 = require("./aluno-curso.service");
const create_aluno_curso_dto_1 = require("./dto/create-aluno-curso.dto");
const update_aluno_curso_dto_1 = require("./dto/update-aluno-curso.dto");
let AlunoCursoController = class AlunoCursoController {
    service;
    constructor(service) {
        this.service = service;
    }
    vincular(dto) {
        return this.service.vincular(dto);
    }
    listarCursosDoAluno(alunoId) {
        return this.service.listarPorAluno(+alunoId);
    }
    atualizarStatus(id, dto) {
        return this.service.atualizarStatus(+id, dto);
    }
    remover(id) {
        return this.service.remover(+id);
    }
};
exports.AlunoCursoController = AlunoCursoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_aluno_curso_dto_1.CreateAlunoCursoDto]),
    __metadata("design:returntype", void 0)
], AlunoCursoController.prototype, "vincular", null);
__decorate([
    (0, common_1.Get)('aluno/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlunoCursoController.prototype, "listarCursosDoAluno", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_aluno_curso_dto_1.UpdateAlunoCursoDto]),
    __metadata("design:returntype", void 0)
], AlunoCursoController.prototype, "atualizarStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlunoCursoController.prototype, "remover", null);
exports.AlunoCursoController = AlunoCursoController = __decorate([
    (0, common_1.Controller)('aluno-curso'),
    __metadata("design:paramtypes", [aluno_curso_service_1.AlunoCursoService])
], AlunoCursoController);
//# sourceMappingURL=aluno-curso.controller.js.map
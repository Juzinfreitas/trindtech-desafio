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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoCurso = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const aluno_model_1 = require("../../aluno/entities/aluno.model");
const curso_model_1 = require("../../curso/entities/curso.model");
let AlunoCurso = class AlunoCurso extends sequelize_typescript_1.Model {
    alunoId;
    cursoId;
    status;
    dataConclusao;
    aluno;
    curso;
};
exports.AlunoCurso = AlunoCurso;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => aluno_model_1.Aluno),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AlunoCurso.prototype, "alunoId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => curso_model_1.Curso),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], AlunoCurso.prototype, "cursoId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.ENUM('andamento', 'concluido') }),
    __metadata("design:type", String)
], AlunoCurso.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATE, allowNull: true }),
    __metadata("design:type", Date)
], AlunoCurso.prototype, "dataConclusao", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => aluno_model_1.Aluno),
    __metadata("design:type", aluno_model_1.Aluno)
], AlunoCurso.prototype, "aluno", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => curso_model_1.Curso),
    __metadata("design:type", curso_model_1.Curso)
], AlunoCurso.prototype, "curso", void 0);
exports.AlunoCurso = AlunoCurso = __decorate([
    sequelize_typescript_1.Table
], AlunoCurso);
//# sourceMappingURL=aluno-curso.model.js.map
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
exports.Curso = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const aluno_curso_model_1 = require("../../alunoCurso/entities/aluno-curso.model");
let Curso = class Curso extends sequelize_typescript_1.Model {
    nome;
    descricao;
    alunos;
};
exports.Curso = Curso;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Curso.prototype, "nome", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Curso.prototype, "descricao", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => aluno_curso_model_1.AlunoCurso),
    __metadata("design:type", Array)
], Curso.prototype, "alunos", void 0);
exports.Curso = Curso = __decorate([
    sequelize_typescript_1.Table
], Curso);
//# sourceMappingURL=curso.model.js.map
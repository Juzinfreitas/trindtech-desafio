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
exports.Aluno = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Aluno = class Aluno extends sequelize_typescript_1.Model {
    nome;
    sobrenome;
    email;
    dataNascimento;
    cpf;
    genero;
    cep;
    estado;
    cidade;
    logradouro;
    numero;
    bairro;
    complemento;
    pais;
    cursosConcluidos;
    cursosEmAndamento;
    cursos;
};
exports.Aluno = Aluno;
__decorate([
    (0, sequelize_typescript_1.Column)({ primaryKey: true, autoIncrement: true, type: sequelize_typescript_1.DataType.INTEGER }),
    __metadata("design:type", Number)
], Aluno.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Aluno.prototype, "nome", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Aluno.prototype, "sobrenome", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Aluno.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DATEONLY }),
    __metadata("design:type", String)
], Aluno.prototype, "dataNascimento", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Aluno.prototype, "cpf", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Aluno.prototype, "genero", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Aluno.prototype, "cep", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Aluno.prototype, "estado", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Aluno.prototype, "cidade", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Aluno.prototype, "logradouro", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Aluno.prototype, "numero", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Aluno.prototype, "bairro", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Aluno.prototype, "complemento", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    __metadata("design:type", String)
], Aluno.prototype, "pais", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSONB, allowNull: false, defaultValue: [] }),
    __metadata("design:type", Array)
], Aluno.prototype, "cursosConcluidos", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSONB, allowNull: false, defaultValue: [] }),
    __metadata("design:type", Array)
], Aluno.prototype, "cursosEmAndamento", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING),
        allowNull: false,
        defaultValue: [],
    }),
    __metadata("design:type", Array)
], Aluno.prototype, "cursos", void 0);
exports.Aluno = Aluno = __decorate([
    sequelize_typescript_1.Table
], Aluno);
//# sourceMappingURL=aluno.model.js.map
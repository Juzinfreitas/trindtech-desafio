"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const aluno_model_1 = require("./entities/aluno.model");
const aluno_curso_model_1 = require("../alunoCurso/entities/aluno-curso.model");
const aluno_service_1 = require("./aluno.service");
const aluno_controller_1 = require("./aluno.controller");
let AlunoModule = class AlunoModule {
};
exports.AlunoModule = AlunoModule;
exports.AlunoModule = AlunoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([aluno_model_1.Aluno, aluno_curso_model_1.AlunoCurso])
        ],
        providers: [aluno_service_1.AlunoService],
        controllers: [aluno_controller_1.AlunoController],
    })
], AlunoModule);
//# sourceMappingURL=aluno.module.js.map
# Sistema de Gerenciamento de Alunos e Cursos

## 📝 Sobre o projeto

Este é um sistema desenvolvido como parte de um desafio técnico. Ele permite o cadastro de alunos, criação de cursos e vinculação entre ambos, com status de andamento ou concluído.

O sistema foi desenvolvido com foco em modularidade, organização e escalabilidade, usando NestJS no backend e React com Tailwind no frontend. O banco de dados é PostgreSQL e roda com Docker, facilitando o setup do ambiente.

> ⚠️ O projeto ainda está em desenvolvimento. Algumas funcionalidades e melhorias estão sendo implementadas.

---

## 🔧 Tecnologias utilizadas

- **Backend**: NestJS (Node.js + TypeScript) com Sequelize
- **Frontend**: React + TypeScript + Tailwind CSS
- **Banco de Dados**: PostgreSQL via Docker

---

## 📁 Principais arquivos e pastas

### Backend:
- `/src/aluno/`: regras de negócio e rotas para alunos
- `/src/curso/`: regras de negócio e rotas para cursos
- `/src/alunoCurso/`: controle de vínculo entre alunos e cursos
- `aluno.model.ts`, `curso.model.ts`, `aluno-curso.model.ts`: definem os modelos e relações entre as tabelas

### Frontend:
- `/pages/alunos.tsx`: exibe a lista de alunos
- `/pages/alunos/novo.tsx`: tela de cadastro de aluno
- `/services/api.ts`: configura a comunicação com a API NestJS

---

## ▶️ Como rodar o projeto localmente

### Pré-requisitos:
- Docker Desktop
- Node.js (versão 18 ou superior)
- npm ou yarn

### 1. Subir o banco de dados
```bash
docker compose up -d

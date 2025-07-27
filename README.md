# Sistema de Gerenciamento de Alunos e Cursos

## 📝 Sobre o projeto

Este é um sistema desenvolvido como parte de um desafio técnico. Ele permite o cadastro de alunos, criação de cursos e vinculação entre ambos, com status de andamento ou concluído.

O sistema foi desenvolvido com foco em modularidade, organização e escalabilidade, usando NestJS no backend e React com Tailwind no frontend. O banco de dados é PostgreSQL e roda com Docker, facilitando o setup do ambiente.

---

## 🔧 Tecnologias utilizadas

- **Backend**: NestJS (Node.js + TypeScript) com Sequelize
- **Frontend**: React + TypeScript + Tailwind CSS
- **Banco de Dados**: PostgreSQL via Docker

---

## 📁 Principais arquivos e pastas
- **backend/aluno.model.ts**: Model Sequelize do aluno, incluindo campos e relação com cursos.
- **backend/aluno.controller.ts**: Controller NestJS para rotas de alunos.
- **backend/aluno.service.ts**: Service NestJS com lógica de negócio e paginação.
- **frontend/pages/ListaAlunos.tsx**: Componente principal para listagem e paginação dos alunos.
- **frontend/pages/EditarAluno.tsx**: Componente para editar dados de um aluno.
---

## ▶️ Como rodar o projeto localmente

### Pré-requisitos:
- Docker Desktop
- Node.js (versão 18 ou superior)
- npm ou yarn

### 1. Subir o banco de dados
```bash
docker compose up -d

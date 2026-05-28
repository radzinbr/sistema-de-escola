# Sistema Escolar Web

Sistema web para gerenciamento escolar desenvolvido com Node.js, Express e MySQL.

O projeto permite controle de alunos, turmas, presença e notas através de uma API REST integrada a um frontend responsivo.

---

# Objetivo

Criar uma aplicação simples, organizada e escalável para:

- gerenciamento de alunos;
- controle de presença;
- lançamento de notas;
- cálculo de médias;
- integração frontend + backend.

---

# Tecnologias Utilizadas

## Backend
- Node.js
- Express
- MySQL
- MySQL Workbench

## Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap

## Ferramentas
- Postman
- Git
- GitHub

---

# Funcionalidades

## Alunos
- cadastrar alunos;
- editar alunos;
- excluir alunos;
- listar alunos;
- buscar alunos por turma.

## Turmas
- gerenciamento de turmas;
- vínculo entre aluno e turma.

## Presença
- registro de presença;
- controle de faltas;
- cálculo de frequência.

## Notas
- lançamento de avaliações;
- cálculo automático de médias;
- gerenciamento de P1, P2 e trabalhos.

---

# Estrutura do Projeto

```txt
sistema/
│
│── public/
│   ├── Components/
│   │     ├── footer.html
│   │     └──navbar.html
│   │
│   │── css/
│   │   └── style.css
│   │
│   │── js/
│   │   ├── alunos.js
│   │   ├── utils.js
│   │   └── api.js
│   │
│   └── pages/
│       ├── alunos.html
│       ├── dashboard.html
│       └── login.html
│
├── Server/
│     ├── controllers/
│     ├── database/
│     │    └──db.js
│     ├── models/
│     ├── routes/
│     │     └──alunosRoutes.js
│     └── app.js
│
│── package.json
└── README.md
```

---

# Banco de Dados

O sistema utiliza banco relacional MySQL com as seguintes tabelas:

- alunos
- turmas
- matriculas
- disciplinas
- professores
- chamadas
- presencas
- avaliacoes
- notas

---

# API REST

## Listar alunos

```http
GET /alunos
```

## Buscar alunos por turma

```http
GET /alunos/turma/:id
```

## Cadastrar aluno

```http
POST /alunos
```

## Atualizar aluno

```http
PUT /alunos/:id
```

## Remover aluno

```http
DELETE /alunos/:id
```

---

# Instalação

## Clonar repositório

```bash
git clone URL_DO_REPOSITORIO
```

## Entrar na pasta

```bash
cd Sua_pasta
```

## Instalar dependências

```bash
npm install
```

## Executar servidor

```bash
npx nodemon app.js
```

---

# Configuração do Banco

Criar banco no MySQL:

```sql
CREATE DATABASE escola;
```

Configurar conexão no arquivo:

```txt
database/db.js
```

---

# Frontend

O frontend utiliza:
- Bootstrap;
- Fetch API;
- integração com API REST;
- estrutura reutilizável para CRUDs.

---

# Arquitetura

O projeto segue arquitetura baseada em:
- API REST;
- separação frontend/backend;
- modularização;
- banco relacional;
- rotas organizadas.

---

# Licença

Projeto desenvolvido para fins educacionais e acadêmicos.

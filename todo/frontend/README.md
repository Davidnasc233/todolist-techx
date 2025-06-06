📋 TechX To-Do List
Aplicativo de Lista de Tarefas com Angular no frontend, Node.js + TypeScript no backend e MySQL como
banco de dados.

 Pré-requisitos

Tecnologia Versão recomendada
Node.js 20.x
npm 10.x
Angular CLI 17.x
MySQL 8.x

 Como rodar o projeto localmente

1. Clone o repositório

git clone https://github.com/SEU_USUARIO/TechX-to-do-list.git

cd TechX-to-do-list

Estrutura esperada:
TechX-to-do-list/
├── techx-api/ # Backend (Node.js + TypeScript)
├── techx-frontend/ # Frontend (Angular)
├── db/
│ └── techx_dump.sql # Dump SQL do banco de dados

2. Configurar o banco de dados (MySQL)

2.1. Crie o banco de dados

mysql -u root -p

2.2. Crie o banco e as tabelas manualmente:
CREATE DATABASE techx;
USE techx;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  taskName VARCHAR(255) NOT NULL,
  done BOOLEAN DEFAULT FALSE
);

ou 

2.2.1. Importe o arquivo SQL (dump)
mysql -u root -p techx < db/techx_dump.sql

3. Backend (Node.js + TypeScript)

cd techx-api
npm install
3.1. Configure o banco de dados em src/config/database.ts
const db = mysql2.createPool({
host: 'localhost',
user: 'root',
password: 'SUA_SENHA',
database: 'techx',
});
3.2. Inicie o servidor
npm run dev
O backend estará rodando em http://localhost:3000 .

4. Frontend (Angular)

cd ../techx-frontend
npm install
4.1. Verifique o endpoint da API em task.service.ts
const API_URL = 'http://localhost:3000';

4.2. Inicie o frontend
ng serve
A aplicação estará acessível em: http://localhost:4200
 Testando
 Adicionar tarefas
 Marcar como feita
 Editar tarefas
 Apagar tarefas

❗ Dicas

Sempre inicie o backend antes do frontend
Verifique o console do navegador em caso de erros
Confirme que o CORS está habilitado no backend

Feito com 💻 por TechX.
# School Control API

API REST para gestão escolar, construída com NestJS + Drizzle ORM + PostgreSQL.

## Pré-requisitos

- [Node.js](https://nodejs.org) >= 20
- [npm](https://www.npmjs.com) >= 10
- [PostgreSQL](https://www.postgresql.org) >= 14 rodando localmente (ou via Docker)

---

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no exemplo abaixo:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5552/school_control
PORT=3010
RABBITMQ_URL=amqp://guest:guest@localhost:5673
```

| Variável       | Descrição                       |
| -------------- | ------------------------------- |
| `DATABASE_URL` | Connection string do PostgreSQL |
| `PORT`         | Porta em que a API vai subir    |
| `RABBITMQ_URL` | Connection string do RabbitMQ   |

### 3. Criar e migrar o banco de dados

Com o PostgreSQL rodando, execute as migrações para criar as tabelas:

```bash
npm run db:migrate
```

---

## Rodando a aplicação

### Desenvolvimento (com hot reload)

```bash
npm run start:dev
```

### Produção

```bash
npm run build
npm run start:prod
```

### Comandos para rodar o projeto

Execute os comandos abaixo na raiz do projeto:

| Script                      | Descrição                                                  |
| --------------------------- | ---------------------------------------------------------- |
| `npm install`               | Instala todas as dependencias                              |
| `sudo docker compose up -d` | Sobe container do docker                                   |
| `npm run db:migrate`        | Aplica as migrations no banco                              |
| `npm run start:dev`         | Inicia em modo desenvolvimento com hot reload              |
| `npm run db:studio`         | Abre o Drizzle Studio para inspecionar o banco visualmente |  ---->>> https://local.drizzle.studio/

--->> http://localhost:15672/       // Aqui verifica se o RabbitMq está recebendo as informações  (Usuário: guest  // senha: guest)

--->> http://localhost:3010/docs   // Para conferir a documentação no swagger



### Outros comandos caso precise

| Script                       | Descrição                                                  |
| ---------------------------- | ---------------------------------------------------------- |
| `npm run start`              | Inicia sem hot reload                                      |
| `npm run start:prod`         | Inicia o build de produção                                 |
| `npm run build`              | Gera o build de produção em `dist/`                        |
| `npm run db:generate`        | Gera arquivos de migration a partir dos schemas            |
| `npm run db:push`            | Sincroniza o schema diretamente no banco (sem migration)   |
| `npm run lint`               | Executa o linter (Biome)                                   |
| `npm run check`              | Executa lint + formatação (Biome)                          |
| `sudo docker-compose up -d`  | Se sua instalação usa Docker Compose v1              | 



A API ficará disponível em `http://localhost:3010` (ou na porta configurada em `PORT`).

---

## Subindo o PostgreSQL com Docker

Caso não tenha o PostgreSQL instalado localmente, suba uma instância com Docker:

```bash
docker run --name school-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=school_control \
  -p 5432:5432 \
  -d postgres:16
```

---

## Documentação

- [Arquitetura do projeto](docs/arquitetura.md)

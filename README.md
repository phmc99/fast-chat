# FastChat

Converse sobre qualquer coisa com qualquer pessoa.

## Como iniciar o projeto

Esse projeto pode ser iniciado de duas formas:

    1. docker
    2. npm

Para iniciar com docker

- Execute as migrations
  - Você pode executar `docker exec -it abc123 npx prisma migrate deploy`
  - Òutra opção. Altere o CMD no Dockerfile em ./backend para o de migrations e utilize o comando abaixo. Após isso altere para o CMD de execução e use o comando novamente.

```bash
  docker-compose up --build
```

Para iniciar com npm

- Será necessário ter um MySql
- Criar os arquivos .env em /backend e /frontend, seguindo as variáveis que estão no docker-compose.yml

  1. Para os dois projetos execute `npm install`
  2. Para o /frontend iniciar execute `npm start`
  3. Para o /backend iniciar execute `npm run dev`

## Documentação da API

#### Cadastrar um usuário

```http
  POST /api/auth/register
```

| Parâmetro  | Tipo     | Descrição       |
| :--------- | :------- | :-------------- |
| `email`    | `string` | **Obrigatório** |
| `nickname` | `string` | **Obrigatório** |
| `password` | `string` | **Obrigatório** |

#### Login

```http
  POST /api/auth/login
```

| Parâmetro  | Tipo     | Descrição       |
| :--------- | :------- | :-------------- |
| `email`    | `string` | **Obrigatório** |
| `password` | `string` | **Obrigatório** |

#### Listar mensagens por chat

```http
  GET /api/message/chat/:chatId
```

#### Nova mensagem

```http
  POST /api/message
```

Headers: `{ Authorization: Bearar token (token => registar/login) }`

| Parâmetro | Tipo     | Descrição       |
| :-------- | :------- | :-------------- |
| `text`    | `string` | **Obrigatório** |
| `chatId`  | `string` | **Obrigatório** |

#### Listar usuários

```http
  GET /api/user
```

## Autores

- [Pedro Costa](https://www.linkedin.com/in/phmc99/)

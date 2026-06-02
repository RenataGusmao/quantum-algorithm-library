## Documentação e Guia de Implantação

Este documento descreve como recriar o ambiente do projeto Quantum Algorithm Library, incluindo frontend, backend, variáveis de ambiente e configuração necessária para execução local ou implantação em produção.

Observação importante: este projeto não utiliza IA. Portanto, não há chaves de API de IA, tokens de modelos ou variáveis relacionadas a serviços de inteligência artificial.

Projeto deployado no vercel: https://quantum-algorithm-library.vercel.app/pt

## Visão Geral

O projeto é composto por duas aplicações:

- Frontend: aplicação web em Next.js, responsável pela interface de consulta, filtros, comparação, detalhes dos algoritmos e área administrativa.
- Backend/API: API em Node.js com Express, Prisma ORM, MongoDB Atlas e autenticação JWT, responsável pela persistência e gerenciamento dos dados.

A API está preparada para ser publicada em serviços como Render e o frontend pode consumi-la por meio da variável `NEXT_PUBLIC_API_URL`.

## Tecnologias Utilizadas

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- next-intl
- npm

### Backend/API

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- MongoDB Atlas
- JWT
- bcrypt
- CORS
- dotenv

## Requisitos

Antes de executar o projeto, é necessário ter instalado:

- Node.js 20 ou superior
- npm
- Git, caso o projeto seja clonado de um repositório remoto
- Conta ou cluster configurado no MongoDB Atlas, para uso do backend

Para conferir as versões:

```bash
node -v
npm -v
git --version
Configuração do Backend/API
Entre na pasta da API:

cd quantum-algorithm-library-api-main
Instale as dependências:

npm install
Gere o client do Prisma:

npm run prisma:generate
Crie um arquivo .env na raiz do backend com as seguintes variáveis:

DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/nome-do-banco?retryWrites=true&w=majority"
JWT_SECRET="uma_chave_secreta_segura"
PORT=3000
Variáveis do Backend
DATABASE_URL

String de conexão do MongoDB Atlas usada pelo Prisma para acessar o banco de dados.

JWT_SECRET

Chave secreta usada para assinar e validar tokens JWT da autenticação.

PORT

Porta em que a API será executada localmente. Caso não seja definida, a aplicação usa 3000.

Execução do Backend em Desenvolvimento
Para iniciar a API localmente:

npm run dev
A API ficará disponível em:

http://localhost:3000
Rotas principais da API:

GET    /
GET    /health

POST   /auth/login

GET    /users
POST   /users
GET    /users/:id
PUT    /users/:id
DELETE /users/:id

GET    /algoritmos
GET    /algoritmos/:idOuSlug
POST   /algoritmos
PUT    /algoritmos/:id
DELETE /algoritmos/:id

GET    /tipos-problema
GET    /tipos-problema/:id
POST   /tipos-problema
PUT    /tipos-problema/:id
DELETE /tipos-problema/:id

GET    /referencias
GET    /referencias/:id
POST   /referencias
PUT    /referencias/:id
DELETE /referencias/:id
A maior parte das rotas da API exige autenticação via JWT. O token é obtido pela rota:

POST /auth/login
Exemplo de corpo da requisição:

{
  "email": "admin@email.com",
  "senha": "senha_do_usuario"
}
A resposta retorna um token:

{
  "token": "token_jwt"
}
Esse token deve ser enviado nas requisições protegidas usando o cabeçalho:

Authorization: Bearer token_jwt
Implantação da API no Render
Para publicar a API no Render, configure um novo serviço web apontando para o repositório do backend.

Configurações recomendadas:

Build Command:
npm install && npm run prisma:generate

Start Command:
npm run start
Variáveis de ambiente no Render:

DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/nome-do-banco?retryWrites=true&w=majority"
JWT_SECRET="uma_chave_secreta_segura"
PORT=10000
Observação: o Render normalmente fornece a variável PORT automaticamente. Caso isso ocorra, não é necessário defini-la manualmente.

Após o deploy, a API ficará disponível em uma URL semelhante a:

https://nome-do-servico.onrender.com
Essa URL deve ser usada no frontend como valor da variável NEXT_PUBLIC_API_URL.

Configuração do Frontend
Entre na pasta do frontend:

cd quantum-algorithm-library-main
Instale as dependências:

npm install
Crie um arquivo .env.local na raiz do frontend:

NEXT_PUBLIC_API_URL=https://nome-do-servico.onrender.com
Para desenvolvimento local usando a API local:

NEXT_PUBLIC_API_URL=http://localhost:3000
Variável do Frontend
NEXT_PUBLIC_API_URL

Define a URL base da API consumida pelo frontend. Essa variável deve apontar para a API local ou para a API publicada no Render.

Exemplos:

NEXT_PUBLIC_API_URL=http://localhost:3000
ou:

NEXT_PUBLIC_API_URL=https://nome-do-servico.onrender.com
Execução do Frontend em Desenvolvimento
Para iniciar o frontend:

npm run dev
A aplicação ficará disponível em:

http://localhost:3000
Rotas principais:

http://localhost:3000/pt
http://localhost:3000/pt/algoritmos
http://localhost:3000/pt/comparar
http://localhost:3000/pt/busca-guiada
http://localhost:3000/pt/sobre
http://localhost:3000/pt/admin
Também há suporte ao idioma inglês:

http://localhost:3000/en
http://localhost:3000/en/algoritmos
http://localhost:3000/en/comparar
Build de Produção do Frontend
Para gerar a versão otimizada:

npm run build
Para executar em modo produção:

npm run start
Validação do Projeto
No frontend, execute:

npm run lint
npm run build
No backend, execute:

npm run prisma:generate
npm run start
Também é possível validar a API acessando:

https://nome-do-servico.onrender.com/health
A resposta esperada é:

{
  "status": "ok"
}
Estrutura Principal do Frontend
src/
  app/
    [locale]/
      admin/
      algoritmos/
      busca-guiada/
      comparar/
      sobre/

  components/
    admin/
    algoritmos/
    layout/

  data/
    algorithms.ts
    categories.ts

  i18n/
    navigation.ts
    request.ts
    routing.ts

  lib/
    useAlgorithms.ts

  messages/
    pt.json
    en.json

  types/
    algorithm.ts
    category.ts
Estrutura Principal do Backend
src/
  server.ts

  routes/
    algoritmos.ts
    auth.ts
    users.ts
    tipos-problema.ts
    referencias.ts

  middlewares/
    auth.ts

  lib/
    prisma.ts
    request.ts

prisma/
  schema.prisma
Banco de Dados
O backend utiliza MongoDB Atlas com Prisma ORM.

O schema principal está em:

prisma/schema.prisma
Modelos principais:

User
Algoritmo
TipoProblema
Referencia
A entidade Algoritmo armazena informações como nome, slug, categoria, descrição, complexidade, speedup, implementações, aplicações, características, vantagens, limitações, tags e referências.

Autenticação
A autenticação é feita com JWT.

Fluxo básico:

Criar um usuário pela rota POST /users.
Fazer login pela rota POST /auth/login.
Usar o token retornado no cabeçalho Authorization.
Acessar rotas protegidas da API.
Exemplo de cabeçalho:

Authorization: Bearer token_jwt
Observações Sobre Inteligência Artificial
O projeto não utiliza serviços de inteligência artificial.

Não é necessário configurar:

OPENAI_API_KEY
ANTHROPIC_API_KEY
GEMINI_API_KEY
ou qualquer outra chave relacionada a IA.


Observações Finais
O frontend consome a API por meio da variável NEXT_PUBLIC_API_URL.
A API está estruturada para rodar localmente ou em produção no Render.
O backend utiliza MongoDB Atlas, Prisma e JWT.
As rotas principais da API exigem autenticação.
Não existem chaves de API de IA no projeto.
Antes da publicação da API, recomenda-se configurar corretamente DATABASE_URL e JWT_SECRET no ambiente de produção.

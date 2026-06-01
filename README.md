<<<<<<< HEAD
<<<<<<< HEAD
# Quantum Algorithm Explorer

Plataforma web interativa para explorar, filtrar, visualizar e comparar algoritmos quânticos. O projeto organiza uma base de algoritmos em uma experiência de navegação clara, responsiva e orientada à tomada de decisão.

A aplicação foi desenvolvida com foco em usabilidade, escalabilidade e futura integração com backend/API e banco de dados.

## Sobre o Projeto

O Quantum Algorithm Explorer surge da necessidade de organizar e facilitar o acesso a algoritmos quânticos, que muitas vezes aparecem de forma fragmentada em documentos, tabelas, PDFs ou apresentações.

A proposta é transformar esse conteúdo em uma biblioteca digital interativa, permitindo que usuários encontrem algoritmos por categoria, aplicação, complexidade, características e casos de uso.

## Objetivos

- Organizar algoritmos quânticos em uma biblioteca estruturada.
- Permitir busca dinâmica por nome, categoria, aplicação e características.
- Facilitar a comparação entre diferentes algoritmos.
- Exibir páginas de detalhe para cada algoritmo.
- Preparar a aplicação para integração futura com API e MongoDB.
- Oferecer uma interface responsiva e alinhada à identidade visual da Accenture.
- Suportar navegação em português e inglês.

## Funcionalidades

- Listagem de algoritmos quânticos.
- Busca dinâmica.
- Filtros por categoria, complexidade e aplicação.
- Cards completos com resumo, tags e ações.
- Página de detalhes por algoritmo.
- Fluxo de comparação entre algoritmos.
- Barra flutuante de comparação para melhor usabilidade.
- Página de busca guiada.
- Área administrativa inicial.
- Internacionalização com suporte a `pt` e `en`.
- Estrutura preparada para PWA.
- Layout responsivo.

## Público-Alvo

- Profissionais de TI.
- Pesquisadores em computação quântica.
- Estudantes de tecnologia, engenharia, matemática e áreas exatas.
- Times que precisam avaliar algoritmos quânticos de forma comparativa.
- Empresas interessadas em aplicações práticas de computação quântica.

## Stack Utilizada

- Next.js 16
- React
- TypeScript
- TailwindCSS
- App Router
- next-intl
- LocalStorage para persistência local temporária
- Estrutura preparada para integração com API e MongoDB

## Estrutura Principal

```txt
src/
  app/
    [locale]/
=======
=======
>>>>>>> main
## 1.3 Documentação e Guia de Implantação

Este documento descreve como recriar o ambiente do projeto Quantum Algorithm Library, incluindo frontend, backend, variáveis de ambiente e configuração necessária para execução local ou implantação em produção.

Observação importante: embora o enunciado mencione serviços de inteligência artificial, este projeto não utiliza IA. Portanto, não há chaves de API de IA, tokens de modelos ou variáveis relacionadas a serviços de inteligência artificial.

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
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> main
      algoritmos/
      busca-guiada/
      comparar/
      sobre/
<<<<<<< HEAD
<<<<<<< HEAD
      admin/
    globals.css
    layout.tsx
    page.tsx

  components/
    algoritmos/
    admin/
=======
=======
>>>>>>> main

  components/
    admin/
    algoritmos/
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> main
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
<<<<<<< HEAD
<<<<<<< HEAD

public/
  brand/
Principais Pastas
src/app
Contém as rotas da aplicação usando App Router do Next.js.

As páginas principais ficam dentro de src/app/[locale], permitindo URLs internacionalizadas como:

/pt/algoritmos
/en/algoritmos
/pt/comparar
/en/about
src/components
Contém os componentes reutilizáveis da interface.

Principais grupos:

layout: Header e estrutura visual global.
algoritmos: cards, filtros, listagem e detalhes de algoritmos.
admin: componentes da área administrativa.
src/data
Contém os dados locais usados atualmente pela aplicação.

algorithms.ts: base de algoritmos.
categories.ts: categorias disponíveis.
No futuro, esses dados podem ser substituídos por chamadas à API.

src/i18n
Contém a configuração de internacionalização com next-intl.

Arquivos principais:

routing.ts: define os idiomas suportados.
navigation.ts: cria helpers de navegação com locale.
request.ts: carrega as mensagens do idioma atual.
src/messages
Contém os textos traduzidos da aplicação.

pt.json: mensagens em português.
en.json: mensagens em inglês.
src/lib/useAlgorithms.ts
Hook responsável por carregar, persistir e atualizar algoritmos localmente.

Atualmente usa localStorage, mas está preparado para ser substituído ou adaptado para chamadas de API.

Idiomas Suportados
A aplicação suporta inicialmente:

pt
en
Idioma padrão:

pt
Requisitos
Antes de rodar o projeto, é necessário ter instalado:

Node.js 20 ou superior
npm
Git
Verifique com:

node -v
npm -v
git --version
Instalação
Clone o repositório:

git clone <url-do-repositorio>
Entre na pasta do projeto:

cd quantum-algorithm-library
Instale as dependências:

npm install
Rodando em Desenvolvimento
npm run dev
A aplicação ficará disponível em:

http://localhost:3000
Rotas principais:

http://localhost:3000/pt
http://localhost:3000/pt/algoritmos
http://localhost:3000/pt/busca-guiada
http://localhost:3000/pt/comparar
http://localhost:3000/pt/sobre
Build de Produção
Para gerar a build:

npm run build
Para rodar a versão de produção:

npm run start
Limpeza de Cache
Caso o Next.js mantenha rotas antigas ou erros de cache, remova a pasta .next:

No PowerShell:

Remove-Item -Recurse -Force .next
Depois rode novamente:

npm run dev
Scripts Disponíveis
npm run dev
Inicia o servidor de desenvolvimento.

npm run build
Gera a build de produção.

npm run start
Executa a aplicação em modo produção.

npm run lint
Executa a verificação de lint.

Dependências Principais
Next.js
Framework React usado para estrutura da aplicação, rotas, renderização e build.

React
Biblioteca base para construção da interface.

TypeScript
Adiciona tipagem estática ao projeto.

TailwindCSS
Utilizado para estilização e organização visual da interface.

next-intl
Responsável pela internacionalização da aplicação.

Dados dos Algoritmos
A base atual de algoritmos fica em:

src/data/algorithms.ts
Cada algoritmo segue a estrutura definida em:

src/types/algorithm.ts
Formato principal:

export interface Algorithm {
  id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  applications: string[];
  characteristics: string[];
  complexity?: string;
  advantages?: string[];
  limitations?: string[];
  tags?: string[];
}
Comparação de Algoritmos
A comparação permite selecionar algoritmos diretamente nos cards da listagem.

Quando há algoritmos selecionados, uma barra flutuante aparece na interface para facilitar o acesso à comparação sem exigir que o usuário role até o final da página.

Internacionalização
As rotas são baseadas em locale:

/pt
/en
Para adicionar ou alterar textos, edite:

src/messages/pt.json
src/messages/en.json
Para alterar idiomas disponíveis, edite:

src/i18n/routing.ts

Fluxo recomendado:

Frontend
  chama rotas /api

API
  busca dados no MongoDB

MongoDB
  armazena algoritmos, categorias e dados administrativos
Arquivos esperados em uma futura integração:

src/lib/mongodb.ts
src/app/api/algorithms/route.ts
src/app/api/algorithms/[id]/route.ts
src/services/algorithms.ts
Variáveis de ambiente esperadas:

MONGODB_URI=
MONGODB_DB=
Essas variáveis devem ficar em:

.env.local
O arquivo .env.local não deve ser versionado.

Boas Práticas do Projeto
Manter componentes separados por responsabilidade.
Evitar duplicação de lógica.
Preservar a estrutura do App Router.
Manter textos traduzíveis nos arquivos de mensagens quando fizer parte da interface internacionalizada.
Evitar acesso direto ao banco no frontend.
Usar API routes para comunicação com serviços externos.
Validar a build antes de commits importantes.
Status Atual
O projeto atualmente possui:

Frontend funcional.
Internacionalização inicial.
Listagem e detalhes de algoritmos.
Comparação preparada.
Área administrativa inicial.
Dados locais estruturados.
Layout responsivo.
Identidade visual alinhada à Accenture.
Preparação para integração com API e MongoDB.
Próximos Passos
Integrar a base de algoritmos com API.
Conectar API ao MongoDB.
Substituir persistência local por persistência real.
Melhorar validações da área administrativa.
Adicionar estados de loading e erro para chamadas externas.
Revisar permissões e autenticação para área administrativa.
Expandir testes e validações.
=======
=======
>>>>>>> main
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

A menção à IA aparece apenas como possibilidade futura na documentação do backend, mas não há integração ativa no código atual.

Observações Finais
O frontend consome a API por meio da variável NEXT_PUBLIC_API_URL.
A API está estruturada para rodar localmente ou em produção no Render.
O backend utiliza MongoDB Atlas, Prisma e JWT.
As rotas principais da API exigem autenticação.
Não existem chaves de API de IA no projeto.
Antes da entrega, recomenda-se validar o frontend com npm run lint e npm run build.
Antes da publicação da API, recomenda-se configurar corretamente DATABASE_URL e JWT_SECRET no ambiente de produção.
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> main

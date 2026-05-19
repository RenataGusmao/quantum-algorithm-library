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
      algoritmos/
      busca-guiada/
      comparar/
      sobre/
      admin/
    globals.css
    layout.tsx
    page.tsx

  components/
    algoritmos/
    admin/
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

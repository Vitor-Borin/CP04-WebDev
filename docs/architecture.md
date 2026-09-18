# Architecture — MovieOn

## 1. Visão Geral

SPA em React criada com Vite, com rotas do React Router. O `App.jsx` é o layout: tem o `Header` (com a busca), o `<Outlet />` onde as páginas aparecem e o `Footer` (com os créditos do TMDB e da JustWatch).

- Os dados vêm da API do TMDB, com uma função `async` e `try/catch` dentro do `useEffect` de cada página.
- Os canais escolhidos ficam salvos no `localStorage`. As páginas que precisam deles leem esse valor ao iniciar o `useState`.
- Os componentes recebem os dados por props e não fazem chamadas à API.
- A lógica usa só o que foi visto em aula (código das aulas e PDFs do professor). O que fica fora disso está na seção 8.

## 2. Estrutura de Pastas

```text
src/
├── assets/
├── components/
│   ├── Header.jsx
│   ├── SearchBar.jsx
│   ├── Footer.jsx
│   ├── TvScreen.jsx
│   ├── Remote.jsx
│   ├── ProviderCard.jsx
│   ├── PosterCard.jsx
│   ├── ProviderGroup.jsx
│   └── SignalState.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── ChannelsPage.jsx
│   ├── ZappingPage.jsx
│   ├── SearchPage.jsx
│   ├── TitlePage.jsx
│   └── PageNotFound.jsx
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

A pasta `assets/` guarda só a logo, que também é o favicon, e a textura de chiado.

## 3. Páginas e Rotas

As rotas são criadas no `main.jsx` com `createBrowserRouter`. A rota `/` usa o `App` como layout e as páginas ficam em `children`, com a Home como rota `index`. Rota inexistente cai em `{ path: "*" }` dentro de `children`, então a tela "Fora do ar" aparece dentro do layout. O `errorElement` na rota raiz fica para erros inesperados.

| Página | Rota | Objetivo |
|---|---|---|
| HomePage | `/` (index) | Apresentar a ideia, ligar a TV, mostrar a grade com os canais da pessoa e dar acesso à busca e aos canais |
| ChannelsPage | `/canais` | Escolher os streamings assinados (F01) |
| ZappingPage | `/canal/:providerId` | Ver o catálogo do canal e trocar de canal (F02) |
| SearchPage | `/busca/:termo` | Mostrar os resultados da busca (F03) |
| TitlePage | `/titulo/:tipo/:id` | Mostrar onde o título passa (F04) |
| PageNotFound | `*` e `errorElement` na raiz | Rota inexistente ou erro inesperado: tela "Fora do ar" |

## 4. Componentes

| Componente | Responsabilidade | Props |
|---|---|---|
| Header | Logo (imagem `logo.svg` importada de `assets`, sem o nome escrito e com texto alternativo "MovieOn"), links (Início, Meus canais) e busca | nenhuma |
| SearchBar | Campo "Sintonize um título" e botão "Sintonizar". Ao enviar, lê o campo e navega para `/busca/:termo` com `useNavigate`; com menos de 2 letras, mostra o aviso e não busca | nenhuma |
| Footer | Logo e créditos do TMDB e "Dados de streaming: JustWatch" | nenhuma |
| TvScreen | Tela da TV com brilho na cor do canal, OSD do canal, número grande que aparece na troca, scanlines, chiado, grade de pôsteres e os estados de vazio e erro dentro da tela | `numero`, `nomeCanal`, `titulos`, `tipo`, `sintonizando`, `erro` |
| Remote | Controle com a logo no topo, CH+, CH- e o botão Filmes/Séries | `canalAnterior`, `proximoCanal`, `tipo`, `setTipo` |
| ProviderCard | Logo e nome de um streaming, marcado ou não. Marcado, mostra o número do canal ("CH 01") na cor da barra daquela posição | `provedor`, `numero` (posição no controle; 0 quando não marcado), `aoClicar` |
| PosterCard | Pôster, nome, ano e tipo, com link para o detalhe | `id`, `tipo`, `titulo`, `ano`, `poster` |
| ProviderGroup | Lista de streamings de um tipo de acesso, uma linha por streaming com barras de sinal e o acesso à direita | `titulo`, `acesso` (etiqueta da linha: "No seu controle", "Incluso", "Aluguel" ou "Compra"), `provedores`, `destaque` ("alto", "medio" ou "baixo") |
| SignalState | Estados de vazio (barras de teste) e erro (tela sem sinal) com o visual de TV. O carregando é o chiado de cada página | `estado` ("vazio" ou "erro"), `titulo`, `texto` (opcional), `linkTexto`, `linkPara` |

## 5. Estado da Aplicação

| Estado | Onde será controlado? | Por quê? |
|---|---|---|
| `canais` (lista de `{ id, nome, logo }`) | ChannelsPage (edita); HomePage, ZappingPage e TitlePage (leem) | Precisa existir em várias páginas e continuar após recarregar, por isso é salvo no `localStorage` com a chave `movieon:canais` |
| `provedores` | ChannelsPage | Lista de streamings do Brasil vinda da API |
| `titulos` | ZappingPage | Catálogo do canal atual |
| `tipo` (`movie` ou `tv`) | ZappingPage, enviado ao Remote por props | O controle troca o tipo e a página busca de novo |
| `aviso` | SearchBar | Liga o aviso de termo curto. O campo não é controlado porque `onChange` não foi visto |
| `resultados` | SearchPage | Resultados de `search/multi` já sem pessoas |
| `titulo` e `ondeAssistir` | TitlePage | Detalhes do título e o objeto `results.BR` dos watch providers |
| `carregando` e `erro` | Em cada página que chama a API | Controlam os estados da spec |

## 6. useEffect

Os efeitos que buscam dados usam uma função `async` com `try/catch` e conferem `dados.success === false`, porque o TMDB responde erro sem cair no `catch`. Quando dependem de parâmetro da rota, usam a variável `ignorar` na limpeza, para uma resposta atrasada não sobrescrever a atual.

| Efeito | Quando acontece? | O que faz? |
|---|---|---|
| Buscar streamings | ChannelsPage, ao montar (`[]`) | `GET /watch/providers/movie?watch_region=BR`, ordena por prioridade no BR e guarda os 20 primeiros |
| Salvar canais | ChannelsPage, quando `canais` muda | Grava `canais` no `localStorage` |
| Buscar catálogo | ZappingPage, quando `providerId` ou `tipo` muda | `GET /discover/{tipo}?with_watch_providers={id}&watch_region=BR&with_watch_monetization_types=flatrate` |
| Animação de troca de canal | ZappingPage, quando `providerId` muda | Timeline GSAP dentro de `gsap.matchMedia()`: a imagem assenta, o OSD pisca e o número do canal pisca grande no centro, sem se mover. O chiado é uma camada de CSS que fica na tela enquanto `carregando` é verdadeiro. A limpeza reverte a animação |
| Animação de ligar a TV | HomePage e ZappingPage, ao montar | Linha horizontal que abre até a tela cheia (GSAP) |
| Pôsteres sintonizando | ZappingPage e SearchPage, quando `carregando` muda | Quando a lista chega, cada pôster abre como uma TV ligando, um depois do outro (GSAP com `stagger`) |
| Buscar resultados | SearchPage, quando `termo` muda | `GET /search/multi?query={termo}` e remove `media_type: "person"` |
| Buscar detalhe | TitlePage, quando `tipo` ou `id` muda | `GET /{tipo}/{id}` e depois `GET /{tipo}/{id}/watch/providers`, com dois `await` em sequência na mesma função (sem `Promise.all`) |

## 7. Dependências

| Biblioteca | Uso | Motivo |
|---|---|---|
| react-router (v7) | Rotas, layout com `Outlet`, `Link`, `useParams` e `useNavigate` | Mesma versão usada em aula. Instalar com `npm i react-router@7`, porque sem a versão o npm instala a v8 |
| react-icons (pacote Phosphor, `react-icons/pi`) | Ícones (PiPower, PiCaretUp, PiCaretDown, PiMagnifyingGlass, PiArrowLeft) | Requisito da CP, visto no slide "Biblioteca de ícones" da aula de Componentização (03/09/2026). Usamos só o pacote Phosphor para todos os ícones terem o mesmo traço |
| gsap | Ligar a TV, troca de canal e pôsteres sintonizando | Controle de timeline que só com CSS ficaria difícil de sincronizar com o carregamento |

As fontes (Radio Canada Big e Doto) entram por link do Google Fonts no `index.html` e não são dependências npm.

A troca de página não usa efeito: é uma animação de CSS no elemento raiz de cada página, que roda quando a página monta. O chiado, o conteúdo assentando e o nome da tela no canto, como o OSD de uma TV (lido do atributo `data-osd`, como "MENU" ou "INFO"), vêm do `App.css`. A Home não usa, porque a TV dela já liga com animação própria.

## 8. Exceções

Recursos que usamos e que não estão no material das aulas:

| Recurso | Onde | Por quê |
|---|---|---|
| Função de limpeza do `useEffect` (`return () => ...`) | Efeitos de busca da ZappingPage, SearchPage e TitlePage; animações GSAP | Nos efeitos de busca, a variável `ignorar` impede que a resposta de um canal antigo apareça depois de trocar de canal rápido. No GSAP, reverte a animação ao sair da página. Não aparece nos PDFs nem no código das aulas |
| GSAP (`gsap.matchMedia`, `gsap.timeline`, `fromTo`, `to` e `revert`) | HomePage, ZappingPage e SearchPage | Animações que acompanham o carregamento: a TV ligando, a troca de canal e os pôsteres sintonizando. É biblioteca de animação, sem regra de negócio, e o `matchMedia` desliga tudo para quem pediu movimento reduzido |
| `JSON.parse`, `JSON.stringify` e `localStorage.setItem` | Leitura e gravação dos canais (ChannelsPage, HomePage, ZappingPage e TitlePage) | O material escrito só mostra `localStorage.getItem` (Rotas no React, 03/09/2026). O `localStorage` só guarda texto, então a lista de canais vira texto para salvar e volta a ser lista ao ler |

Recursos não vistos que evitamos, e o que usamos no lugar:

| Recurso | Substituído por | Onde foi visto o substituto |
|---|---|---|
| `onChange` (campo controlado) | Campo não controlado, lido com `document.querySelector(...).value` ao enviar | Manipulação de DOM (25/05/2026) |
| `window.location.assign` | `useNavigate` | Rotas no React (03/09/2026) |
| `.catch` | `try/catch` com `async/await` | JS - API (19/08/2026) |
| `findIndex`, `some` e `Promise.all` | `indexOf`, `filter` com `includes` e dois `await` em sequência | Arrays (25/05/2026) e JS - API (19/08/2026) |
| `console.error` | `console.log` no `catch` | Introdução ao JS (05/04/2026) |
| Encadeamento opcional (`?.`) | Estado inicial `{}` em `titulo` e `ondeAssistir`, lido com `\|\|` | Operadores e Condicionais (09/04/2026) |
| `NavLink` (destaque do link ativo) | Links sem destaque da página atual | Não se aplica |
| `document.title` | Título fixo no `index.html` | Não se aplica |

# Onde Passa

Site responsivo para descobrir onde assistir filmes e séries no Brasil. Os streamings que você assina viram canais de uma TV, e um controle remoto troca de um para o outro.

## Integrantes

| Nome | RM |
|---|---|
| Robert Josino | RM571622 |
| Ryan Maick | RM573051 |
| Vitor Borin | RM573194 |

Turma: 1ESPX-2026

## Problema

Quem assina mais de um streaming perde tempo abrindo app por app para saber onde um título está, e às vezes aluga um filme que já estava incluso em uma das assinaturas. O TV Time também mostrava onde assistir cada título, mas anunciou o fim em julho de 2026, e essa busca voltou para o Google e para dentro de cada app.

## Solução

A pessoa marca os streamings que assina e eles viram canais numerados de um controle remoto. Dá para zapear pelo catálogo de cada canal ou buscar um título pelo nome. Na página do título, os streamings aparecem separados entre o que já está incluso nas assinaturas dela ("No seu controle") e o que precisa ser alugado ou comprado.

## Funcionalidades

Os critérios de aceitação de cada uma estão em [docs/requirements.md](docs/requirements.md).

- Meus canais (`/canais`): lista os 20 streamings com mais destaque no Brasil. Clicar marca ou desmarca, e a ordem das marcações vira o número do canal (CH 01, CH 02...). A seleção fica salva no navegador, e o botão "Ligar a TV" só funciona com pelo menos um canal marcado.
- Zapping (`/canal/:providerId`): mostra os títulos populares do canal. CH+ e CH- trocam de canal (do último volta para o primeiro) e o botão Filmes/Séries troca o tipo do catálogo. No celular, o controle fica numa barra fixa embaixo da tela.
- Busca (`/busca/:termo`): o campo "Sintonize um título" procura filmes e séries pelo nome e não mostra pessoas. Com menos de 2 letras, aparece o aviso de sinal fraco e a busca não acontece. Título sem pôster ganha as barras coloridas no lugar.
- Onde passa (`/titulo/:tipo/:id`): sinopse, ano, duração, gêneros e nota do título, com os streamings divididos em No seu controle, Em outros canais, Aluguel e Compra, e o crédito da JustWatch.

Os estados da aplicação também são estados de TV: chiado enquanto carrega, barras coloridas quando não tem resultado e a tela "Sem sinal" quando a API falha. Uma rota que não existe mostra a tela "Fora do ar". Cada canal tem a cor de uma das barras do teste de imagem (CH 01 cinza, CH 02 amarelo, CH 03 ciano...).

A TV liga com uma linha que abre na vertical. Ao trocar de página, a tela chia e o nome da página pisca no canto (MENU, BUSCA, INFO), e na troca de canal o número aparece grande no meio da tela. Quando o catálogo chega, os pôsteres acendem um por um. Em Onde passa, as barras de sinal enchem mais nas assinaturas que a pessoa já tem. Quem ativou a redução de movimento no sistema não vê nenhuma dessas animações.

## Tecnologias

- React 19 com Vite
- React Router 7
- React Icons (só o pacote Phosphor)
- GSAP (animações)
- CSS puro, sem biblioteca de componentes
- Vercel (deploy)

## API

[The Movie Database (TMDB)](https://developer.themoviedb.org/), com os dados de streaming da JustWatch.

Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.

## Documentação (Spec Driven Development)

- [Requisitos](docs/requirements.md)
- [Arquitetura](docs/architecture.md)
- [Referências visuais](docs/references/references.md)

## Uso de IA

Usamos IA (Claude) seguindo o Spec Driven Development: a spec em `docs/` veio primeiro, e o código foi feito em cima dela, uma funcionalidade por vez. A IA ajudou a redigir os documentos, a escrever e revisar o código e a conferir se cada comando aparece no material das aulas. O que ficou de fora do material está listado na seção 8 do [docs/architecture.md](docs/architecture.md).

As decisões de produto, de escopo, de visual e técnicas foram do grupo. As imagens das referências são prints nossos, e a direção visual foi escolhida entre algumas opções que comparamos. Todos os integrantes revisaram o código antes da entrega.

## Como executar

```bash
git clone https://github.com/Vitor-Borin/CP04-WebDev.git
cd CP04-WebDev
npm install
```

Crie um arquivo `.env` na raiz com base no `.env.example` e coloque sua chave do TMDB (em themoviedb.org: Configurações > API > Chave da API):

```
VITE_API_URL=https://api.themoviedb.org/3/
VITE_TMDB_KEY=sua_chave
```

```bash
npm run dev
```

Outros comandos:

```bash
npm run lint
npm run build
npm run preview
```

## Deploy na Vercel

1. Suba o projeto para o GitHub. O `.env` não vai junto porque está no `.gitignore`.
2. Na Vercel, clique em **Add New > Project** e importe o repositório. A Vercel reconhece o Vite sozinha (build `npm run build`, saída `dist`).
3. Antes do deploy, abra **Environment Variables** e cadastre as duas variáveis:
   - `VITE_API_URL` com o valor `https://api.themoviedb.org/3/`
   - `VITE_TMDB_KEY` com a chave do TMDB
4. Clique em **Deploy**.
5. Se alguma variável for criada ou alterada depois, vá em **Deployments** e faça **Redeploy**, porque as variáveis entram no build.
6. Para testar o `vercel.json`, abra direto um endereço como `/titulo/filme/693134` e recarregue a página: o título tem que abrir, sem erro 404.

Com o repositório conectado, cada push na branch `main` publica uma nova versão do site.

## Links

- Site: https://cp04-webdev.vercel.app
- Repositório: https://github.com/Vitor-Borin/CP04-WebDev

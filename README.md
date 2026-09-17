# Onde Passa

Plataforma web responsiva para descobrir onde assistir filmes e séries no Brasil, usando os streamings que você já assina como canais de uma TV.

## Integrantes

| Nome | RM |
|---|---|
| Robert Josino | RM571622 |
| Ryan Maick | RM573051 |
| Vitor Borin | RM573194 |

Turma: 1ESPX-2026

## Problema

Quem assina mais de um streaming perde tempo abrindo app por app para saber onde um título está, e muitas vezes aluga algo que já estava incluso em uma assinatura. Com o fim do TV Time, essa busca ficou espalhada.

## Solução

A pessoa marca os streamings que assina e eles viram canais de um controle remoto. Ela pode zapear pelo catálogo de cada canal ou buscar um título e ver onde ele passa, separando o que já está no seu controle do que precisa ser alugado ou comprado.

## Funcionalidades

- **Meus canais (`/canais`):** lista os 20 streamings mais relevantes do Brasil. Clicar marca ou desmarca, a ordem de marcação vira o número do canal (CH 01, CH 02...) e a seleção fica salva no navegador. O botão "Ligar a TV" só funciona com pelo menos um canal.
- **Zapping (`/canal/:providerId`):** a TV liga com a linha horizontal e mostra os títulos populares do canal. O controle remoto troca de canal (CH+ e CH−, voltando ao primeiro depois do último) e alterna entre Filmes e Séries. Enquanto carrega, a tela mostra chiado. No celular, o controle vira uma barra fixa embaixo.
- **Busca (`/busca/:termo`):** o campo "Sintonize um título" busca filmes e séries pelo nome, sem mostrar pessoas. Com menos de 2 letras aparece o aviso de sinal fraco. Título sem pôster ganha as barras coloridas no lugar.
- **Onde passa (`/titulo/:tipo/:id`):** página do título com sinopse, ano, duração, gêneros e nota. Os streamings aparecem separados em No seu controle, Em outros canais, Aluguel e Compra, com o crédito da JustWatch.
- **Estados de TV:** chiado quando carrega, barras coloridas quando não há conteúdo e tela "Sem sinal" quando a API falha. Rota inexistente mostra a tela "Fora do ar".
- **Animações de TV:** ao trocar de página a tela chia e o nome da tela aparece no canto, como o OSD de uma TV (MENU, BUSCA, INFO); os pôsteres ligam um por um quando o catálogo chega; o controle afunda ao apertar e o número do canal aparece grande na TV; em Onde passa, as barras de sinal enchem nas assinaturas que a pessoa tem.
- **Cores por canal:** cada canal usa a cor de uma barra do teste de imagem (CH 01 cinza, CH 02 amarelo, CH 03 ciano e assim por diante).
- **Movimento reduzido:** com `prefers-reduced-motion` ativado, nenhuma dessas animações roda.

## Tecnologias

- React 19 + Vite
- React Router 7
- React Icons (pacote Phosphor)
- GSAP
- CSS puro
- Vercel

## API

[The Movie Database (TMDB)](https://developer.themoviedb.org/). Dados de streaming fornecidos pela JustWatch.

Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.

## Documentação (Spec Driven Development)

- [Requisitos](docs/requirements.md)
- [Arquitetura](docs/architecture.md)
- [Referências visuais](docs/references/references.md)

## Uso de IA

O projeto seguiu o Spec Driven Development. A spec (requisitos, arquitetura e referências) e o código foram elaborados pelo grupo com apoio de IA na redação, na implementação e na revisão. As decisões de produto, escopo, visual e técnicas foram tomadas pelo grupo, e todo o código foi revisado pelos integrantes.

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
2. Na Vercel, clique em **Add New > Project** e importe o repositório. O Vite é detectado sozinho (build `npm run build`, saída `dist`).
3. Antes do deploy, abra **Environment Variables** e cadastre as duas variáveis:
   - `VITE_API_URL` com o valor `https://api.themoviedb.org/3/`
   - `VITE_TMDB_KEY` com a chave do TMDB
4. Clique em **Deploy**.
5. Se alguma variável for criada ou alterada depois, vá em **Deployments** e faça **Redeploy**, porque as variáveis entram no build.
6. Para conferir o `vercel.json`, abra direto um endereço como `/titulo/filme/693134` e recarregue a página: o título tem que abrir, sem erro 404.

## Links

- Site: https://cp04-webdev.vercel.app
- Repositório: https://github.com/Vitor-Borin/CP04-WebDev

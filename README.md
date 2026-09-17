# Onde Passa

Plataforma web responsiva para descobrir onde assistir filmes e séries no Brasil, usando os streamings que você já assina como canais de uma TV.

## Integrantes

| Nome | RM |
|---|---|
| [Nome] | [RM] |
| [Nome] | [RM] |
| [Nome] | [RM] |

## Problema

Quem assina mais de um streaming perde tempo abrindo app por app para saber onde um título está, e muitas vezes aluga algo que já estava incluso em uma assinatura. Com o fim do TV Time, essa busca ficou espalhada.

## Solução

A pessoa marca os streamings que assina e eles viram canais de um controle remoto. Ela pode zapear pelo catálogo de cada canal ou buscar um título e ver onde ele passa, separando o que já está no seu controle do que precisa ser alugado ou comprado.

## Funcionalidades

- **Meus canais:** escolher os streamings assinados (salvos no navegador)
- **Zapping:** trocar de canal no controle remoto e ver o catálogo de cada streaming
- **Busca:** encontrar filmes e séries pelo nome
- **Onde passa:** página do título com No seu controle, Em outros canais, Aluguel e Compra

## Tecnologias

- React + Vite
- React Router
- React Icons (Phosphor)
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
git clone [url-do-repositorio]
cd onde-passa
npm install
```

Crie um arquivo `.env` na raiz com base no `.env.example` e coloque sua chave do TMDB:

```
VITE_API_URL=https://api.themoviedb.org/3/
VITE_TMDB_KEY=sua_chave
```

```bash
npm run dev
```

## Links

- Site: [link da Vercel]
- Repositório: [link do GitHub]

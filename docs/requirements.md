# Requirements — MovieOn

## 1. Visão do Produto

### Nome
MovieOn

### Problema
Quem assina mais de um streaming perde tempo abrindo app por app para descobrir onde um filme ou série está disponível. Muitas vezes a pessoa acaba alugando um título que já estava incluso em uma assinatura que ela paga. Com o fim do TV Time, essa busca ficou espalhada entre o Google e os apps de cada serviço.

### Público
Pessoas de 18 a 35 anos, no Brasil, que pagam dois ou mais serviços de streaming e escolhem o que assistir na hora (por exemplo, sexta à noite), sem querer gastar a mais.

### Proposta de solução
Uma plataforma web responsiva com cara de TV. A pessoa marca os streamings que assina e eles viram canais de um controle remoto. Ela pode:

- zapear pelos canais para ver o que está passando em cada serviço;
- buscar um título e ver em qual canal ele passa, separando o que já está incluso nas assinaturas dela do que precisa ser alugado ou comprado.

## 2. Objetivo do MVP

Ao final do projeto deve ser possível escolher os canais, zapear pelo catálogo de cada canal, buscar um filme ou série e abrir a página do título mostrando onde assistir no Brasil. O site deve estar publicado na Vercel e consumindo a API do TMDB.

## 3. Funcionalidades

### F01 — Meus canais

**User story:** Como pessoa que assina alguns streamings, quero marcar os serviços que pago, para ver só o que já está disponível para mim.

**Descrição:** lista os streamings mais conhecidos no Brasil (API do TMDB) e a pessoa marca os que assina. A seleção fica salva no navegador.

**Critérios de aceitação:**
- [x] A lista mostra logo e nome dos streamings mais conhecidos no Brasil (lista nas Regras do Produto), vindos da API com `watch_region=BR`
- [x] Clicar em um streaming marca ou desmarca, com mudança visual clara
- [x] A seleção continua depois de recarregar a página
- [x] O contador mostra "X canais sintonizados"
- [x] O botão "Ligar a TV" só fica ativo com pelo menos 1 canal marcado e leva ao primeiro canal

**Estados:**
- [x] Inicial: nenhum canal marcado, botão "Ligar a TV" desativado
- [x] Carregando: grade com blocos de chiado no lugar dos logos
- [x] Sucesso: grade de streamings clicáveis
- [x] Vazio: "Nenhum streaming encontrado para o Brasil. Tente de novo mais tarde."
- [x] Erro: "Sem sinal. Não conseguimos carregar os streamings. Verifique sua conexão e tente de novo."

### F02 — Zapping

**User story:** Como pessoa sem ideia do que assistir, quero trocar de canal e ver o catálogo de cada streaming que assino, para escolher algo sem abrir vários apps.

**Descrição:** tela de TV que mostra o catálogo do canal atual (títulos populares daquele streaming no Brasil). O controle remoto troca de canal entre os canais escolhidos.

**Critérios de aceitação:**
- [x] A rota `/canal/:providerId` carrega os títulos daquele streaming
- [x] CH+ e CH- vão para o próximo e o anterior canal da lista da pessoa; do último volta para o primeiro
- [x] Ao trocar de canal, aparece a transição de chiado
- [x] O OSD mostra o número e o nome do canal (ex.: "CH 02 · Prime Video")
- [x] O botão Filmes/Séries alterna o tipo de catálogo
- [x] Clicar em um pôster abre `/titulo/:tipo/:id`
- [x] Um canal que não está na lista da pessoa também abre, com o OSD "CH -- · Fora do seu controle"
- [x] Na Home, "Sua grade" lista os canais escolhidos na ordem, e cada um abre o seu canal

**Estados:**
- [x] Inicial: TV liga com a animação de linha horizontal
- [x] Carregando: chiado na tela
- [x] Sucesso: grade de pôsteres
- [x] Vazio (sem canais escolhidos): "Sua TV ainda não tem canais. Escolha os streamings que você assina." + link para `/canais`
- [x] Vazio (canal sem títulos): "Nada passando neste canal agora. Troque de canal no controle."
- [x] Erro: tela escura de TV sem sinal com "Sem sinal. Não conseguimos carregar este canal. Tente trocar de canal ou recarregar."

### F03 — Busca por título

**User story:** Como pessoa que já sabe o que quer ver, quero buscar o filme ou a série pelo nome, para chegar rápido na página do título.

**Descrição:** campo "Sintonize um título" que busca filmes e séries pelo nome.

**Critérios de aceitação:**
- [x] Ao sintonizar com menos de 2 caracteres, a busca não acontece e aparece o aviso "Sinal fraco. Digite pelo menos 2 letras para sintonizar."
- [x] A rota `/busca/:termo` mostra os resultados com pôster, nome, ano e tipo (Filme ou Série), e o total de resultados ao lado do termo
- [x] Resultados de pessoas (atores, diretores) não aparecem
- [x] Título sem pôster mostra um placeholder de barras coloridas
- [x] Clicar em um resultado abre `/titulo/:tipo/:id`

**Estados:**
- [x] Inicial: campo vazio com o placeholder "Sintonize um título"
- [x] Carregando: chiado nos cards
- [x] Sucesso: lista de resultados
- [x] Vazio: "Nada passando com o nome "{termo}". Confira a grafia ou tente o título original."
- [x] Erro: "Sem sinal. A busca não respondeu. Tente de novo em instantes."

### F04 — Onde passa (detalhe do título)

**User story:** Como assinante de mais de um streaming, quero ver onde um título passa separado entre incluso, aluguel e compra, para não pagar por algo que já está na minha assinatura.

**Descrição:** página do título com sinopse, ano, nota e onde assistir no Brasil, separado pelo tipo de acesso.

**Critérios de aceitação:**
- [x] A rota `/titulo/:tipo/:id` aceita `filme` ou `serie`
- [x] O título mostra ano, tipo, duração (ou número de temporadas, na série), gêneros, nota do TMDB e a frase de divulgação, quando a API tiver
- [x] A seção "No seu controle" mostra as assinaturas que a pessoa marcou e que têm o título
- [x] A seção "Em outros canais" mostra as assinaturas que a pessoa não tem
- [x] As seções "Aluguel" e "Compra" aparecem separadas e com menos destaque
- [x] O crédito "Dados de streaming: JustWatch" fica visível perto das seções
- [x] O botão "Voltar" leva à tela anterior do fluxo (canal ou busca)

**Estados:**
- [x] Carregando: chiado no lugar do backdrop e das seções
- [x] Sucesso: detalhe completo
- [x] Vazio: "Este título não passa em nenhum canal no Brasil agora."
- [x] Erro: "Sem sinal. Não encontramos este título. Volte e tente outro."

## 4. Regras do Produto

- Região fixa Brasil (`watch_region=BR`) e idioma `pt-BR`.
- Meus canais mostra só os streamings mais conhecidos no Brasil: Netflix, Prime Video, Apple TV, Disney+, Looke, Paramount+, HBO Max, Apple TV Store, Globoplay, Crunchyroll e Amazon Video. Os outros que a API devolve ficam de fora.
- Os canais seguem a ordem em que foram marcados: o primeiro marcado é o CH 01.
- Conteúdo adulto não aparece (`include_adult=false`).
- Todo lugar que mostra onde assistir tem o crédito da JustWatch (exigência do TMDB).
- Não há cadastro nem login: os canais ficam salvos só no navegador.
- Com `prefers-reduced-motion` ativado, nenhuma animação roda: o chiado fica parado e a TV já aparece ligada.
- O site usa sempre os mesmos termos: "canal" é um streaming que a pessoa assina e "No seu controle" é o que está incluso nas assinaturas dela.

## 5. Fora do Escopo

- Login, contas e sincronização entre dispositivos
- Acompanhar episódios e temporadas assistidas
- Avaliações, comentários e comunidade
- Link direto para o player do streaming (a API não fornece)
- Preço de aluguel e compra (a API não fornece)
- Alertas de lançamento

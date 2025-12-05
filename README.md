# Projeto: **É Crypto**

> Portal para coletar, organizar e exibir notícias, informações e curiosidades do universo das criptomoedas.

---

## Visão Geral

**É Crypto** é um portal que agrega conteúdo sobre criptomoedas por meio de pipelines de mineração (web scraping). Spiders especializadas coletam artigos e curiosidades de múltiplas fontes confiáveis para apresentar ao usuário informação normalizada, categorizada e facilmente navegável — voltado tanto para iniciantes quanto para entusiastas.

---

## Resumo Rápido

* **Público-alvo:** público geral (com ou sem conhecimento prévio).
* **Escopo inicial:** coleta e exibição de notícias e curiosidades; validação do pipeline de mineração.
* **Status atual:** desenvolvimento dos spiders e definição da arquitetura de dados.

---

## Equipe

| Nome                             | Matrícula | GitHub         |             Email              |
| -------------------------------- | --------- | -------------- | ------------------------------ |
| Arthur Souto Santos              | 222006570 | arthursouto09  | arthur090810@gmail.com         |
| João Paulo da Silva Pereira      | 241025784 | ---            | —                              |
| Leonardo Rodrigues Martins       | 211062105 | Antedeguemon21 | leonardo.2003martins@gmail.com |
| Lucas Emanuel Costa dos Santos   | 222006140 | Tsuki Raiito   | lucasemanuel.hudy@gmail.com    |
| Vitor Evangelista da Silva Alves | 221038140 | SemC0indicação | evangelistav92@gmail.com       |


---

## Mudança de Tema do Projeto

Este projeto originalmente tinha como tema **“É Fake”**, focado na análise e verificação de notícias falsas.  
Contudo, ao longo do desenvolvimento, o tema foi atualizado para **“É Crypto”**, passando a abordar coleta e organização de conteúdos sobre criptomoedas.  

Esta seção existe apenas para registrar oficialmente essa mudança de escopo no histórico do projeto.

---

## Como Rodar o Projeto

Pré-Requisitos
python 3.11+
Git
navegador
Live server(extensão do VScode)

Intalação do scrapy
```bash
pip install scrapy

#depois de instalado, confira se correu tudo certo
scrapy --version
```

Crie um ambiente virtual

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate

#Agora inicie ele

#Windows
venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate
```

Instale dependências

```bash
pip install scrapy itemadapter
```
Agora basta clonar o repositório pelo Git


Executando o projeto
```bash

#Faça a raspagem com o scrapy
scrapy crawl coindesk

#Entre no diretório de gravação das raspagens
cd 2025-2-Squad12\BACKEND\coindesk_scraper\data

#Inicie um servidor local pelo python
python -m https.server 8000

#inicie o frontend com o live server 
FRONTEND\index.html

#Clique em "buscar noticias"

```

## Links Importantes

* **Protótipo no Figma:** [Figma — GRUPO 12 — É-CRYPTO](https://www.figma.com/board/gPmz4LuhI7kQ9tcnGLQGlx/GRUPO-12---É-CRIPTO?node-id=0-1&p=f&t=3xEwZgVGTQQaDtm6-0)

---

# Projeto: **É Crypto**

> Portal para coletar, organizar e exibir notícias, informações e curiosidades do universo das criptomoedas.

---

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)]() [![License](https://img.shields.io/badge/license-A%20definir-lightgrey)]()

## Visão Geral

**É Crypto** é um portal que agrega conteúdo sobre criptomoedas por meio de pipelines de mineração (web scraping). Spiders especializadas coletam artigos e curiosidades de múltiplas fontes confiáveis para apresentar ao usuário informação normalizada, categorizada e facilmente navegável — voltado tanto para iniciantes quanto para entusiastas.

---

## Resumo Rápido

* **Público-alvo:** público geral (com ou sem conhecimento prévio).
* **Escopo inicial:** coleta e exibição de notícias e curiosidades; validação do pipeline de mineração.
* **Status atual:** desenvolvimento dos spiders e definição da arquitetura de dados.

---

## Objetivos

* Implementar **pipelines de scraping** capazes de extrair conteúdo de diversos sites confiáveis.
* **Normalizar, categorizar e armazenar** dados com metadados (título, texto limpo, data, autor, URL, categoria).
* Desenvolver **API backend** e **frontend** para navegação e consumo de conteúdo.
* Criar **sistema de feedback/votação** para avaliar qualidade das notícias.
* Documentar e garantir **reprodutibilidade** (scripts, testes, versionamento).

---

## Roadmap / Melhorias em Andamento

* [x] Desenvolvimento dos spiders iniciais (Scrapy).
* [ ] Migração do armazenamento inicial (CSV) para banco relacional (PostgreSQL/MySQL).
* [ ] Protótipo do frontend (Figma).
* [ ] Sistema de votação de notícias (positivo/negativo).
* [ ] Normalização automática de texto coletado.
* [ ] Criação da API entre backend e frontend.
* [ ] Testes automatizados e CI.

---

## Tarefas (organização do README e reestilização)

* [x] Reorganizar o conteúdo em seções claras.
* [x] Formatar Markdown com títulos, listas e tabelas.
* [x] Incluir checklist de progresso.
* [ ] Documentar pré-requisitos e passos de instalação.
* [ ] Adicionar exemplos de execução dos spiders e endpoints da API.
* [ ] Padronizar templates de issues / PRs.

---

## Ferramentas e Tecnologias (sugestão atual)

* **Linguagem:** Python
* **Scraping / Crawling:** Scrapy
* **NLP / Processamento de texto:** (a definir — ex.: spaCy, NLTK)
* **Banco de dados:** CSV (inicial) → PostgreSQL / MySQL (futuro)
* **Backend / API:** Flask ou FastAPI (a definir)
* **Frontend:** React (proposta)
* **Versionamento:** Git & GitHub (issues / PRs / templates)
* **Design / Organização:** Figma, Trello / Notion

---

## Estrutura sugerida do repositório

```
/.
├─ backend/
│  ├─ app/
│  ├─ requirements.txt
│  └─ README.md
├─ spiders/
│  ├─ scrapy_project/
│  └─ README.md
├─ frontend/
│  ├─ src/
│  └─ README.md
├─ data/
│  ├─ raw/
│  └─ processed/
├─ docs/
├─ tests/
└─ README.md
```

---

## Equipe

| Nome                             | GitHub                                              |
| -------------------------------- | --------------------------------------------------- |
| Leonardo Rodrigues Martins       | [Antedeguemon21](https://github.com/Antedeguemon21) |
| Lucas Emanuel Costa dos Santos   | [TsukiRaiito](https://github.com/TsukiRaiito)       |
| João Paulo da Silva Pereira      | (GitHub a adicionar)                                |
| Vitor Evangelista da Silva Alves | [SemC0ndicao](https://github.com/SemC0ndicao)       |
| Arthur Souto Santos              | [arthursouto09](https://github.com/arthursouto09)   |

---

## Links Importantes

* **Protótipo no Figma:** [Figma — GRUPO 12 — É-CRYPTO](https://www.figma.com/board/gPmz4LuhI7kQ9tcnGLQGlx/GRUPO-12---É-CRIPTO?node-id=0-1&p=f&t=3xEwZgVGTQQaDtm6-0)

---

## Como Contribuir

1. Faça um **fork** do repositório.
2. Crie uma branch: `feature/nome-da-feature` ou `fix/descricao`.
3. Abra um **Pull Request** descrevendo as mudanças, testes e link para a issue.
4. Atualize a seção **Roadmap / Melhorias em Andamento** com a tarefa correspondente.

**Modelos/boa prática:** usar templates para issues e PRs; incluir checklist de revisão nos PRs.

---

## Pré-requisitos & Guia Rápido (placeholder a ser detalhado)

* Configurar ambiente Python (virtualenv / venv / pyenv).
* Instalar dependências (ex.: `pip install -r requirements.txt`).
* Como executar spiders (ex.: `scrapy crawl nome_spider`).
* Como iniciar o backend (ex.: `uvicorn app.main:app --reload` / `flask run`).
* Como iniciar o frontend (ex.: `npm install && npm start`).

(Detalhes completos e exemplos serão adicionados conforme a evolução do projeto.)

---

## Testes, CI e Versionamento

* Implementar testes unitários e de integração para spiders, pipelines e API.
* Configurar CI (GitHub Actions) para rodar linters, testes e builds.
* Versionamento semântico para releases.

---

## Licença

A definir.

---

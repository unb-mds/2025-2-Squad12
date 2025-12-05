## Arquitetura da Solução

O **É Crypto** é organizado em três partes principais:

- **Frontend (FRONTEND/)**  
  Página web estática em HTML/CSS/JS que o usuário acessa pelo navegador. Ela consome a API do backend para exibir as notícias sobre criptomoedas.

- **Backend / API (BACKEND/server.py)**  
  Aplicação em **Flask** que lê os dados coletados pelos spiders (arquivos JSON) e expõe endpoints como `/data`, usados pelo frontend para obter as notícias de forma estruturada.

- **Coleta de Dados (BACKEND / Scrapy)**  
  Spiders em **Scrapy** que fazem web scraping em sites de notícias de criptomoedas, extraem campos relevantes (título, data, link, fonte etc.) e salvam tudo em arquivos JSON que o backend utiliza.

O fluxo geral é: **Scrapy coleta → salva em JSON → Flask lê e expõe via API → frontend consome e exibe ao usuário.**

![Arquitetura do É Crypto](img/arquitetura.png)

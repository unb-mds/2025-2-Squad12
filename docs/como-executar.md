## Como Executar o Projeto

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

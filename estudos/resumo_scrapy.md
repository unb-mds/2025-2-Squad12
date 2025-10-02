# 🕷️ Conceitos do Scrapy

## 📦 Response
`response` é o objeto gerado após a raspagem da página.

## 🔗 Response.follow
`response.follow` é o método para seguir links e continuar raspando páginas. Ele aceita um link e o método de callback que será aplicado à resposta dessa nova página. É assim que construímos a navegação da nossa Spider.

## 🎯 XPath ou CSS Selector
Os dois servem para buscar coisas específicas no .xml ou .html por meio das tags.

**Exemplos:**
```python
response.xpath('//h1/text()').get()
response.css('h1::text').get()

## 📝 Items
É onde são salvos os conteúdos retirados. Você cria as variáveis para cada coisa que quer guardar. Quando for fazer o scrap, a spider vai criar uma instância da classe de item que você salvou e vai usar ela pra salvar os dados.

## 🔄 Pipeline
É uma funcionalidade do Scrapy para processar dados antes de salvá-los, seja em um banco de dados ou um arquivo .csv.

**Funcionamento:**
- No arquivo `settings.py` você especifica quais pipelines estão ativos e qual será a ordem de execução
- Cada pipeline é uma classe que define métodos para processar os itens
- O pipeline pode ser configurado para salvar em vários formatos e destinos por meio da configuração prévia ou por linha de comando direto

## 🤖 Robots.txt
`robots.txt` é um arquivo que instrui robôs (como as spiders) a ignorar certas áreas de uma página. Você pode configurar a spider para obedecê-lo habilitando o comando `ROBOTSTXT_OBEY` presente no `settings.py`.

**Observação:** Vou ignorar esse arquivo e os CAPTCHAs por enquanto.
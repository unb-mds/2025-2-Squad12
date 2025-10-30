from spider0.items import Spider0Item
import scrapy


class CoindeskSpider(scrapy.Spider):
    name = "coindesk"
    allowed_domains = ["coindesk.com"]
    start_urls = ["https://www.coindesk.com/latest-crypto-news"]

    def parse(self, response):
        for href in response.css('article h2 a::attr(href)').extract():
            yield response.follow(href, self.parse_article)
        
        titulo = response.css('h1::text').get()
        yield {
        'titulo': titulo
        }

        item = Spider0Item()
        item['nome'] = response.css('h1.nome-produto::text').get()
        item['preco'] = response.css('span.preco-produto::text').get()
        item['descricao'] = response.css('div.descricao-produto p::text').get()
        yield item
    
    

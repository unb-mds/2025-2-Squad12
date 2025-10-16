import scrapy


class MetropolesSpider(scrapy.Spider):
    name = "metropoles"
    allowed_domains = ["metropoles.com"]
    start_urls = ["https://www.metropoles.com/distrito-federal"]

    def parse(self, response):
        for href in response.css('article h2 a::attr(href)').extract():
            yield response.follow(href, self.parse_article)
        
        titulo = response.css('h1::text').get()
        yield {
        'titulo': titulo
    }
    

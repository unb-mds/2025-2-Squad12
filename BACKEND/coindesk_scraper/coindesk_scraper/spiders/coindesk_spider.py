# coindesk_scraper/spiders/coindesk_spider.py
import scrapy
from datetime import datetime

class CoindeskSpider(scrapy.Spider):
    name = 'coindesk'
    allowed_domains = ['coindesk.com']

    custom_settings = {
        'FEED_EXPORT_INDENT': 2,  # ← Indentação bonita
        'FEED_FORMAT': 'json',
        'FEED_URI': 'primeira_noticia_%(time)s.json'
    }
    
    def start_requests(self):
        yield scrapy.Request(
            url='https://www.coindesk.com/pt-br/latest-crypto-news',
            callback=self.parse,
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        )
    
    def parse(self, response):
        """
        Extrai apenas o conteúdo visível da primeira notícia
        """
          
        data = {
            'url': response.url,
            'scraped_at': datetime.now().isoformat(),
            
            
            # PRIMEIRA NOTÍCIA ESPECÍFICA 
            'primeira_noticia': {
                'titulo': self.clean_text(
                    response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/p[1]/a/text()').get()
                ),
                'resumo': self.clean_text(
                    response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a/h2/text()').get()
                    
                ),
                'resumo2': self.clean_text(
                    response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/p[2]/text()').get()
                ),

                'link': response.urljoin(
                    response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a/@href').get() or ''
                )
            },
            
           
        }
        
        
        
        yield data
    
    def clean_text(self, text):
        if not text:
            return 'NÃO ENCONTRADO'
        return ' '.join(text.strip().split())
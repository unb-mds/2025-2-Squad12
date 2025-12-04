# coindesk_scraper/spiders/coindesk_spider.py
import scrapy
from datetime import datetime, timedelta
import urllib.parse

class CoindeskSpider(scrapy.Spider):
    name = 'coindesk'
    allowed_domains = ['coindesk.com']
    
    def start_requests(self):
        yield scrapy.Request(
            url='https://www.coindesk.com/pt-br/latest-crypto-news',
            callback=self.parse
        )
    
    def parse(self, response):
        
        #Extrai apenas o conteúdo visível da primeira notícia
        
        yield {
            'url': response.url,
            'scraped_at': datetime.now().isoformat(),
            
            # CONTEÚDO DA PÁGINA COMPLETA (títulos e parágrafos)
            'page_content': {
                'titulos': [
                     
                    response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/p[1]/a/text()').getall()
                ],
                'paragrafos': [
                     
                    response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a/h2/text()').getall() #[:20] pra pegar os primeiros x parágrafos
                ],
                'links_noticias': [
                    response.urljoin(link)
                    for link in response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a').getall()
                ]
            },
            
            # PRIMEIRA NOTÍCIA ESPECÍFICA
            'primeira_noticia': {
                'titulo': self.clean_text(response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/p[1]/a').get()),
                'resumo': self.clean_text(response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a/h2').get()),
                'link': response.urljoin(
                    response.xpath('(//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a').get() or ''
                )
            }
        }
    
    def clean_text(self, text):
        if not text:
            return ''
        return ' '.join(text.strip().split())
# coindesk_scraper/spiders/coindesk_spider.py
import scrapy
from datetime import datetime

class CoindeskSpider(scrapy.Spider):
    name = 'coindesk'
    allowed_domains = ['coindesk.com']
    
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
        
        # ⚠️ DEBUG: Verifique se a página carregou
        print(f"\n{'='*60}")
        print(f"DEBUG - Status: {response.status}")
        print(f"DEBUG - Tamanho da resposta: {len(response.text)} caracteres")
        print(f"{'='*60}\n")
        
        # Extrair dados usando SEUS XPATHs com correções
        data = {
            'url': response.url,
            'scraped_at': datetime.now().isoformat(),
            
            # CONTEÚDO DA PÁGINA COMPLETA
            'page_content': {
                # SEU XPATH 1: Título da notícia
                'titulo_html': response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/p[1]/a').get(),
                'titulo_texto': self.clean_text(
                    response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/p[1]/a/text()').get()
                ),
                
                # SEU XPATH 2: Subtítulo/Resumo
                'subtitulo_html': response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a/h2').get(),
                'subtitulo_texto': self.clean_text(
                    response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a/h2/text()').get()
                ),
                
                # SEU XPATH 3: Link da notícia
                'link_elemento': response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a').get(),
                'link_href': response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a/@href').get(),
                'link_completo': response.urljoin(
                    response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a/@href').get() or ''
                )
            },
            
            # PRIMEIRA NOTÍCIA ESPECÍFICA (usando SEUS XPATHs)
            'primeira_noticia': {
                'titulo': self.clean_text(
                    response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/p[1]/a/text()').get()
                ),
                'resumo': self.clean_text(
                    response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a/h2/text()').get()
                ),
                'link': response.urljoin(
                    response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a/@href').get() or ''
                )
            },
            
            # DEBUG INFO (para diagnóstico)
            'debug_info': {
                'tem_titulo': bool(response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/p[1]/a').get()),
                'tem_subtitulo': bool(response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a/h2').get()),
                'tem_link': bool(response.xpath('//*[@id="content"]/div/section/div/div[2]/div[1]/div[2]/div/div/a/@href').get()),
                'titulo_pagina': response.xpath('//title/text()').get(),
                'primeiros_100_chars': response.text[:100] if response.text else 'Vazio'
            }
        }
        
        # ⚠️ DEBUG: Mostrar resultados no console
        print(f"RESULTADOS DOS SEUS XPATHs:")
        print(f"1. Título (HTML): {'ENCONTRADO' if data['page_content']['titulo_html'] else 'NÃO ENCONTRADO'}")
        print(f"2. Título (texto): {data['primeira_noticia']['titulo']}")
        print(f"3. Subtítulo (HTML): {'ENCONTRADO' if data['page_content']['subtitulo_html'] else 'NÃO ENCONTRADO'}")
        print(f"4. Subtítulo (texto): {data['primeira_noticia']['resumo']}")
        print(f"5. Link: {data['primeira_noticia']['link']}")
        
        yield data
    
    def clean_text(self, text):
        if not text:
            return 'NÃO ENCONTRADO'
        return ' '.join(text.strip().split())
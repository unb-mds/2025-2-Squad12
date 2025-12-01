# coindesk_scraper/spiders/coindesk_spider.py
import scrapy
from datetime import datetime, timedelta
import urllib.parse

class CoindeskSpider(scrapy.Spider):
    name = 'coindesk'
    allowed_domains = ['coindesk.com']
    
    def start_requests(self):
        # URL da página de notícias recentes do CoinDesk
        base_url = 'https://www.coindesk.com/latest-news/'
        yield scrapy.Request(url=base_url, callback=self.parse_news_list)
    
    def parse_news_list(self, response):
        """
        Extrai links das notícias recentes da página inicial
        """
        # XPath para os links das notícias - ATUALIZE CONFORME O SITE
        news_links = response.xpath('//article//a[contains(@href, "/news/")]/@href').getall()
        
        # Filtrar e normalizar URLs
        for link in news_links:
            if link and '/news/' in link:
                full_url = response.urljoin(link)
                yield scrapy.Request(
                    url=full_url,
                    callback=self.parse_news_article,
                    meta={'original_url': full_url}
                )
        
        # Opcional: Paginação para mais notícias
        # next_page = response.xpath('//a[contains(@class, "next")]/@href').get()
        # if next_page:
        #     yield response.follow(next_page, callback=self.parse_news_list)
    
    def parse_news_article(self, response):
        """
        Extrai dados detalhados de cada artigo de notícia
        """
        # Verificar se a página é válida (não é 404, etc)
        if response.status != 200:
            self.logger.warning(f"Página não acessível: {response.url}")
            return
        
        # Extrair dados usando XPath - ATUALIZE CONFORME O SITE
        item = {
            'url': response.url,
            'original_url': response.meta.get('original_url', ''),
            'title': self.clean_text(response.xpath('//h1//text()').get()),
            'summary': self.clean_text(response.xpath('//meta[@property="og:description"]/@content').get()),
            'content': self.extract_content(response),
            'author': self.clean_text(response.xpath('//a[contains(@class, "author")]//text()').get()),
            'publish_date': self.extract_date(response),
            'categories': self.extract_categories(response),
            'tags': self.extract_tags(response),
            'scraped_at': datetime.now().isoformat()
        }
        
        yield item
    
    def extract_content(self, response):
        """
        Extrai o conteúdo principal do artigo
        """
        # Tentar diferentes seletores XPath para conteúdo
        content_selectors = [
            '//div[contains(@class, "article-body")]//p//text()',
            '//div[contains(@class, "content")]//p//text()',
            '//article//p//text()',
            '//div[@class="main-body"]//p//text()'
        ]
        
        for selector in content_selectors:
            content_parts = response.xpath(selector).getall()
            if content_parts:
                content = ' '.join([self.clean_text(part) for part in content_parts])
                if len(content) > 50:  # Conteúdo válido deve ter mais de 50 chars
                    return content
        
        return ''
    
    def extract_date(self, response):
        """
        Extrai e formata a data de publicação
        """
        date_selectors = [
            '//meta[@property="article:published_time"]/@content',
            '//time/@datetime',
            '//span[contains(@class, "date")]//text()',
            '//div[contains(@class, "timestamp")]//text()'
        ]
        
        for selector in date_selectors:
            date_str = response.xpath(selector).get()
            if date_str:
                return self.clean_text(date_str)
        
        return ''
    
    def extract_categories(self, response):
        """
        Extrai categorias do artigo
        """
        categories = response.xpath('//a[contains(@class, "category")]//text()').getall()
        return [self.clean_text(cat) for cat in categories if self.clean_text(cat)]
    
    def extract_tags(self, response):
        """
        Extrai tags do artigo
        """
        tags = response.xpath('//a[contains(@class, "tag")]//text()').getall()
        return [self.clean_text(tag) for tag in tags if self.clean_text(tag)]
    
    def clean_text(self, text):
        """
        Limpa e normaliza texto
        """
        if not text:
            return ''
        return ' '.join(text.strip().split())
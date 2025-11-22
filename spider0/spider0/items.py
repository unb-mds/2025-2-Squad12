# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class Spider0Item(scrapy.Item):
    titulo = scrapy.Field()
    autor = scrapy.Field()
    data_publicacao = scrapy.Field()
    

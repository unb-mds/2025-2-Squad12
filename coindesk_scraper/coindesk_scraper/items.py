# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

class CoindeskItem(scrapy.Item):
    url = scrapy.Field()
    title = scrapy.Field()
    summary = scrapy.Field()
    content = scrapy.Field()
    author = scrapy.Field()
    publish_date = scrapy.Field()
    categories = scrapy.Field()
    tags = scrapy.Field()
    scraped_at = scrapy.Field()
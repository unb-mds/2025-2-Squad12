import scrapy


class MetropolesSpider(scrapy.Spider):
    name = "metropoles"
    allowed_domains = ["metropoles.com"]
    start_urls = ["https://www.metropoles.com/distrito-federal"]

    def parse(self, response):
        pass

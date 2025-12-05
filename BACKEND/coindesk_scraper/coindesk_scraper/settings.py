import os
from datetime import datetime
# Scrapy settings for coindesk_scraper project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://docs.scrapy.org/en/latest/topics/settings.html
#     https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://docs.scrapy.org/en/latest/topics/spider-middleware.html

# coindesk_scraper/settings.py
BOT_NAME = 'coindesk_scraper'

SPIDER_MODULES = ['coindesk_scraper.spiders']
NEWSPIDER_MODULE = 'coindesk_scraper.spiders'

# Configurações de Robôs.txt
ROBOTSTXT_OBEY = False

# Configurações de Download
DOWNLOAD_DELAY = 1  # 1 segundo entre requisições
CONCURRENT_REQUESTS = 1
CONCURRENT_REQUESTS_PER_DOMAIN = 1

# Headers para parecer um navegador real
DEFAULT_REQUEST_HEADERS = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

# Pipelines para processar dados
ITEM_PIPELINES = {
    'coindesk_scraper.pipelines.CoindeskScraperPipeline': 300,
}

# Criar pasta 'data' se não existir
DATA_DIR = 'data'
os.makedirs(DATA_DIR, exist_ok=True)

# Nome do arquivo com timestamp
filename = f"{DATA_DIR}/C:/Users/pc/Desktop/dev/mds/2025-2-Squad12/FRONTEND/noticias_{datetime.now().strftime('%Y%m%d_%H%M')}.json"

# Configurar exportação
FEED_FORMAT = 'json'
FEED_URI = filename
FEED_EXPORT_INDENT = 2

# Enable and configure the AutoThrottle extension (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/autothrottle.html
#AUTOTHROTTLE_ENABLED = True
# The initial download delay
#AUTOTHROTTLE_START_DELAY = 5
# The maximum download delay to be set in case of high latencies
#AUTOTHROTTLE_MAX_DELAY = 60
# The average number of requests Scrapy should be sending in parallel to
# each remote server
#AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
# Enable showing throttling stats for every response received:
#AUTOTHROTTLE_DEBUG = False

# Enable and configure HTTP caching (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
#HTTPCACHE_ENABLED = True
#HTTPCACHE_EXPIRATION_SECS = 0
#HTTPCACHE_DIR = "httpcache"
#HTTPCACHE_IGNORE_HTTP_CODES = []
#HTTPCACHE_STORAGE = "scrapy.extensions.httpcache.FilesystemCacheStorage"

# Set settings whose default value is deprecated to a future-proof value
FEED_EXPORT_ENCODING = "utf-8"

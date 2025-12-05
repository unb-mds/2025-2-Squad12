# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface

import json
import os
from itemadapter import ItemAdapter


class CoindeskScraperPipeline:
    def process_item(self, item, spider):
        # Processamento adicional pode ser feito aqui
        adapter = ItemAdapter(item)
        
        # Limpar dados vazios
        for field_name in adapter.field_names():
            value = adapter.get(field_name)
            if value in ([], '', None):
                adapter[field_name] = None
        
        return item
    





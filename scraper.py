import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

def scrape_rimi():
    url = "https://www.rimi.ee/epood/ee/otsing?query=energiajook"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    products = []
    for item in soup.select('.product-grid__item'):
        name = item.select_one('.product__name').text.strip()
        price = item.select_one('.product__price--current').text.strip().replace("€", "")
        products.append({
            'name': name,
            'price': float(price),
            'store': 'Rimi'
        })
    return products

def scrape_coop():
    # Lisa sarnane kood Coopi jaoks
    return []

def scrape_selver():
    # Lisa sarnane kood Selveri jaoks
    return []

def save_to_json(data):
    with open('data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    rimi_data = scrape_rimi()
    coop_data = scrape_coop()
    selver_data = scrape_selver()

    combined_data = {
        'last_updated': datetime.now().isoformat(),
        'products': rimi_data + coop_data + selver_data
    }

    save_to_json(combined_data)
    print("Andmed on uuendatud ja salvestatud faili data.json.")

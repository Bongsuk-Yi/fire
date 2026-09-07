#!/usr/bin/env python3
"""
update_market_data.py
주기적으로 Yahoo Finance 및 공공 데이터 소스에서 ETF 및 거시경제 지표 데이터를 수집하여
src/data/etfs.json 및 src/data/macro.json을 자동 업데이트하는 스크립트입니다.
GitHub Actions 워크플로우(.github/workflows/update-data.yml)에서 일일 배치로 자동 실행됩니다.
"""

import json
import os
import urllib.request
import time
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ETFS_FILE = os.path.join(BASE_DIR, 'src', 'data', 'etfs.json')
MACRO_FILE = os.path.join(BASE_DIR, 'src', 'data', 'macro.json')

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

def fetch_yahoo_quote(ticker):
    query_ticker = ticker
    if ticker.isdigit():
        query_ticker = f"{ticker}.KS"

    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{query_ticker}?interval=1d&range=1y"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            result = data.get('chart', {}).get('result', [])
            if not result:
                return None
            meta = result[0].get('meta', {})
            current_price = meta.get('regularMarketPrice')
            prev_close = meta.get('chartPreviousClose')
            
            closes = result[0].get('indicators', {}).get('quote', [{}])[0].get('close', [])
            valid_closes = [c for c in closes if c is not None]
            
            return1Y = None
            if len(valid_closes) >= 2 and valid_closes[0] > 0:
                return1Y = ((valid_closes[-1] - valid_closes[0]) / valid_closes[0]) * 100

            return {
                'price': current_price,
                'prevClose': prev_close,
                'return1Y': return1Y
            }
    except Exception as e:
        print(f"Failed to fetch quote for {ticker}: {e}")
        return None

def update_etfs():
    if not os.path.exists(ETFS_FILE):
        print(f"File not found: {ETFS_FILE}")
        return

    with open(ETFS_FILE, 'r', encoding='utf-8') as f:
        etfs = json.load(f)

    today = datetime.now().strftime('%Y-%m-%d')
    updated_count = 0

    print(f"Updating {len(etfs)} ETFs...")
    for etf in etfs:
        ticker = etf.get('ticker')
        quote = fetch_yahoo_quote(ticker)
        if quote and quote['price'] is not None:
            m = etf.get('metrics', {})
            m['price'] = quote['price']
            if quote['return1Y'] is not None:
                m['return1Y'] = round(quote['return1Y'], 2)
            etf['metrics'] = m
            etf['dataAsOf'] = today
            updated_count += 1
            print(f"Updated {ticker}: price={quote['price']}")
        time.sleep(0.15)

    with open(ETFS_FILE, 'w', encoding='utf-8') as f:
        json.dump(etfs, f, ensure_ascii=False, indent=2)

    print(f"Successfully updated {updated_count} ETFs data.")

def main():
    print(f"Starting market data update job at {datetime.now().isoformat()}")
    update_etfs()
    print("Market data update completed.")

if __name__ == '__main__':
    main()

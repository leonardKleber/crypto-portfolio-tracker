import os
import requests

from dotenv import load_dotenv


load_dotenv()
API_KEY = os.getenv("API_KEY")

HEADERS = { 'x-cg-demo-api-key': API_KEY }
PRICE_URL = "https://api.coingecko.com/api/v3/simple/price"

SUPPORTED_COINS = [
    { "id": "bitcoin", "symbol": "btc", "name": "Bitcoin" },
    { "id": "ethereum", "symbol": "eth", "name": "Ethereum" }
]
PROJECT_CURRENCY = "eur"


"""
This function returns a list of the names of all coins supported by
this project.
"""
def get_supported_coins():
    coins = []
    for coin in SUPPORTED_COINS:
        coins.append(coin["name"])
    return coins


"""
This function returns a list of the current prices of all coins
supported by this project.
"""
def get_current_prices():
    ids = ""
    for coin in SUPPORTED_COINS:
        ids = ids + coin["id"] + ","
    params = { "ids": ids, "vs_currencies": PROJECT_CURRENCY } 
    response = requests.get(PRICE_URL, params=params)
    if response.status_code == 200:
        result = []
        for coin in response.json():
            result.append({
                coin: response.json()[coin][PROJECT_CURRENCY]
            })
        return result
    else:
        return None

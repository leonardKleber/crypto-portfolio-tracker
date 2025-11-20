"""
This file contains all functions used to retrieve data from the CoinGecko API required for the app.
Besides converting timestamps from UNIX to ISO format, the data remains untransformed.
"""
import os
from datetime import datetime as dt
from datetime import timedelta, timezone
import requests
from dotenv import load_dotenv


load_dotenv()
API_KEY = os.getenv("API_KEY")
HEADERS = { 'x-cg-demo-api-key': API_KEY }
API_BASE_URL = "https://api.coingecko.com/api/v3"
SUPPORTED_COINS = [
    { "id": "bitcoin", "symbol": "btc", "name": "Bitcoin" },
    { "id": "ethereum", "symbol": "eth", "name": "Ethereum" }
]
PROJECT_CURRENCY = "eur"


def get_supported_coins():
    """
    This function returns a list of the names of all coins supported by this project.
    """
    coins = []
    for coin in SUPPORTED_COINS:
        coins.append(coin["name"])
    return coins


def convert_price_data_to_iso(prices):
    """
    This function converts timestamps in CoinGecko API price data from UNIX time to ISO format. The
    data is received in the form: [[timestamp, price], [timestamp, price], ...]
    """
    prices_iso = [
        [dt.utcfromtimestamp(ts / 1000).isoformat(), price] for ts, price in prices
    ]
    return prices_iso


def get_current_prices():
    """
    This function returns a list of the current prices of all coins supported by this project.
    """
    ids = ""
    for coin in SUPPORTED_COINS:
        ids = ids + coin["id"] + ","
    params = { "ids": ids, "vs_currencies": PROJECT_CURRENCY }
    response = requests.get(url=API_BASE_URL+"/simple/price", params=params, timeout=300)
    if response.status_code == 200:
        result = {}
        for coin in response.json():
            result[coin] = response.json()[coin][PROJECT_CURRENCY]
        return result
    return None


def get_historic_data(coin_id):
    """
    Retrieves one year of historical price data for a specific coin from the CoinGecko API.
    Note: The free CoinGecko plan only allows access to up to 365 days of historical data.
    """
    response = requests.get(
        url=API_BASE_URL+f"/coins/{coin_id}/market_chart",
        params={
            "vs_currency": PROJECT_CURRENCY,
            "days": 365,
            "interval": "daily",
        },
        headers=HEADERS,
        timeout=300
    )
    if response.status_code == 200:
        prices = response.json()["prices"]
        prices_iso = convert_price_data_to_iso(prices)
        # In this format, the last two items represent the opening
        # price of the current day and the current price. To avoid
        # duplicating the y-values for the current day, we remove the
        # opening price entry, leaving only the current market price.
        del prices_iso[-2]
        return prices_iso
    return None


def get_hourly_day_price(coin_id):
    """
    Retrieves price data from the CoinGecko API over the last 24 hours in 5-minute intervals.
    """
    today = dt.now(timezone.utc)
    yesterday = today - timedelta(days=1)
    today = today.strftime("%Y-%m-%dT%H:%M")
    yesterday = yesterday.strftime("%Y-%m-%dT%H:%M")
    response = requests.get(
        url=API_BASE_URL+f"/coins/{coin_id}/market_chart/range",
        params={
            "vs_currency": PROJECT_CURRENCY,
            "from": yesterday,
            "to": today
        },
        headers=HEADERS,
        timeout=300
    )
    if response.status_code == 200:
        prices = response.json()["prices"]
        return convert_price_data_to_iso(prices)
    return None

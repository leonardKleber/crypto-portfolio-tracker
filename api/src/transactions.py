from .db import get_transactions

from datetime import datetime
from collections import defaultdict


def get_transactions_json(user_id):
    transactions = get_transactions(user_id=user_id)
    sorted_transactions = [
        {
            "asset": t[2],
            "amount": t[3],
            "value": t[4],
            "type": t[5],
            "date": t[6]
        }
        for t in transactions
    ]
    sorted_transactions.sort(key=lambda x: datetime.strptime(x["date"], "%Y-%m-%d"), reverse=True)
    grouped = defaultdict(list)
    for tx in sorted_transactions:
        grouped[tx["date"]].append(tx)
    grouped_list = [{date: grouped[date]} for date in sorted(grouped.keys(), reverse=True)]
    return grouped_list
from .db import get_transactions
from .coingecko import get_current_prices

from collections import defaultdict


class Dashboard:
    def __init__(self, user_id):
        self.user_id = user_id
        self.transactions = get_transactions(user_id=self.user_id)
        self.current_prices = get_current_prices()


    def clean_transactions(self):
        # Remove user ID and transaction ID
        trimmed = [tran[2:] for tran in self.transactions]
        # Group by asset
        grouped = defaultdict(list)
        for tran in trimmed:
            key = tran[0]
            grouped[key].append(tran[1:])
        grouped = dict(grouped)
        return grouped
    

    """
    Average Cost Method
    """
    def avg_cost_asset_performance(self):
        data = self.clean_transactions()
        result = {}
        for asset in data:
            transactions = data[asset]
            total_value = 0
            total_amount = 0
            total_invested = 0 # What the user has invested in total
            realized_return = 0
            for tran in transactions:
                if tran[2] == "buy":
                    total_value = total_value + tran[1]
                    total_amount = total_amount + tran[0]
                    total_invested = total_invested + tran[1]
                else:
                    avg_buy_price = total_value / total_amount
                    sell_value = tran[1]
                    sell_amount = tran[0]
                    # Book realized return
                    cost_basis = avg_buy_price * sell_amount
                    realized_return = realized_return + (sell_value - cost_basis)
                    # Reduce total holdings
                    total_value = total_value - cost_basis
                    total_amount = total_amount - sell_amount
            # Compute unrealized return
            if total_amount > 0:
                current_price = 0
                for entry in self.current_prices:
                    if entry == asset:
                        current_price = self.current_prices[asset]
                avg_buy_price = total_value / total_amount
                current_value = total_amount * current_price
                unrealized_return_abs = current_value - total_value
                unrealized_return_pct = (unrealized_return_abs / total_value) * 100
            return_total_abs = realized_return + unrealized_return_abs
            return_total_pct = return_total_abs / total_invested * 100
            result[asset] = {
                "total_invested": round(total_invested, 2),
                "current_value": round(total_value, 2),
                "current_amount": round(total_amount, 6),
                "realized_return": round(realized_return, 2),
                "unrealized_return_abs": round(unrealized_return_abs, 2),
                "unrealized_return_pct": round(unrealized_return_pct, 2),
                "return_total_pct": round(return_total_pct, 2)
            }
        return result
    

    def get_portfolio_value(self):
        data = self.avg_cost_asset_performance()
        total_value = 0
        for asset in data:
            total_value = total_value + data[asset]["current_value"]
        return total_value
    

    def get_table_data(self):
        data = self.avg_cost_asset_performance()
        portfolio_value = self.get_portfolio_value()
        result = []
        for asset in data:
            allocation = round(
                data[asset]["current_value"] / portfolio_value,
                2
            )
            result.append({
                "name": asset.upper(),
                "amount": data[asset]["current_amount"],
                "value": data[asset]["current_value"],
                "return_total_pct": data[asset]["return_total_pct"],
                "unrealized_return": data[asset]["unrealized_return_pct"],
                "realized_return": data[asset]["realized_return"],
                "allocation": allocation
            })
        return result
    

    def get_eur_per_asset(self):
        data = self.avg_cost_asset_performance()
        result = []
        for asset in data:
            result.append(data[asset]["current_value"])
        return result
    

    def get_assets(self):
        data = self.avg_cost_asset_performance()
        result = []
        for asset in data:
            result.append(asset.upper())
        return result
    

    def get_portfolio_return(self):
        data = self.avg_cost_asset_performance()
        total_invested = sum(a['total_invested'] for a in data.values())
        total_realized = sum(a['realized_return'] for a in data.values())
        total_unrealized = sum(a['unrealized_return_abs'] for a in data.values())
        total_return_abs = total_realized + total_unrealized
        portfolio_return_pct = (total_return_abs / total_invested * 100)
        return {
            "total_return": round(portfolio_return_pct, 2),
            "realized_return": round(total_realized, 2),
        }


    def get_dashboard_data(self):
        portfolio_return = self.get_portfolio_return()
        return {
            "eur_per_asset": self.get_eur_per_asset(),
            "assets": self.get_assets(),
            "portfolio_value": self.get_portfolio_value(),
            "total_return": portfolio_return["total_return"],
            "realized_return": portfolio_return["realized_return"],
            "line_x_data": [
                { 
                    "name": "Portfolio Value", 
                    "data": [-1000.00, -500.00, -1500.00, -2500.00, -500.00, 300.00, 500.00, 800.00, 3000.00, 2500.00, 3500.00, 3200.00, 4000.00, 3800.00, 4500.00]
                }
            ],
            "line_y": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan-2", "Feb-2", "Mar-2"],
            "table_data": self.get_table_data()
        }
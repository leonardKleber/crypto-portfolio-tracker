"""
This file handles all functionality required for the dashboard page.
"""
from collections import defaultdict
from datetime import datetime, timedelta, date
from .db import get_transactions
from .coingecko import get_current_prices, get_historic_data


ASSET_AMOUNT_DECIMALS = 6


class Dashboard:
    """
    This object contains a generated dashboard for a user.
    """
    def __init__(self, user_id):
        self.user_id = user_id
        self.current_prices = get_current_prices()
        self.transactions = get_transactions(user_id=self.user_id)
        self.transactions = self.clean_transactions()
        self.data = self.avg_cost_asset_performance()


    def clean_transactions(self):
        """
        This function transforms the transaction data from a database by grouping transactions by
        assets, and then removing unnecessary entries.
        """
        trimmed = [tran[2:] for tran in self.transactions]
        grouped = defaultdict(list)
        for tran in trimmed:
            key = tran[0]
            grouped[key].append(tran[1:])
        grouped = dict(grouped)
        return grouped


    def avg_cost_asset_performance(self): # pylint: disable=too-many-locals
        """
        This function uses the cleaned transaction data to calculate basic performance metrics for
        each asset, using the Average Cost Method.
        """
        result = {}
        for asset in self.transactions:
            transactions = self.transactions[asset]
            total_value = 0
            total_amount = 0
            total_invested = 0
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
                    cost_basis = avg_buy_price * sell_amount
                    realized_return = realized_return + (sell_value - cost_basis)
                    total_value = total_value - cost_basis
                    total_amount = total_amount - sell_amount
            unrealized_return_abs = 0
            unrealized_return_pct = 0
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
            return_total_pct = (
                return_total_abs / total_invested * 100
                if total_invested > 100 else 0
            )
            result[asset] = {
                "total_invested": total_invested,
                "current_value": total_value,
                "current_amount": total_amount,
                "realized_return": realized_return,
                "unrealized_return_abs": unrealized_return_abs,
                "unrealized_return_pct": unrealized_return_pct,
                "return_total_pct": return_total_pct
            }
        return result


    def get_portfolio_value(self):
        """
        This function retrieves the current overall portfolio value based on the generated
        performance metrics.
        """
        return sum(asset_data["current_value"] for asset_data in self.data.values())


    def get_table_data(self):
        """
        This function generates a JSON object that the frontend transforms into the asset table
        component on the dashboard page.
        """
        portfolio_value = self.get_portfolio_value()
        return [
            {
                "name": asset.upper(),
                "amount": round(asset_data["current_amount"], ASSET_AMOUNT_DECIMALS),
                "value": round(asset_data["current_value"], 2),
                "return_total_pct": round(asset_data["return_total_pct"], 2),
                "unrealized_return": round(asset_data["unrealized_return_pct"], 2),
                "realized_return": round(asset_data["realized_return"], 2),
                "allocation": round(asset_data["current_value"] / portfolio_value, 2)
            }
            for asset, asset_data in self.data.items()
        ]



    def get_eur_per_asset(self):
        """
        This function provides the values of each asset in the portfolio. It is used to build the
        pie chart component on the dashboard page.
        """
        return [round(asset_data["current_value"], 2) for asset_data in self.data.values()]


    def get_assets(self):
        """
        This function provides the names of each asset in the portfolio. It is used to build the
        pie chart component on the dashboard page.
        """
        result = []
        for asset in self.data:
            result.append(asset.upper())
        return result


    def get_portfolio_return(self):
        """
        This function computes the total performance metrics of the entire portfolio instead of
        individual assets.
        """
        total_invested = sum(a['total_invested'] for a in self.data.values())
        total_realized = sum(a['realized_return'] for a in self.data.values())
        total_unrealized = sum(a['unrealized_return_abs'] for a in self.data.values())
        total_return_abs = total_realized + total_unrealized
        portfolio_return_pct = (
            (total_return_abs / total_invested * 100)
            if total_invested > 0 else 0
        )
        return {
            "total_return": round(portfolio_return_pct, 2),
            "realized_return": round(total_realized, 2),
        }


    def get_historic_data(self): # pylint: disable=too-many-locals
        """
        Generates a time series of each asset's value over the past year.

        The function first constructs a historical time series of asset holdings (amount per asset
        by date) and multiplies these holdings by corresponding historical price data for each
        date. It then aggregates the results into a 356-point series representing the portfolio’s
        daily value development over the last year. 

        Note:
        Due to CoinGecko API limitations, the view is restricted to a 1-year period.
        """
        today = date.today()
        result = {}
        for asset in self.transactions:
            trans = sorted(
                self.transactions[asset],
                key=lambda x: datetime.strptime(x[3], "%Y-%m-%d").date()
            )
            start_date = datetime.strptime(trans[0][3], "%Y-%m-%d").date()
            num_days = (today - start_date).days + 1
            daily_holdings = [0.0] * num_days
            current_amount = 0.0
            for amount, _, ttype, tdate in trans:
                tdate = datetime.strptime(tdate, "%Y-%m-%d").date()
                day_index = (tdate - start_date).days
                if ttype == "buy":
                    current_amount = current_amount + amount
                else:
                    current_amount = current_amount - amount
                for i in range(day_index, num_days):
                    daily_holdings[i] = current_amount
            result[asset] = self.scale_to_356_points(daily_holdings)
        prices = {}
        for asset in result:
            prices[asset] = get_historic_data(coin_id=asset)
        scaled_values = {}
        for asset, asset_values in result.items():
            scaled_values[asset] = [
                asset_values[i] * prices[asset][i][1]
                for i in range(356)
            ]
        lists = list(scaled_values.values())
        length = len(lists[0])
        final_time_series = [round(sum(values[i] for values in lists), 2) for i in range(length)]
        return { "x": final_time_series, "y": self.generate_date_list() }


    def scale_to_356_points(self, holdings_list):
        """
        Ensures the holdings list has exactly 356 entries. If shorter, pads with zeros at the
        beginning and if longer, trims from the start (keeps last 356 elements).
        """
        target_length = 356
        current_length = len(holdings_list)
        if current_length == target_length:
            return holdings_list
        if current_length > target_length:
            return holdings_list[-target_length:]
        padding = [0.0] * (target_length - current_length)
        return padding + holdings_list


    def generate_date_list(self, days=356):
        """
        Generates a list of dates ending today and going back `days` days. The most recent date
        (today) is last in the list.
        """
        today = date.today()
        return [(today - timedelta(days=i)).strftime("%Y-%m-%d") for i in range(days - 1, -1, -1)]


    def get_dashboard_data(self):
        """
        This function generates a JSON object that includes all the data required to build the
        entire dashboard page. The API only needs to call this function to retrieve all necessary
        data.
        """
        portfolio_return = self.get_portfolio_return()
        chart_data = self.get_historic_data()
        return {
            "eur_per_asset": self.get_eur_per_asset(),
            "assets": self.get_assets(),
            "portfolio_value": self.get_portfolio_value(),
            "total_return": portfolio_return["total_return"],
            "realized_return": portfolio_return["realized_return"],
            "line_x_data": [{ "name": "Portfolio Value", "data": chart_data["x"] }],
            "line_y": chart_data["y"],
            "table_data": self.get_table_data()
        }

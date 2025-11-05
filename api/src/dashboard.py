from src.db import get_transactions


def get_dashboard_data(user_id):
    return {
        "eur_per_asset": [3000.00, 1500.00],
        "assets": ["Bitcoin", "Ethereum"],
        "portfolio_value": 4500.00,
        "relative_return": 22.22,
        "nominal_return": 1000.00,
        "line_x_data": [
            { 
                "name": "Portfolio Value", 
                "data": [-1000.00, -500.00, -1500.00, -2500.00, -500.00, 300.00, 500.00, 800.00, 3000.00, 2500.00, 3500.00, 3200.00, 4000.00, 3800.00, 4500.00]
            }
        ],
        "line_y": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan-2", "Feb-2", "Mar-2"],
        "table_data": [
            {
                "name": "Bitcoin",
                "amount": 0.03,
                "value": 3000.00,
                "profit": 500.00,
                "return": 20.00,
                "allocation": 66.66
            },
            {
                "name": "Ethereum",
                "amount": 1,
                "value": 1500.00,
                "profit": 500.00,
                "return": 14.00,
                "allocation": 33.34
            },
        ]
    }

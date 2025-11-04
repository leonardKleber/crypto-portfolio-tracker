import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import SummaryTable from "../components/SummaryTable";
import Table from "../components/Table"
import "../styles/Dashboard.css"

const CHART_HEIGHT = 400
const LINE_CHART_WIDTH = 600

const BUTTON_ROW_WIDTH = 400
const BUTTON_WIDTH = BUTTON_ROW_WIDTH / 8
const BUTTON_MARGIN_RIGHT = (BUTTON_ROW_WIDTH - BUTTON_WIDTH * 4) / 3

export default function Dashboard() {
  const api_data = {
    "eur_per_asset": [3000.00, 1500.00],
    "assets": ["Bitcoin", "Ethereum"],
    "portfolio_value": 4500.00,
    "relative_return": 22.22,
    "nominal_return": 1000.00,
    "line_x_data": [
      { 
        name: "Portfolio Value", 
        data: [-1000, -500, 0, 200, 500, 300, 500, 800, 3000, 2500, 3500, 3200, 4000, 3800, 4500]
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

  return (
    <div>
      <h1 className="heading-one">Dashboard</h1>

      <div style={{ display: "flex", gap: "50px" }}>
        <PieChart 
          chartHeight={CHART_HEIGHT} 
          pieSeries={api_data.eur_per_asset}
          pieLabels={api_data.assets}
          totalValue={api_data.portfolio_value}
        />

        <div style={{ width: `${LINE_CHART_WIDTH}px` }}>
          <LineChart 
            chartHeight={CHART_HEIGHT}
            lineChartWidth={LINE_CHART_WIDTH}
            lineSeries={api_data.line_x_data}
            categories={api_data.line_y}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              style={{ width: `${BUTTON_WIDTH}px`, marginRight: `${BUTTON_MARGIN_RIGHT}px` }}
              className="left-button"
            >
              1W
            </button>
            <button 
              style={{ width: `${BUTTON_WIDTH}px`, marginRight: `${BUTTON_MARGIN_RIGHT}px` }}
              className="middle-button"
            >
              1M
            </button>
            <button 
              style={{ width: `${BUTTON_WIDTH}px`, marginRight: `${BUTTON_MARGIN_RIGHT}px` }}
              className="middle-button"
            >
              1Y
            </button>
            <button 
              style={{ width: `${BUTTON_WIDTH}px` }}
              className="middle-button"
            >
              All
            </button>
          </div>
        </div>
      </div>
    
      <SummaryTable
        chartHeight={CHART_HEIGHT}
        portfolio_value={api_data.portfolio_value}
        relative_return={api_data.relative_return}
        nominal_return={api_data.nominal_return}
      />

      <h1 className="heading-two">Holdings</h1>

      <Table 
        table_data={api_data.table_data}
      />

    </div>
  );
}

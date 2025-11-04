import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import SummaryTable from "../components/SummaryTable";
import "../styles/Dashboard.css"

const CHART_HEIGHT = 400
const LINE_CHART_WIDTH = 600

const BUTTON_ROW_WIDTH = 400
const BUTTON_WIDTH = BUTTON_ROW_WIDTH / 8
const BUTTON_MARGIN_RIGHT = (BUTTON_ROW_WIDTH - BUTTON_WIDTH * 4) / 3

export default function Dashboard() {
  const api_data = {
    "eur_per_asset": [44.25, 55.25, 13.25, 43.25],
    "assets": ["Apples", "Bananas", "Cherries", "Dates"],
    "portfolio_value": 155.10,
    "relative_return": 20.20,
    "nominal_return": 2.25,
    "line_x_data": [
      { 
        name: "Portfolio Value", 
        data: [-10.15, -5.22, -4.25, -8.55, -5.09, -1.64, 24.76, 23.12, 30.64, 28.75, 27.42, 25.54, 36.65, 39.12, 45.66]
      }
    ],
    "line_y": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan-2", "Feb-2", "Mar-2"]
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "50px" }}>
        Dashboard
      </h1>

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
    </div>
  );
}

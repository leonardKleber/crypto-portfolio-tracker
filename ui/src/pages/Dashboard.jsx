import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";

const CHART_HEIGHT = 400
const LINE_CHART_WIDTH = 600

const BUTTON_ROW_WIDTH = 400
const BUTTON_WIDTH = BUTTON_ROW_WIDTH / 10
const BUTTON_MARGIN_RIGHT = (BUTTON_ROW_WIDTH - BUTTON_WIDTH * 4) / 3

export default function Dashboard() {
  // Values that I will need from API
  const pieSeries = [44, 55, 13, 43];
  const pieLabels = ["Apples", "Bananas", "Cherries", "Dates"];
  const totalValue = 155;
  const totalReturn = 20;
  const nominalReturn = 2;
  const lineSeries = [
    {
      name: "Portfolio Value",
      data: [10, 41, 35, 51, 49, 62, 69, 75, 800, 950, 110, 120, 130, 125, 140],
    }
  ];
  const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan-2", "Feb-2", "Mar-2"]
  // Values that I will need from API

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "50px" }}>
        Dashboard
      </h1>

      <div style={{ display: "flex", gap: "50px" }}>
        <PieChart 
          chartHeight={CHART_HEIGHT} 
          pieSeries={pieSeries}
          pieLabels={pieLabels}
          totalValue={totalValue}
        />

        <div style={{ width: `${LINE_CHART_WIDTH}px` }}>
          <LineChart 
            chartHeight={CHART_HEIGHT}
            lineChartWidth={LINE_CHART_WIDTH}
            lineSeries={lineSeries}
            categories={categories}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={{
              width: `${BUTTON_WIDTH}px`,
              marginRight: `${BUTTON_MARGIN_RIGHT}px`,
              marginLeft: "100px",
              fontSize: "1rem",
              backgroundColor: "var(--app-color-950)",
              border: "2px solid var(--app-color-600)",
              borderRadius: "4px",
              color: "var(--app-color-50)",
              fontFamily: "Arial, sans-serif"
            }}>
              1W
            </button>
            <button style={{
              width: `${BUTTON_WIDTH}px`,
              marginRight: `${BUTTON_MARGIN_RIGHT}px`,
              fontSize: "1rem",
              backgroundColor: "var(--app-color-950)",
              border: "2px solid var(--app-color-600)",
              borderRadius: "4px",
              color: "var(--app-color-50)",
              fontFamily: "Arial, sans-serif"
            }}>
              1M
            </button>
            <button style={{
              width: `${BUTTON_WIDTH}px`,
              marginRight: `${BUTTON_MARGIN_RIGHT}px`,
              fontSize: "1rem",
              backgroundColor: "var(--app-color-950)",
              border: "2px solid var(--app-color-600)",
              borderRadius: "4px",
              color: "var(--app-color-50)",
              fontFamily: "Arial, sans-serif"
            }}>
              1Y
            </button>
            <button style={{
              width: `${BUTTON_WIDTH}px`,
              fontSize: "1rem",
              backgroundColor: "var(--app-color-950)",
              border: "2px solid var(--app-color-600)",
              borderRadius: "4px",
              color: "var(--app-color-50)",
              fontFamily: "Arial, sans-serif"
            }}>
              All
            </button>
          </div>
        </div>
      </div>

      <p style={{
        color: "var(--app-color-300)",
        fontSize: "0.75rem",
        fontWeight: "normal",
        marginBottom: "5px"
      }}>
        Total Portolio Value
      </p>
      <p style={{
        marginTop: "5px",
        color: "var(--app-color-50)",
        fontSize: "1.5rem",
        fontWeight: "bold",
      }}>
        {totalValue}€
      </p>

      <p style={{
        color: "var(--app-color-300)",
        fontSize: "0.75rem",
        fontWeight: "normal",
        marginBottom: "5px"
      }}>
        Relative Portfolio Performance
      </p>
      <p style={{
        color: "var(--app-color-50)",
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginTop: "5px",
      }}>
        {totalReturn}%
      </p>

      <p style={{
        color: "var(--app-color-300)",
        fontSize: "0.75rem",
        fontWeight: "normal",
        marginBottom: "5px"
      }}>
        Nominal Portfolio Gain
      </p>
      <p style={{
        color: "var(--app-color-50)",
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginTop: "5px",
      }}>
        {nominalReturn}€
      </p>
    </div>
  );
}

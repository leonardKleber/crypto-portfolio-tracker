import Chart from 'react-apexcharts'
import '../styles/PieChart.css'

export default function PieChart ({ chartHeight, pieSeries, pieLabels, totalValue }) {
  const pieOptions = {
    labels: pieLabels,
    stroke: { show: false },
    colors: [
      'var(--accent-color-300)',
      'var(--accent-color-400)',
      'var(--accent-color-500)',
      'var(--accent-color-600)'
    ],
    legend: { show: false },
    dataLabels: { enabled: false }
  }

  return (
    <div className="piechart-wrapper" style={{ width: `${chartHeight}px`, height: `${chartHeight}px` }}>
      <Chart
        options={pieOptions}
        series={pieSeries}
        type="donut"
        width={chartHeight}
        height={chartHeight}
      />
      <div className="piechart-center">
        <div className="piechart-value">{totalValue.toFixed(2)}€</div>
        <div className="piechart-label">Total</div>
      </div>
    </div>
  )
}

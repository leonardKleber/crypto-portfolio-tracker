import React, { useEffect, useState } from 'react'
import PieChart from '../components/PieChart'
import LineChart from '../components/LineChart'
import SummaryTable from '../components/SummaryTable'
import Table from '../components/Table'
import '../styles/Dashboard.css'

import { useAuth } from '../AuthContext'

const API_BASE_URL = process.env.REACT_APP_PROJECT_API_URL

const CHART_HEIGHT = 400
const LINE_CHART_WIDTH = 600

// const BUTTON_ROW_WIDTH = 400
// const BUTTON_WIDTH = BUTTON_ROW_WIDTH / 8
// const BUTTON_MARGIN_RIGHT = (BUTTON_ROW_WIDTH - BUTTON_WIDTH * 4) / 3

const DEFAULT_API_DATA = {
  eur_per_asset: [0.00],
  assets: ['N/A'],
  portfolio_value: 0.00,
  relative_return: 0.00,
  nominal_return: 0.00,
  line_x_data: [{ name: 'Portfolio Value', data: [0.00] }],
  line_y: ['N/A'],
  table_data: [{
    name: 'N/A',
    amount: 0.00,
    value: 0.00,
    profit: 0.00,
    return: 0.00,
    allocation: 0.00
  }]
}

export default function Dashboard () {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState(DEFAULT_API_DATA)

  useEffect(() => {
    const fetchDashboardData = async () => {
      const response = await fetch(`${API_BASE_URL}/dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user })
      })

      const data = await response.json()
      setDashboardData(data)
    }

    fetchDashboardData()
  }, [user])

  return (
    <div>
      <h1 className="heading-one">Dashboard</h1>

      <div style={{ display: 'flex', gap: '50px' }}>
        <PieChart
          chartHeight={CHART_HEIGHT}
          pieSeries={dashboardData.eur_per_asset}
          pieLabels={dashboardData.assets}
          totalValue={dashboardData.portfolio_value}
        />

        <div style={{ width: `${LINE_CHART_WIDTH}px` }}>
          <LineChart
            chartHeight={CHART_HEIGHT}
            lineChartWidth={LINE_CHART_WIDTH}
            lineSeries={dashboardData.line_x_data}
            categories={dashboardData.line_y}
          />
          {/*
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
          */}
        </div>
      </div>

      <SummaryTable
        portfolio_value={dashboardData.portfolio_value}
        total_return={dashboardData.total_return}
        realized_return={dashboardData.realized_return}
      />

      <h1 className="heading-two">Holdings</h1>

      <Table
        table_data={dashboardData.table_data}
      />

    </div>
  )
}

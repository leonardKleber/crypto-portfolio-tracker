import React, { useEffect, useState } from 'react'
import PieChart from '../components/PieChart'
import LineChart from '../components/LineChart'
import SummaryTable from '../components/SummaryTable'
import Table from '../components/Table'
import '../styles/Dashboard.css'

import { useAuth } from '../AuthContext'
import { DEFAULT_DASHBOARD_DATA } from '../config/defaultDashboardData'

const API_BASE_URL = process.env.REACT_APP_PROJECT_API_URL
const CHART_HEIGHT = 400
const LINE_CHART_WIDTH = 600

export default function Dashboard () {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState(DEFAULT_DASHBOARD_DATA)

  useEffect(() => {
    const fetchDashboardData = async () => {
      const response = await fetch(`${API_BASE_URL}/dashboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        </div>
      </div>
      <SummaryTable
        portfolioValue={dashboardData.portfolio_value}
        totalReturn={dashboardData.total_return}
        realizedReturn={dashboardData.realized_return}
      />
      <h1 className="heading-two">Holdings</h1>
      <Table tableData={dashboardData.table_data} />
    </div>
  )
}

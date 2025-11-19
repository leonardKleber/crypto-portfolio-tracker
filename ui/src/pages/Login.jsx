import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

import { ReactComponent as CoinGeckoIcon } from '../assets/icons/coingecko.svg'
import { ReactComponent as WaveIcon } from '../assets/transitions/wave.svg'

import '../styles/Login.css'

import Chart from 'react-apexcharts'

const SAMPLE_SERIES = [
  {
    name: 'Portfolio Value',
    data: [100.00, 112.60, 126.90, 159.80, 180.38, 266.92, 354.79, 505.22, 523.06, 610.06, 812.04, 1242.86]
  }
]

const SAMPLE_CATEGORIES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const AREA_OPTIONS = {
  chart: {
    id: 'area-chart',
    toolbar: { show: false },
    height: '300px'
  },
  xaxis: {
    categories: SAMPLE_CATEGORIES,
    labels: { show: false },
    axisTicks: { show: false },
    axisBorder: { show: false }
  },
  yaxis: {
    labels: {
      style: {
        colors: 'var(--app-color-50)',
        fontSize: '0.75rem'
      }
    }
  },
  stroke: { curve: 'smooth', width: 2 },
  colors: ['var(--accent-color-300)'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.6,
      opacityTo: 0,
      stops: [0, 100]
    }
  },
  grid: {
    show: true,
    borderColor: 'var(--app-color-800)',
    xaxis: { lines: { show: false } }
  },
  tooltip: {
    theme: 'dark',
    style: { fontSize: '12px', fontFamily: 'Arial, sans-serif' },
    marker: { show: true }
  },
  dataLabels: { enabled: false }
}

export default function Login () {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [regUsername, setRegUsername] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')
  const [message, setMessage] = useState('')

  const BASE_URL = process.env.REACT_APP_PROJECT_API_URL

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    try {
      const response = await fetch(`${BASE_URL}/add-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: regUsername,
          password: regPassword,
          check_password: checkPassword
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(`Error: ${data.message}`)
      } else {
        setMessage(`Success: User ${regUsername} registered!`)
      }
    } catch (error) {
      setMessage('Network error, please try again.')
      console.error('Error:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(username, password)
    if (success) navigate('/')
  }

  const bottomRef = useRef()

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page-wrapper">
      <section className="screen-section">
        <div className="main-container">
          <div className="sub-main-container">
            <div className="left-container">
              <div className="left-container-heading-div">
                <p style={{ margin: 0, paddingBottom: '0.5rem' }}>Your Crypto.</p>
                <p style={{ margin: 0, paddingBottom: '0.5rem' }}>Your Insights.</p>
                <p style={{ margin: 0, paddingBottom: '0.5rem' }}>One Dashboard.</p>
              </div>

              <div style={{ width: '100%', height: '100%' }}>
                <Chart
                  options={AREA_OPTIONS}
                  series={SAMPLE_SERIES}
                  type="area"
                  height="100%"
                />
              </div>
            </div>

            <div className="right-container">
              <div className="right-container-heading-div">
                <p style={{ margin: 0 }}>
                  Welcome back!
                </p>
              </div>

              <div style={{ width: '100%' }}>
                <form
                  onSubmit={handleSubmit}
                  className="login-form"
                >
                  <label className="login-label">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="login-input-field"
                  />
                  <label className="login-label">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input-field"
                  />
                  <button
                    type="submit"
                    className="login-button"
                  >
                    Log In
                  </button>
                </form>
              </div>

              <hr className="divider-line" />

              <div style={{ width: '100%' }}>
                <p style={{ margin: '0 0 1rem 0' }}>
                  Don’t have an account yet?
                </p>
                <button
                  type="button"
                  className="register-button"
                  onClick={scrollToBottom}
                >
                  Register
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%'
                }}
              >
                <p style={{ margin: 0, color: 'var(--app-color-400)' }}>Powered by </p>
                <CoinGeckoIcon style={{
                  width: '6rem',
                  height: '6rem',
                  color: 'var(--app-color-400)',
                  display: 'inline-block',
                  verticalAlign: 'middle',
                  transform: 'translateY(1px)'
                }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="screen-section second-section" ref={bottomRef}>
        <WaveIcon className="top-wave-absolute" />

        <div className="second-section-content register-container">

          <h1 className="register-title">Register Now</h1>

          <p className="register-subtext">
            Create your account and start tracking your crypto portfolio in real time.
            Stay organized, stay informed, and take control of your investments in one place.
          </p>

          <form className="register-form" onSubmit={handleRegisterSubmit}>
            <label className="register-label">Username</label>
            <input
              type="text"
              className="register-input"
              value={regUsername}
              onChange={(e) => setRegUsername(e.target.value)}
            />

            <label className="register-label">Password</label>
            <input
              type="password"
              className="register-input"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
            />

            <label className="register-label">Confirm Password</label>
            <input
              type="password"
              className="register-input"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
            />

            <button type="submit" className="register-submit">
              Register
            </button>

            {message && <p>{message}</p>}
          </form>

        </div>
      </section>

    </div>
  )
}

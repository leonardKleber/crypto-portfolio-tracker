import React from 'react'
import '../styles/SummaryTable.css'
import PropTypes from 'prop-types'

export default function SummaryTable (props) {
  const { portfolioValue, totalReturn, realizedReturn } = props
  return (
    <table style={{ paddingRight: '60px', width: '100%', paddingTop: '30px' }}>
      <tbody>
        <tr className="heading-tr">
          <td className="td-text">Portfolio Value</td>
          <td className="td-text">Total Return</td>
          <td className="td-text">Realized Return</td>
          <td className="td-text"></td>
          <td className="td-text"></td>
          <td className="td-text"></td>
        </tr>
        <tr className="number-tr">
          <td>{portfolioValue ? portfolioValue.toFixed(2) : '0'}€</td>
          <td>{totalReturn ? totalReturn.toFixed(2) : '0'}%</td>
          <td>{realizedReturn ? realizedReturn.toFixed(2) : '0'}€</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}

SummaryTable.propTypes = {
  portfolioValue: PropTypes.number.isRequired,
  totalReturn: PropTypes.number.isRequired,
  realizedReturn: PropTypes.number.isRequired
}

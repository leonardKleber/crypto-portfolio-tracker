import '../styles/SummaryTable.css'

export default function SummaryTable ({ portfolio_value, total_return, realized_return }) {
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
          <td>{portfolio_value ? portfolio_value.toFixed(2) : '0'}€</td>
          <td>{total_return ? total_return.toFixed(2) : '0'}%</td>
          <td>{realized_return ? realized_return.toFixed(2) : '0'}€</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}

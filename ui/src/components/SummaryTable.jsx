import "../styles/SummaryTable.css";

export default function SummaryTable({ chartHeight, portfolio_value, relative_return, nominal_return}) {
  return (
    <table style={{ width: `${chartHeight}px` }}>
      <tbody>
        <tr className="heading-tr">
          <td className="td-text">Total Portolio Value</td>
          <td className="td-text">Some other value</td>
        </tr>
        <tr className="number-tr">
          <td className="td-number">{portfolio_value.toFixed(2)}€</td>
          <td className="td-number">100</td>
        </tr>

        <tr className="heading-tr">
          <td className="td-text">Relative Portfolio Performance</td>
          <td className="td-text">Some other value</td>
        </tr>
        <tr className="number-tr">
          <td className="td-number">{relative_return.toFixed(2)}%</td>
          <td className="td-number">100</td>
        </tr>

        <tr className="heading-tr">
          <td className="td-text">Nominal Portfolio Performance</td>
          <td className="td-text">Some other value</td>
        </tr>
        <tr className="number-tr">
          <td className="td-number">{nominal_return.toFixed(2)}€</td>
          <td className="td-number">100</td>
        </tr>
      </tbody>
    </table>
  )
}
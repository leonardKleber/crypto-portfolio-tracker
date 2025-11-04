import "../styles/SummaryTable.css";

export default function SummaryTable({ portfolio_value, relative_return, nominal_return }) {
  return (
    <table style={{ paddingRight: "60px", width: "100%", paddingTop: "30px" }}>
      <tbody>
        <tr className="heading-tr">
          <td className="td-text">Total Value</td>
          <td className="td-text">Relative Performance</td>
          <td className="td-text">Nominal Performance</td>
          <td className="td-text">Some other value</td>
          <td className="td-text">Some other value</td>
          <td className="td-text">Some other value</td>
        </tr>
        <tr className="number-tr">
          <td>{portfolio_value.toFixed(2)}€</td>
          <td>{relative_return.toFixed(2)}%</td>
          <td>{nominal_return.toFixed(2)}€</td>
          <td>100</td>
          <td>100</td>
          <td>100</td>
        </tr>
      </tbody>
    </table>
  )
}
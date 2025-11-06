import "../styles/Table.css";

import { ReactComponent as CoinsIcon } from "../assets/icons/coins.svg";

export default function Table({ table_data }) {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header-cell name-col">Name</th>
            <th className="table-header-cell">Amount</th>
            <th className="table-header-cell">Total Value</th>
            <th className="table-header-cell">Nominal Return</th>
            <th className="table-header-cell">Relative Return</th>
            <th className="table-header-cell">Allocation</th>
          </tr>
        </thead>

        <tbody>
          {table_data.map((item, index) => (
            <tr key={index} className="table-body-row">
              <td className="table-cell">
                <CoinsIcon
                  style={{
                    width: "1rem",
                    height: "1rem",
                    fill: "var(--accent-color-500)",
                    flexShrink: "0",
                    transform: 'translateY(3px)',
                    marginRight: "0.5rem"
                  }}
                />
                {item.name}
                </td>
              <td className="table-cell">{item.amount}</td>
              <td className="table-cell">{item.value.toFixed(2)}€</td>
              <td className="table-cell">{item.profit.toFixed(2)}€</td>
              <td className="table-cell">{item.return.toFixed(2)}%</td>
              <td className="table-cell">{item.allocation.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

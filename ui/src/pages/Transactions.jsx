import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";

import "../styles/Transactions.css";

const API_BASE_URL = process.env.REACT_APP_PROJECT_API_URL;

export default function Transactions() {
  const { user } = useAuth();
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/transactions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: user }),
        });

        const data = await response.json();
        setTransactionData(data);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };

    if (user) {
      fetchTransactionData();
    }
  }, [user]);

  console.log(transactionData);

  return (
    <div>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Transactions</h1>

      {Array.isArray(transactionData) && transactionData.length > 0 ? (
        transactionData.map((entry, i) => {
          const [date, transactions] = Object.entries(entry)[0];
          return (
            <div key={i} style={{ marginBottom: "20px" }}>
              <p style={{ color: "var(--app-color-300)" }}>
                {date}
              </p>

              <div className="table-container">
                <table className="trans-table">
                  <tbody>
                    {Array.isArray(transactions) &&
                      transactions.map((tx, j) => (
                        <tr className="trans-tr">
                          <td className="trans-td">
                            {tx.type.toUpperCase()}
                          </td>
                          <td className="trans-td">
                            {tx.asset.toUpperCase()}
                          </td>
                          <td className="trans-td">
                            <p className="cell-header">
                              Amount
                            </p>
                            {tx.amount.toFixed(6)}
                          </td>
                          <td className="trans-td">
                            <p className="cell-header">
                              Value
                            </p>
                            {tx.value.toFixed(2)}€
                          </td>
                        </tr>


                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
}

import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";

import "../styles/Table.css";

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
              <p style={{ 
                color: "var(--app-color-300)",
                fontSize: "1rem",
                fontWeight: "normal", 
              }}>
                {date}
              </p>

              {Array.isArray(transactions) &&
                transactions.map((tx, j) => (
                  <div className="table-container">
                    <table className="data-table">
                      <tbody>
                        <tr className="table-body-row">
                          <td className="table-cell" style={{ width: "25%" }}>{tx.type.toUpperCase()}</td>
                          <td className="table-cell" style={{ width: "25%" }}>{tx.asset.toUpperCase()}</td>
                          <td className="table-cell" style={{ width: "25%" }}>Amount<br/>{tx.amount}</td>
                          <td className="table-cell" style={{ width: "25%" }}>Value<br/>{tx.value}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>
          );
        })
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
}

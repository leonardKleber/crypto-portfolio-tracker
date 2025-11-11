import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";
import "../styles/Transactions.css";

const API_BASE_URL = process.env.REACT_APP_PROJECT_API_URL;

export default function Transactions() {
  const { user } = useAuth();
  const [transactionData, setTransactionData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    type: "",
    asset: "",
    amount: "",
    value: "",
    date: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Move this outside useEffect so we can reuse it
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

  useEffect(() => {
    if (user) {
      fetchTransactionData();
    }
  }, [user]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/add-transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user, ...formData }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Use backend's message if available
        setErrorMessage(data.message || "Transaction failed.");
        return;
      }

      // ✅ Refetch updated transactions after adding
      await fetchTransactionData();

      // Reset form and close modal
      setIsModalOpen(false);
      setFormData({
        type: "",
        asset: "",
        amount: "",
        value: "",
        date: "",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      setErrorMessage("Network or server error. Please try again.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Transactions</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="add-button"
        >
          + Add Transaction
        </button>
      </div>

      {Array.isArray(transactionData) && transactionData.length > 0 ? (
        transactionData.map((entry, i) => {
          const [date, transactions] = Object.entries(entry)[0];
          return (
            <div key={i} style={{ marginBottom: "20px" }}>
              <p style={{ color: "var(--app-color-300)" }}>{date}</p>

              <div className="table-container">
                <table className="trans-table">
                  <tbody>
                    {Array.isArray(transactions) &&
                      transactions.map((tx, j) => (
                        <tr key={j} className="trans-tr">
                          <td className="trans-td">{tx.type.toUpperCase()}</td>
                          <td className="trans-td">{tx.asset.toUpperCase()}</td>
                          <td className="trans-td">
                            <p className="cell-header">Amount</p>
                            {Number(tx.amount).toFixed(6)}
                          </td>
                          <td className="trans-td">
                            <p className="cell-header">Value</p>
                            {Number(tx.value).toFixed(2)}€
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

      {/* --- Popup Modal --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              ✕
            </button>

            <h2>Add Transaction</h2>
            <form onSubmit={handleAddTransaction} className="modal-form">
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleFormChange}
                required
              />
              <input
                name="type"
                placeholder="Type (buy/sell)"
                value={formData.type}
                onChange={handleFormChange}
                required
              />
              <input
                name="asset"
                placeholder="Asset"
                value={formData.asset}
                onChange={handleFormChange}
                required
              />
              <input
                name="amount"
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleFormChange}
                required
              />
              <input
                name="value"
                type="number"
                placeholder="Value (€)"
                value={formData.value}
                onChange={handleFormChange}
                required
              />
              <button type="submit" className="submit-btn">
                Save
              </button>

              {/* Error message from backend */}
              {errorMessage && (
                <p className="error-message">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

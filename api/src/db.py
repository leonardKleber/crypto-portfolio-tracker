import os
import sqlite3


DATABASE_NAME = "db.db"

CREATE_USERS_TABLE = """
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
"""
CREATE_TRANSACTIONS_TABLE = """
CREATE TABLE transactions (
    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    coin_id TEXT NOT NULL,
    amount REAL NOT NULL,
    price REAL NOT NULL,
    type TEXT CHECK(type IN ('buy', 'sell')) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
"""
INSERT_USER = """
INSERT INTO users (
    username, 
    password
) 
VALUES (?, ?);
"""
GET_USER_BY_USERNAME = """
SELECT * FROM users WHERE username = ?;
"""
INSERT_TRANSACTION = """
INSERT INTO transactions (
    user_id, 
    coin_id, 
    amount, 
    price, 
    type, 
    timestamp
)
VALUES (?, ?, ?, ?, ?, ?);
"""
GET_TRANSACTIONS_BY_USER_ID = """
SELECT * FROM transactions WHERE user_id = ?;
"""


def get_db_connection():
    parent_dir = os.path.dirname(
        os.path.dirname(os.path.abspath(__file__))
    )
    db_path = os.path.join(parent_dir, DATABASE_NAME)
    return sqlite3.connect(db_path)


def create_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(CREATE_USERS_TABLE)
    cursor.execute(CREATE_TRANSACTIONS_TABLE)
    
    # Insert test data into database
    cursor.execute(INSERT_USER, ("leonard", "fishtank",))
    cursor.execute(
        INSERT_TRANSACTION, 
        (1, "bitcoin", 0.05071340, 5000.00, "buy", "2025-10-12")
    )
    cursor.execute(
        INSERT_TRANSACTION, 
        (1, "bitcoin", 0.04073220, 4000.00, "sell", "2025-10-14")
    )
    cursor.execute(
        INSERT_TRANSACTION, 
        (1, "ethereum", 1, 3089.71, "buy", "2025-07-20")
    )
    cursor.execute(
        INSERT_TRANSACTION, 
        (1, "ethereum", 0.5, 3906.20, "sell", "2025-08-15")
    )
    
    conn.commit()
    conn.close()


def create_user(username, password):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(INSERT_USER, (username, password,))
    conn.commit()
    conn.close()


def get_user(username):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(GET_USER_BY_USERNAME, (username,))
    user = cursor.fetchone()
    conn.close()
    return user


def get_transactions(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(GET_TRANSACTIONS_BY_USER_ID, (user_id,))
    transaction_data = cursor.fetchall()
    conn.close()
    return transaction_data
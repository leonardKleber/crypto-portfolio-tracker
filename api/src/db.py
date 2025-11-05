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

INSERT_USER = """
    INSERT INTO users (username, password) VALUES (?, ?);
"""
GET_USER_BY_USERNAME = """
    SELECT * FROM users WHERE username = ?;
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
    
    # Insert test user into new database
    cursor.execute(INSERT_USER, ("leonard", "fishtank",))
    
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
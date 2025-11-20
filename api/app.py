"""
This file defines all endpoints for the backend API.
"""
import os
from datetime import datetime
from flask_cors import CORS
from flask import Flask, request, jsonify, session
from src import (
    create_db,
    get_user,
    Dashboard,
    get_transactions_json,
    insert_transaction,
    SUPPORTED_COINS,
    insert_user
)


app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = "supersecret"
if not os.path.exists("Db.db"):
    create_db()


@app.route("/")
def index():
    """
    Defines API index route.
    """
    return "<p>Hello, World!</p>"


@app.post("/login")
def login():
    """
    Handles user login by verifying credentials and creating a session.
    """
    data = request.json
    username = data.get("username")
    password = data.get("password")
    response = get_user(username=username)
    if response and response[2] == password:
        session["user"] = username
        return jsonify({"message": "Login successful", "user": username})
    return jsonify({"error": "Invalid credentials"}), 401


@app.get("/check_auth")
def check_auth():
    """
    Checks whether a user is currently logged in by inspecting the session data.
    """
    if "user" in session:
        return jsonify({"authenticated": True, "user": session["user"]})
    return jsonify({"authenticated": False})


@app.post("/logout")
def logout():
    """
    Logs out the current user by clearing their session data.
    """
    session.pop("user", None)
    return jsonify({"message": "Logged out"})


@app.post("/dashboard")
def dashboard():
    """
    Returns the user's cumulative data to build their dashboard. Expects a JSON body with a
    'username' field.
    """
    data = request.get_json()
    if not data or "username" not in data:
        return jsonify({"error": "Missing 'username' in request body"}), 400
    user_data = get_user(username=data["username"])
    board = Dashboard(user_id=user_data[0])
    return board.get_dashboard_data()


@app.post("/transactions")
def transactions():
    """
    Returns the user's transaction history.
    """
    data = request.get_json()
    if not data or "username" not in data:
        return jsonify({"error": "Missing 'username' in request body"}), 400
    user_data = get_user(username=data["username"])
    return get_transactions_json(user_id=user_data[0])


@app.post("/add-transaction")
def add_transaction():
    """
    This endpoint processes incoming transaction data from the user and inserts it into the
    database if the data is deemed valid.
    """
    data = request.get_json()
    required_fields = ["username", "type", "asset", "amount", "value", "date"]
    for field in required_fields:
        if field not in data or data[field] in ("", None):
            return jsonify({"message": f"Missing required field: {field}"}), 400
    user_data = get_user(username=data["username"])
    if user_data is None:
        return jsonify({"message": "User does not exist"}), 400
    if data["type"] != "buy" and data["type"] != "sell":
        return jsonify({"message": f"{data["type"]} not a valid transaction type"}), 400
    if not any(c["id"] == data["asset"] for c in SUPPORTED_COINS):
        return jsonify({"message": f"{data['asset']} is not a valid asset"}), 400
    dt = datetime.strptime(data["date"], "%Y-%m-%d")
    iso_str = dt.date().isoformat()
    insert_transaction(
        user_id=user_data[0],
        coin_id=data["asset"],
        amount=data["amount"],
        price=data["value"],
        type=data["type"],
        timestamp=iso_str
    )
    return jsonify({"message": "Transaction added successfully"}), 200


@app.post("/add-user")
def add_user():
    """
    Adds a new user to the database. Checks whether the data sent from the frontend allows a new
    user creation.
    """
    data = request.get_json()
    required_fields = ["username", "password", "check_password"]
    for field in required_fields:
        if field not in data or data[field] in ("", None):
            return jsonify({"message": f"Missing required field: {field}"}), 400
    username = data.get("username")
    password = data.get("password")
    check_password = data.get("check_password")
    if password != check_password:
        return jsonify({"message": "Passwords do not match."}), 400
    response = get_user(username=username)
    if response is None:
        insert_user(username=username, password=password)
        return jsonify({"message": "User created successfully"}), 200
    return jsonify({"message": f"User {username} already exists."}), 400


if __name__ == '__main__':
    app.run()

"""
This file defines all endpoints for the backend API.
"""
import os

from flask_cors import CORS

from flask import Flask, request, jsonify, session
from src import create_db, get_user, get_dashboard_data


app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = "supersecret"
if not os.path.exists("Db.db"):
    create_db()


"""
Defines API index route.
"""
@app.route("/")
def index():
    return "<p>Hello, World!</p>"


"""
Handles user login by verifying credentials and creating a session.
"""
@app.post("/login")
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    response = get_user(username=username)
    if response and response[2] == password:
        session["user"] = username
        return jsonify({
            "message": "Login successful", 
            "user": username
        })
    return jsonify({"error": "Invalid credentials"}), 401


"""
Checks whether a user is currently logged in by inspecting the session
data.
"""
@app.get("/check_auth")
def check_auth():
    if "user" in session:
        return jsonify({
            "authenticated": True, 
            "user": session["user"]
        })
    return jsonify({"authenticated": False})


"""
Logs out the current user by clearing their session data.
"""
@app.post("/logout")
def logout():
    session.pop("user", None)
    return jsonify({"message": "Logged out"})


"""
Returns the user's cumulative data to build their dashboard. Expects a
JSON body with a 'username' field.
"""
@app.post("/dashboard")
def dashboard():
    data = request.get_json()

    if not data or "username" not in data:
        return jsonify(
            {"error": "Missing 'username' in request body"}
        ), 400
    
    user_data = get_user(username=data["username"])

    return get_dashboard_data(user_id=user_data[0])


if __name__ == '__main__':
    app.run()
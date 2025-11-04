"""
This file defines all endpoints for the backend API.
"""
from flask import Flask, request, jsonify, session
from flask_cors import CORS


app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = "supersecret"

# Temporary fake "user database"
users = {"Leonard": {"password": "fishtank"}}


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

    if username in users and users[username]["password"] == password:
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


if __name__ == '__main__':
    app.run()
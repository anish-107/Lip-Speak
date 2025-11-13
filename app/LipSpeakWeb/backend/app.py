'''
@author Anish
@date 13-11-2025
@description This is the main script to run the backend
@returns nothing
'''

# Imports
from flask import Flask, jsonify, Response
from flask_cors import CORS
from dotenv import load_dotenv
import os
from typing import Any, Dict


# Application
app : Flask = Flask(__name__)
CORS(app)


# Config
load_dotenv()
app.config["HOST"] = os.getenv("HOST")
app.config["PORT"] = os.getenv("PORT")


# Variables
HOST : str = app.config.get("HOST", "127.0.0.1")
PORT : int = int(app.config.get("PORT", "5000"))


# Routes
@app.route("/", methods = ["GET"])
def index() -> Response:
    data : Dict[str, Any] = {
        "message" : "Hello World",
        "ok" : False
    }

    return jsonify (data)


# Run Script
if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)
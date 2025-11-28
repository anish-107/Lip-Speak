'''
@author Anish
@date 13-11-2025
@description This is the main script to run the backend
@returns nothing
'''

# Imports
from flask import Flask, jsonify, Response, request
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import os
from typing import Any, Dict, Optional, Union, Tuple
from werkzeug.datastructures import FileStorage
from werkzeug.wrappers import Response as WerkzeugResponse


# Application
app : Flask = Flask(__name__)
CORS(app)


# Config
load_dotenv()
app.config["HOST"] = os.getenv("HOST")
app.config["PORT"] = os.getenv("PORT")
app.config["DB_URL"] = os.getenv("DB_URL")


# Variables
HOST : str = app.config.get("HOST", "127.0.0.1")
PORT : int = int(app.config.get("PORT", "5000"))
DB_URL : str = app.config.get("DB_URL", "")


ML_SERVER_PREDICT_URL: str = "http://localhost:8000/predict"

# Route return type
FlaskReturn = Union[Response, Tuple[Response, int]]

# Methods
def get_transcript(file: FileStorage, *, timeout: float = 30.0) -> str:
    """
    Send the uploaded file to the local ML server and return the transcript as a string.

    Assumptions about the ML server:
      - Accepts multipart/form-data POST with key "file"
      - Returns either JSON like {"transcript": "..."} or plain text (the transcript)
    """
    try:
        file.stream.seek(0)
    except Exception:
        pass

    files = {
        "file": (file.filename or "upload", file.stream, file.content_type or "application/octet-stream")
    }

    try:
        resp = requests.post(ML_SERVER_PREDICT_URL, files=files, timeout=timeout)
    except requests.RequestException as exc:
        raise RuntimeError(f"Failed to contact ML server: {exc}") from exc

    if not resp.ok:
        raise RuntimeError(f"ML server returned status {resp.status_code}: {resp.text}")

    ct = resp.headers.get("Content-Type", "")
    if "application/json" in ct:
        try:
            payload = resp.json()
        except ValueError as exc:
            raise RuntimeError(f"ML server returned malformed JSON: {exc}") from exc

        for key in ("transcript", "text", "result"):
            if key in payload:
                val = payload[key]
                if isinstance(val, str):
                    return val
                else:
                    return str(val)
        return str(payload)
    
    return resp.text

@app.route("/transcribe", methods=["POST"])
def transcribe() -> FlaskReturn:
    """
    Accept a file upload and return the transcript string.
    Uses get_transcript(...) to forward the file to the local ML model server.
    """
    f: Optional[FileStorage] = request.files.get("file")

    if f is None:
        return jsonify({"error": "no file provided"}), 400

    if (f.filename is None or f.filename == "") and (f.content_length is None or f.content_length == 0):
        # still attempt, but warn the caller
        return jsonify({"error": "empty file provided"}), 400

    try:
        transcript: str = get_transcript(f, timeout=30.0)
    except RuntimeError as exc:
        # Forward a readable error to frontend — you might want to hide internals in prod
        return jsonify({"error": "failed to generate transcript", "details": str(exc)}), 502

    return jsonify({"transcript": transcript}), 200


# Run Script
if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)
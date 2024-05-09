from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import os
from util import prediction


app = Flask(__name__)
CORS(app)


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    count = data["parameter1"]
    mode = data["parameter2"]
    percent = data["parameter3"]
    distribution = data["parameter4"]
    error = prediction(count, mode, percent, distribution)
    return error


if __name__ == "__main__":
    app.run(debug=True)

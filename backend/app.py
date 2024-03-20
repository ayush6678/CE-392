# app.py
from flask import Flask, request, jsonify
from model import predict_error
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    parameter1 = data["parameter1"]
    parameter2 = data["parameter2"]
    error_prediction = predict_error(parameter1, parameter2)
    return jsonify({"prediction": error_prediction})


if __name__ == "__main__":
    app.run(debug=True)

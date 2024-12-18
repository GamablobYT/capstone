from flask import Flask, render_template, request, jsonify
import numpy as np
import pandas as pd
import joblib
import os

app = Flask(__name__)

# Load the trained model, label encoder, and scaler
model = joblib.load("model/my_model.joblib")
scaler = joblib.load("model/scaler.joblib")

# Check if label encoder was used during training and load it if necessary
if "label_encoder.joblib" in os.listdir("model"):
    label_encoder = joblib.load("model/label_encoder.joblib")
else:
    label_encoder = None

def get_top_8_predictions(model, input_data, label_encoder=None):
    """
    Gets the top 4 predictions from the model based on probability.

    Args:
        model: The trained machine learning model.
        input_data: The input data as a Pandas DataFrame.
        label_encoder: The label encoder (if used).

    Returns:
        A list of tuples, each containing (prediction, probability), sorted by probability in descending order.
    """
    # Get probabilities for all classes
    probabilities = model.predict_proba(input_data)[0]

    # Create a list of (prediction, probability) tuples
    if label_encoder:
        predictions = [
            (label_encoder.inverse_transform([i])[0], prob)
            for i, prob in enumerate(probabilities)
        ]
    else:
        predictions = [(i, prob) for i, prob in enumerate(probabilities)]

    # Sort by probability in descending order
    predictions.sort(key=lambda x: x[1], reverse=True)

    return predictions[:8]  # Return the top 4

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # 1. Get data from the request
        ph = float(request.form["ph"])
        N = float(request.form["N"])
        P = float(request.form["P"])
        K = float(request.form["K"])
        rainfall = float(request.form["rainfall"])
        humidity = float(request.form["humidity"])
        temperature = float(request.form["temperature"])

        # 2. Create DataFrame from the input
        feature_names = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
        input_data = pd.DataFrame(
            [[N, P, K, temperature, humidity, ph, rainfall]], columns=feature_names
        )

        # 3. Scale the numerical features
        numerical_features = [
            col for col in input_data.columns if col in scaler.feature_names_in_
        ]
        if numerical_features:
            input_data[numerical_features] = scaler.transform(
                input_data[numerical_features]
            )

        # 4. Get top 4 predictions with probabilities
        top_8_preds = get_top_8_predictions(model, input_data, label_encoder)

        # 5. Return the predictions as JSON
        return jsonify(
            {
                "predictions": [
                    {"prediction": pred, "probability": prob}
                    for pred, prob in top_8_preds
                ]
            }
        )

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
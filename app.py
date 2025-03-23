from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model and scaler
with open("clustering_model.pkl", "rb") as file:
    kmeans, scaler = pickle.load(file)

@app.route("/")
def home():
    return "Credit Card Clustering API is running!"

# API endpoint for clustering
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json  # Get data from the frontend
        features = np.array(data["features"]).reshape(1, -1)  # Convert to array
        scaled_features = scaler.transform(features)  # Scale the input
        cluster = kmeans.predict(scaled_features)[0]  # Predict cluster
        return jsonify({"cluster": int(cluster)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)
# predict_api.py

from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load model, scaler, and label encoder
try:
    with open("model.pkl", "rb") as f:
        model = pickle.load(f)

    with open("scaler.pkl", "rb") as f:
        scaler = pickle.load(f)

    with open("label_encoder.pkl", "rb") as f:
        label_encoder = pickle.load(f)

except Exception as e:
    raise RuntimeError(f"Error loading ML files: {e}")


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # 🔒 EXACT training feature order
        features = np.array([[
            float(data["N"]),
            float(data["P"]),
            float(data["K"]),
            float(data["temperature"]),
            float(data["humidity"]),
            float(data["ph"]),
            float(data["rainfall"])
        ]])

        # Scale
        scaled_features = scaler.transform(features)

        # Predict class index
        class_index = model.predict(scaled_features)[0]

        # Decode crop name
        crop_name = label_encoder.inverse_transform([class_index])[0]

        print("INPUT:", features)
        print("SCALED:", scaled_features)
        print("CLASS:", class_index)
        print("CROP:", crop_name)

        return jsonify({
            "predicted_crop": crop_name
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True, port=4000)

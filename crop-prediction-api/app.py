from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)

# Load trained models
crop_model = pickle.load(open("model.pkl", "rb"))
price_model = pickle.load(open("price_model.pkl", "rb"))
scaler = pickle.load(open("scaler.pkl", "rb"))
label_encoder = pickle.load(open("label_encoder.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        required_fields = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400

        # ---------- CROP FEATURES (7) ----------
        crop_features = pd.DataFrame([{
            "N": float(data["N"]),
            "P": float(data["P"]),
            "K": float(data["K"]),
            "temperature": float(data["temperature"]),
            "humidity": float(data["humidity"]),
            "ph": float(data["ph"]),
            "rainfall": float(data["rainfall"])
        }])

        scaled_crop_features = scaler.transform(crop_features)

        crop_pred = crop_model.predict(scaled_crop_features)
        crop_name = label_encoder.inverse_transform(crop_pred)[0]

        # ---------- PRICE FEATURES (ONLY 2) ----------
        # Assumption based on your model: [crop_encoded, rainfall]
        crop_encoded = crop_pred[0]

        price_features = pd.DataFrame([{
            "crop": crop_encoded,
            "rainfall": float(data["rainfall"])
        }])

        price_pred = price_model.predict(price_features)[0]

        return jsonify({
            "predicted_crop": crop_name,
            "predicted_price": round(float(price_pred), 2)
        }), 200

    except Exception as e:
        return jsonify({
            "error": "Prediction failed",
            "details": str(e)
        }), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)

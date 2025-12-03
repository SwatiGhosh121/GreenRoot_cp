from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from model import recommend_crop

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        ph = data.get('ph')
        temperature = data.get('temperature')
        rainfall = data.get('rainfall')

        if ph is None or temperature is None or rainfall is None:
            return jsonify({'error': 'Missing parameters'}), 400

        prediction = recommend_crop(ph, temperature, rainfall)
        return jsonify({'crop': prediction})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=False)

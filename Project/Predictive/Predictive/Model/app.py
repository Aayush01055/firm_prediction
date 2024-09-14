from flask import Flask, jsonify, request, send_from_directory
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import os

app = Flask(__name__, static_folder='../frontend/static', template_folder='../frontend')

# Load dataset
df = pd.read_csv('D:/Study/MIT WPU/3rd Year/MIT-WPU 5th Sem/AIES/Project/Predictive/Predictive/Model/data/financial_data.csv')

# Preprocess data
X = df[['revenue', 'expenses', 'market_cap']]
y = df['profit']

# Split dataset into training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

@app.route('/')
def index():
    # Serve the HTML page
    return send_from_directory('../frontend', 'index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        input_data = [[data['revenue'], data['expenses'], data['market_cap']]]

        # Make prediction
        prediction = model.predict(input_data)
        return jsonify({'prediction': prediction[0]})
    except KeyError:
        return jsonify({'error': 'Invalid input data'}), 400

if __name__ == '__main__':
    app.run(debug=True)

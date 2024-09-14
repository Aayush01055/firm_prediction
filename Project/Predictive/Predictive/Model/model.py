# model.py

import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

class FirmPredictionModel:
    def __init__(self, csv_file):
        self.df = pd.read_csv(csv_file)
        self.model = None
        self._prepare_data()

    def _prepare_data(self):
        X = self.df[['revenue', 'expenses', 'market_cap']]
        y = self.df['profit']
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        self.X_train = X_train
        self.y_train = y_train
        self.X_test = X_test
        self.y_test = y_test

    def train_model(self):
        self.model = LinearRegression()
        self.model.fit(self.X_train, self.y_train)

    def predict(self, input_data):
        return self.model.predict([input_data])


# To use in app.py:
# from model import FirmPredictionModel
# firm_model = FirmPredictionModel('data/financial_data.csv')
# firm_model.train_model()
# prediction = firm_model.predict([revenue, expenses, market_cap])

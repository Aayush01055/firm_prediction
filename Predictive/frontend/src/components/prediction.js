import React, { useState } from 'react';
import './prediction.css';
import axios from 'axios';

const PredictionForm = () => {
  const [revenue, setRevenue] = useState('');
  const [expenses, setExpenses] = useState('');
  const [marketCap, setMarketCap] = useState('');
  const [profit, setProfit] = useState(0);

  const handleRevenueChange = (event) => {
    setRevenue(event.target.value);
  };

  const handleExpensesChange = (event) => {
    setExpenses(event.target.value);
  };

  const handleMarketCapChange = (event) => {
    setMarketCap(event.target.value);
  };

  const handlePredict = async () => {
    try {
      console.log(revenue, expenses, marketCap);
      const requestData = { revenue, expenses, market_cap: marketCap }; // Use underscore key name for market_cap
      const jsonString = JSON.stringify(requestData);
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post('http://localhost:4000/api/predict', jsonString, config);
      const prediction = response.data.prediction;
      console.log(prediction);
      setProfit(prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handlePredict(revenue, expenses, marketCap)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Firm Financial Prediction</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label for="revenue">Revenue</label>
              <input
                type="number"
                id="revenue"
                className="form-control"
                placeholder="Enter revenue in USD"
                value={revenue}
                onChange={handleRevenueChange}
                required
              />
            </div>
            <div className="form-group">
              <label for="expenses">Expenses</label>
              <input
                type="number"
                id="expenses"
                className="form-control"
                placeholder="Enter expenses in USD"
                value={expenses}
                onChange={handleExpensesChange}
                required
              />
            </div>
            <div className="form-group">
              <label for="marketCap">Market Cap</label>
              <input
                type="number"
                id="marketCap"
                className="form-control"
                placeholder="Enter market cap in USD"
                value={marketCap}
                onChange={handleMarketCapChange}
                required
              />
            </div>
            <button type="button" onClick={handleSubmit} className="btn btn-primary btn-block">
              Predict
            </button>
          </form>
          <div className="mt-3 text-center">
           <h3 id="predictionResult">Profit: {profit.prediction}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionForm;
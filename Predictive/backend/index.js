import express from 'express';
import axios from 'axios';
import cors from 'cors';

const port = 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/predict', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:3000/predict', req.body);
    const prediction = response.data.prediction;
    console.log(prediction);
    res.json({ prediction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error making prediction' });
  }
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
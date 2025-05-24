// forecast-service/index.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/forecast', (req, res) => {
  const { temperature } = req.query;

  if (!temperature) {
    return res.status(400).json({ error: 'Temperature is required' });
  }

  const temp = parseFloat(temperature);
  let forecast;

  if (temp > 30) forecast = 'Hot and sunny ☀️';
  else if (temp > 20) forecast = 'Warm and pleasant 🌤️';
  else if (temp > 10) forecast = 'Cool and cloudy ⛅';
  else forecast = 'Cold ❄️';

  res.json({ forecast });
});

app.listen(3003, () => console.log('📈 Forecast Service running on http://localhost:3003'));

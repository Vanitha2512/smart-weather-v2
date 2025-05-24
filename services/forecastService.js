// forecastService.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/forecast', (req, res) => {
  const temp = parseFloat(req.query.temperature);

  if (isNaN(temp)) {
    return res.status(400).json({ error: 'Invalid temperature value' });
  }

  let forecast;
  if (temp < 10) {
    forecast = 'Cold and possibly snowy. Dress warmly!';
  } else if (temp >= 10 && temp < 25) {
    forecast = 'Mild weather. Great for a walk outside!';
  } else {
    forecast = 'Hot and sunny. Stay hydrated!';
  }

  res.json({ forecast });
});

app.listen(3003, () => console.log('📈 Forecast Service running on http://localhost:3003'));


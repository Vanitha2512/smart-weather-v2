// locationService.j
 // your key
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const apiKey = process.env.apiKey;

app.get('/location', async (req, res) => {
  const { city } = req.query;

  if (!city) return res.status(400).json({ error: 'City name required' });

  try {
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
    const [location] = response.data;

    res.json({
      city: location.name,
      lat: location.lat,
      lon: location.lon
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`📍 Location Service running on http://localhost:${PORT}`));

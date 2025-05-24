// locationService.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const openWeatherApiKey = '243eb7f11f1cb24b9bb062aa813a01f9'; // your key

app.get('/location', async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City parameter is required" });

  try {
    const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${openWeatherApiKey}`);

    if (!response.data || response.data.length === 0) return res.status(404).json({ error: "City not found" });

    const loc = response.data[0];
    res.json({
      city: loc.name,
      lat: loc.lat,
      lon: loc.lon
    });
  } catch (error) {
    console.error("💥 Location Service Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`📍 Location Service running on http://localhost:${PORT}`));

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const openWeatherApiKey = '243eb7f11f1cb24b9bb062aa813a01f9'; // your API key

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "Latitude and Longitude required" });

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApiKey}&units=metric`);
    const data = response.data;
    res.json({
      temperature: data.main.temp + '°C',
      humidity: data.main.humidity + '%',
      condition: data.weather[0].description
    });
  } catch (err) {
    console.error('💥 Weather API error:', err.message);
    res.status(500).json({ error: "Weather API error" });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`🌦️ Weather Service running on port ${PORT}`));

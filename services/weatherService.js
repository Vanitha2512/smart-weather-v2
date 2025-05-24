// weatherService.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const openWeatherApiKey = '243eb7f11f1cb24b9bb062aa813a01f9';

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "lat and lon query params required" });

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherApiKey}`;
    const response = await axios.get(url);

    const data = response.data;
    res.json({
      temperature: `${data.main.temp}°C`,
      humidity: `${data.main.humidity}%`,
      condition: data.weather[0].description,
      icon: data.weather[0].icon
    });
  } catch (error) {
    console.error("💥 Weather Service Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3002, () => console.log("🌤️ Weather Service running on http://localhost:3002"));


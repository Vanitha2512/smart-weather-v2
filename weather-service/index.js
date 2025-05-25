const express = require('express');
const cors = require('cors');
const axios = require('axios');
// Remove dotenv if you don't want to use it and prefer hardcoding or environment variables
// require('dotenv').config();

const app = express();
app.use(cors());

// Use the same variable name here as below, or better yet use environment variable
const apiKey = '243eb7f11f1cb24b9bb062aa813a01f9'; // your API key

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) return res.status(400).json({ error: 'Latitude and Longitude required' });

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    const weather = response.data;

    res.json({
      temperature: `${weather.main.temp}°C`,
      humidity: `${weather.main.humidity}%`,
      condition: weather.weather[0].description
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`🌦️ Weather Service running on http://localhost:${PORT}`));

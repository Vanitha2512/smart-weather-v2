const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

// ✅ Replace this with your actual API key from OpenWeatherMap
const apiKey = '243eb7f11f1cb24b9bb062aa813a01f9';

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;

  // ✅ Validation
  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    const weather = response.data;

    res.json({
      temperature: `${weather.main.temp}°C`,
      humidity: `${weather.main.humidity}%`,
      condition: weather.weather[0].main
    });

  } catch (error) {
    console.error("💥 Error fetching weather from OpenWeatherMap:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }
    res.status(500).json({ error: 'Error fetching weather' });
  }
});

app.listen(3002, () => {
  console.log("☁️ Weather Service running on http://localhost:3002");
});


const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/location', (req, res) => {
  const city = req.query.city;
  const data = {
    "Kathmandu": { latitude: 27.7172, longitude: 85.3240 },
    "Delhi": { latitude: 28.6139, longitude: 77.2090 }
  };
  if (data[city]) res.json({ city, ...data[city] });
  else res.status(404).json({ error: "City not found" });
});

app.listen(3001, () => console.log("📍 Location Service running on http://localhost:3001"));


const apiGatewayUrl = 'https://smart-weather-v2-api.onrender.com';
const openWeatherApiKey = '243eb7f11f1cb24b9bb062aa813a01f9'; // Your public key (for college project)

// 🔍 Autocomplete City Names
document.getElementById('city').addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  if (query.length < 3) return;

  try {
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=10&appid=${openWeatherApiKey}`);
    const cities = await res.json();

    const dataList = document.getElementById('citySuggestions');
    dataList.innerHTML = '';

    cities.forEach(city => {
      const name = city.name;
      const state = city.state || '';
      const country = city.country || '';
      const label = `${name}${state ? ', ' + state : ''}${country ? ', ' + country : ''}`;
      const option = document.createElement('option');
      option.value = label;
      dataList.appendChild(option);
    });
  } catch (error) {
    console.error('Autocomplete Error:', error);
  }
});

// 🌦️ Weather Fetching
document.getElementById('getWeatherBtn').addEventListener('click', async () => {
  const city = document.getElementById('city').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = 'Loading...';

  if (!city) {
    resultDiv.innerHTML = 'Please enter a city name.';
    return;
  }

  try {
    // 🔁 1. Get Location (lat/lon)
    const locRes = await fetch(`${apiGatewayUrl}/location?city=${encodeURIComponent(city)}`);
    if (!locRes.ok) throw new Error('Location service error');
    const locData = await locRes.json();

    const lat = locData.lat;
    const lon = locData.lon;

    // 🔁 2. Get Weather
    const weatherRes = await fetch(`${apiGatewayUrl}/weather?lat=${lat}&lon=${lon}`);
    if (!weatherRes.ok) throw new Error('Weather service error');
    const weather = await weatherRes.json();

    // 🔁 3. Get Forecast
    const forecastRes = await fetch(`${apiGatewayUrl}/forecast?temperature=${weather.temperature}`);
    if (!forecastRes.ok) throw new Error('Forecast service error');
    const forecast = await forecastRes.json();

    // ✅ Display result
    resultDiv.innerHTML = `
      <h3>Results for ${city}</h3>
      <p><strong>Location:</strong> Latitude ${lat}, Longitude ${lon}</p>
      <p><strong>Current Weather:</strong> ${weather.temperature}, Humidity: ${weather.humidity}, Condition: ${weather.condition}</p>
      <p><strong>Forecast:</strong> ${forecast.forecast}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<span class="error">Error: ${error.message}</span>`;
  }
});

// 💳 Payment Handler
document.getElementById('paymentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const amount = document.getElementById('amount').value;
  const paymentResult = document.getElementById('paymentResult');
  paymentResult.innerHTML = 'Processing payment...';

  try {
    const payRes = await fetch(`${apiGatewayUrl}/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: Number(amount),
        user: "guest",
        service: "Weather Forecast"
      })
    });

    if (!payRes.ok) throw new Error('Payment failed');
    const payData = await payRes.json();

    paymentResult.innerHTML = `
      <strong>${payData.status}</strong><br>Transaction ID: ${payData.transactionId}
    `;
  } catch (error) {
    paymentResult.innerHTML = `<span class="error">${error.message}</span>`;
  }
});

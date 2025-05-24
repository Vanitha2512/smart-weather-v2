const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 🧾 Payment Handler
app.post('/pay', (req, res) => {
  const { user, amount, service } = req.body;

  if (!user || !amount || !service) {
    return res.status(400).json({ error: 'Missing required payment details' });
  }

  // Simulate payment processing
  console.log(`💸 Payment received from ${user} for ${service} - ₹${amount}`);

  res.json({
    status: 'success',
    message: `Payment of ₹${amount} for ${service} by ${user} processed successfully!`
  });
});

// 🚀 Start Payment Service
app.listen(3004, () => {
  console.log('💰 Payment Service running at http://localhost:3004');
});


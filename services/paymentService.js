// paymentService.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/pay', (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Valid amount is required and must be a number' });
  }

  const transactionId = 'TXN' + Math.floor(Math.random() * 1000000);
  res.json({
    status: 'Payment successful',
    transactionId,
    amount
  });
});

app.listen(3004, () => {
  console.log('💳 Payment Service running at http://localhost:3004');
});


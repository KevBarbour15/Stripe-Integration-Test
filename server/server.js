require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001 || process.env.PORT;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Stripe Test server loaded.');
});

const checkoutRouter = require('./routes/checkout');
const paymentIntentRouter = require('./routes/paymentIntent');

app.use('/', checkoutRouter);
app.use('/', paymentIntentRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
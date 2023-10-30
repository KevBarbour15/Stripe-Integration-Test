require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = 3001 || process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Stripe Test server loaded.');
});

app.post('/create-payment-intent', async (req, res) => {
  try {
    // sending test amount from client side for now
    // will be replaced with actual amount from cart and security later
    const amount = req.body.amount; 

    const paymentIntent = await stripe.paymentIntents
      .create({
        amount,
        currency: 'usd'
      });
    
      console.log('Payment Intent Client Secret:', paymentIntent.client_secret);

    
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
    
  }
});

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Your Product Name',
        },
        unit_amount: 2000, 
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/failure',
  });

  res.json({ id: session.id });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
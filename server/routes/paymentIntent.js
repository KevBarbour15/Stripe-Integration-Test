require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  console.log("create-payment-intent");
  try {
    const amount = req.body.amount; 

    const paymentIntent = await stripe.paymentIntents
      .create({
        amount,
        currency: 'usd'
      });
      
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
    
  }
});

module.exports = router;
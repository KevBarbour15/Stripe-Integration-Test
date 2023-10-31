require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


router.post('/create-checkout-session', async (req, res) => {
  console.log("create-checkout-session");
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: "Sean's Dinner Party",
        },
        unit_amount: 2000, 
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/failure',
  });

  // the question here is: if it is successful how can we update the 
  // database to reflect the purchase ?

  res.json({ id: session.id });
});

module.exports = router;
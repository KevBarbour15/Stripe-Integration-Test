require("dotenv").config();
const express = require("express");
const router = express.Router();
const Event = require("../schemas/eventInfo");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET;

//// to test: stripe listen --forward-to localhost:3001/webhook/update
router.post("/update", (request, response) => {
  const sig = request.headers["stripe-signature"];
  console.log("WEBHOOK RECEIVED");
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, ENDPOINT_SECRET);
  } catch (err) {
    console.log("Error", err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      const session = event.data.object;
      const eventId = session.metadata.eventId;

      decrementSeatForEvent(eventId)
        .then(() => {
          console.log("Seat decremented successfully!");
          response.json({ received: true });
        })
        .catch((error) => {
          console.error("Error decrementing seat:", error);
          response.status(500).send();
        });
      break;

    // ... handle other event types in the future here
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send();
});

async function decrementSeatForEvent(eventId) {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    event.seatsRemaining -= 1;
    await event.save();
  } catch (error) {
    throw error;
  }
}

module.exports = router;

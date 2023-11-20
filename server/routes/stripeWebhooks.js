require("dotenv").config();
const express = require("express");
const router = express.Router();
const Event = require("../schemas/eventInfo");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const ENDPOINT_SECRET = process.env.STRIPE_ENDPOINT_SECRET;

// to test locally: stripe listen --forward-to localhost:3001/webhook/update
router.post("/update", (request, response) => {
  console.log("Received webhook request!");
  
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, ENDPOINT_SECRET);
  } catch (err) {
    console.log("Error", err.message);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  const session = event.data.object;
  const eventId = session.metadata.eventId;

  switch (event.type) {
    // handling successful checkout and seating
    case "checkout.session.completed":
      updateEventSeats("success", eventId)
        .then(() => {
          response.json({ received: true });
        })
        .catch((error) => {
          response.status(500).send();
        });
      break;
    // handling refunds and seating
    case "charge.refunded":
      console.log("Refund completed successfully!");
      const charge = event.data.object;

      stripe.paymentIntents
        .retrieve(charge.payment_intent)
        .then((paymentIntent) => {
          const eventId = paymentIntent.metadata.eventId;

          if (eventId) {
            updateEventSeats("refund", eventId)
              .then(() => {
                console.log("Seat incremented successfully due to refund!");
                response.json({ received: true });
              })
              .catch((error) => {
                console.error("Error incrementing seat:", error);
                response.status(500).send();
              });
          } else {
            console.error("Event ID not found in metadata.");
            response.status(500).send("Metadata not found");
          }
        })
        .catch((err) => {
          console.error("Error retrieving PaymentIntent:", err);
          response.status(500).send("Error retrieving PaymentIntent");
        });
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
      response.send();
  }
});

// adjust event seats accordingly
async function updateEventSeats(type, eventId) {
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    if (type === "success") {
      event.seatsRemaining -= 1;
    } else if (type === "refund") {
      event.seatsRemaining += 1;
    }

    await event.save();
  } catch (error) {
    throw error;
  }
}

module.exports = router;

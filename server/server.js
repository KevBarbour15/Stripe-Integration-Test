require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(logIncomingRequests);

const stripeWebhooksRouter = require("./routes/stripeWebhooks");
app.use(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhooksRouter
);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Stripe Test server loaded.");
});

connect();

const checkoutRouter = require("./routes/checkout");
const eventInfoRouter = require("./routes/eventInfo");

app.use("/checkout", checkoutRouter);
app.use("/events", eventInfoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


function logIncomingRequests(req, res, next) {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  if (req.body && Object.keys(req.body).length !== 0) {
      console.log(`Body: ${JSON.stringify(req.body)}`);
  }
  console.log("*****");
  console.log();
  next(); // Important to call next() to continue to the next middleware/route handler
}
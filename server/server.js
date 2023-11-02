require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("./db");

const app = express();
const PORT = 3001 || process.env.PORT;

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

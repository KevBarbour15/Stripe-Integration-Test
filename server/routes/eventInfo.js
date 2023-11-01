require("dotenv").config();
const express = require("express");
const router = express.Router();
const Event = require("../schemas/eventInfo");

// creates a new event
router.post("/new", async (req, res) => {
  try {
    const event = new Event(req.body);
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating event", error: error.message });
  }
});

// gets all events
router.get('/get-all', async (req, res) => {
  try {
      const events = await Event.find();
      res.json(events);
  } catch (error) {
      res.status(500).json({ message: "Error retrieving events", error: error.message });
  }
});

module.exports = router;

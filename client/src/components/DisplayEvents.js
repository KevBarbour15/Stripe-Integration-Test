import React, { useState, useEffect } from "react";
import axios from "../AxiosConfig"; // Make sure to import axios from your configuration
import CheckoutButton from "../components/CheckoutButton";
import { convertMilitaryTime, convertDateReadability } from "../helpers";

const DisplayEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  useEffect(() => {
    // Here we use axios to fetch data
    axios.get("http://localhost:3001/events/get-all")
      .then((response) => {
        setEvents(response.data); // With axios, the data is accessed with response.data
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleEventChange = (e) => {
    const eventId = e.target.value;
    const event = events.find((ev) => ev._id === eventId);
    setSelectedEvent(event);
  };

  return (
    <div className="event-form">
      <h1>~View Event Details~</h1>
      <select onChange={handleEventChange}>
        <option value="">Select an event</option>
        {events.map((event) => (
          <option key={event._id} value={event._id}>
            {event.title}
          </option>
        ))}
      </select>

      {selectedEvent && (
        <div>
          <h2 className="event-title">{selectedEvent.title}</h2>
          <p>Description: {selectedEvent.description}</p>
          <p>Seats: {selectedEvent.seats}</p>
          <p>Seats Available: {selectedEvent.seatsRemaining}</p>
          <p>Date: {convertDateReadability(selectedEvent.date)}</p>
          <p>Time: {convertMilitaryTime(selectedEvent.time)}</p>
          <p>Price: ${selectedEvent.price}</p>
          {selectedEvent.seatsRemaining === 0 ? (
            <p>This Event Is Sold Out!</p>
          ) : (
            <CheckoutButton eventId={selectedEvent._id} />
          )}
        </div>
      )}
    </div>
  );
};

export default DisplayEvents;

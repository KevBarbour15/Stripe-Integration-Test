import React, { useState } from 'react';
import "../styles/test.css";
const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [seats, setSeats] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      title: title,
      description: description,
      seats: seats,
      seatsRemaining: seats,
      date: date,
      time: time,
      price: price,
    };

    try {
      const response = await fetch("http://localhost:3001/events/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Event created successfully:", data);
        setTitle("");
        setDescription("");
        setSeats(1);
        setDate("");
        setTime("");
        setPrice(0);
      } else {
        console.error("Error creating event:", data);
      }
    } catch (error) {
      console.error("There was an error sending the data:", error);
    }
  };

  return (
      <div className="event-form">
        <h1>Create New Event</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>

          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label>
            Number of Seats:
            <select value={seats} onChange={(e) => setSeats(e.target.value)}>
              {[...Array(20)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>

          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label>
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>

          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <button type="submit">Create Event</button>
        </form>
      </div>
  );
}

export default CreateEvent;
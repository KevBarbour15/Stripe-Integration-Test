import React, { useState } from "react";
import "../styles/test.css";
import axios from "../AxiosConfig";

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
      title,
      description,
      seats,
      seatsRemaining: seats, 
      date,
      time,
      price,
    };

    try {
      // Directly pass the eventData object as the second parameter to axios.post
      const response = await axios.post("/events/new", eventData);

      if (response.status === 200 || response.status === 201) {
        console.log("Event created successfully:", response.data);
        // Resetting the form fields after successful event creation
        setTitle("");
        setDescription("");
        setSeats(1);
        setDate("");
        setTime("");
        setPrice(0);
      } else {
        console.error("Error creating event:", response);
      }
    } catch (error) {
      const errorData = error.response ? error.response.data : error.message;
      console.error("There was an error sending the data:", errorData);
    }
  };

  return (
    <div className="event-form">
      <h1>~Create New Event~</h1>
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
};

export default CreateEvent;

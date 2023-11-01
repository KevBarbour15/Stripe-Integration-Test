import React from "react";

import CreateEvent from "../components/CreateEvent";
import DisplayEvents from "../components/DisplayEvents";
import "../styles/test.css";
;

const StripeTest = () => {
  return (
    <div className="test-container">
      <CreateEvent />
      <DisplayEvents />
    </div>
  );
};

export default StripeTest;

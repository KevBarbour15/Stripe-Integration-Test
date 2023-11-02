import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div>
      <h1>Payment successful!</h1>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Success;

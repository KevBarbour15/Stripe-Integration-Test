import React from 'react';
import { Link } from "react-router-dom";

const Failure = () => {
  return (
    <div>
      <h1>Payment failed to go through.</h1>
      <Link to="/">Try again</Link>
    </div>
  );
}

export default Failure;
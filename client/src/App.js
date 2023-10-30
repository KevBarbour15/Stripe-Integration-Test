import React from "react";
import "./App.css";
import StripeTest from "./pages/StripeTest";
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StripeTest />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

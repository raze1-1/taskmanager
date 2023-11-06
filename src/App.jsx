// App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Creator from "./Creator";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          {/* Use "element" to specify the component */}
          <Route path="/tasks" element={<Creator />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

// App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Creator from "./components/Creator";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          {/* Use "element" to specify the component */}
          <Route path="/tasks" element={<Creator />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

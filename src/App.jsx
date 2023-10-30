// App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Creator from './Creator';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Use "element" to specify the component */}
          <Route path="/tasks" element={<Creator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

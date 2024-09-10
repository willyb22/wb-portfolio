import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Models from './pages/Models';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/models" element={<Models />} />
      </Routes>
    </Router>
  );
}


export default App;

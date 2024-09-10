import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Import a separate CSS file for Navbar styles

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/reports">Reports</Link></li>
        <li className="navbar-item"><Link to="/models">Models</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

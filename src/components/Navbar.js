import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../icons8-calories-64.png"

 const Navbar =()=> {
  
// navbar bootstrap
    return localStorage.length > 1 ? (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
        <img src={logo} alt="logo"></img>Calorie Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/all-exercises" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/all-foodeaten" className="nav-link">Food Eaten</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create-exercise" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create-foodeaten" className="nav-link">Create Food Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/login" className="nav-link">Accounts</Link>
          </li>
        </ul>
        </div>
      </nav>
    ):(
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
        <img src={logo} alt="logo"></img>Calorie Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/login" className="nav-link">Log in</Link>
          </li>
        </ul>
        </div>
      </nav>
    )
  }

export default Navbar


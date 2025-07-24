import { useState } from "react";
import logo from "url:../assets/logo.png";
import { Link } from "react-router-dom";
const Header = () => {
  const arr= useState("Login");
  const btn = arr[0];
  const changeBtn = arr[1];
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={logo} alt="logo image" />
      </div>
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link> </li>
          <li><Link to="/about">About Us</Link> </li>
          <li><Link to="/contact">Contact Us</Link> </li>
          <li><Link to="/cart">Cart</Link> </li>
          <button onClick={
            () => {
              btn==="Login" ? changeBtn("Logout") : changeBtn("Login")
            }
          } className="login">{btn}</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
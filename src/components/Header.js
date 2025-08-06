import { useState } from "react";
import logo from "url:../assets/logo.png";
import { Link } from "react-router-dom";
import useStatusOfInternet from "../utils/useStatusOfInternet";
import { useSelector } from "react-redux";
import {useContext} from "react";
import UserContext from "../utils/UserContext";
const Header = () => {
  const arr = useState("Login");
  const btn = arr[0];
  const changeBtn = arr[1];
  const internetStatus = useStatusOfInternet();
  const {loggedInUser}= useContext(UserContext);

  const cartItems = useSelector((store)=> store.cart.items);
  console.log(cartItems);
  // above we have just subscribed to the store items .
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src={logo} alt="logo image" />
        </Link>
      </div>
      <div className="nav-items">
        <ul>
          <li>Internet Status :{internetStatus ? "✅" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <li>
            <Link to="/cart">Cart ( {cartItems.length} items)</Link>
          </li>
          <button
            onClick={() => {
              btn === "Login" ? changeBtn("Logout") : changeBtn("Login");
            }}
            className="login"
          >
            {btn}
          </button>
          <li>{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

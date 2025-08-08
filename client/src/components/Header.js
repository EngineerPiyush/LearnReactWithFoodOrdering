import { useState } from "react";
import logo from "url:../assets/logo.png";
import { Link } from "react-router-dom";
import useStatusOfInternet from "../utils/useStatusOfInternet";
import { useSelector } from "react-redux";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Header = () => {
  const arr = useState("Login");
  const btn = arr[0];
  const changeBtn = arr[1];
  const [showSidebar, setShowSidebar] = useState(false);
  const internetStatus = useStatusOfInternet();
  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);
  // above we have just subscribed to the store items .
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src={logo} alt="logo image" />
        </Link>
      </div>
      <div className="user-info">{loggedInUser}</div>
      <div className="hamburger" onClick={() => setShowSidebar(!showSidebar)}>
        {showSidebar ? "✖" : "☰"}
      </div>
      <div className="nav-items  desktop-nav">
        <ul>
          <li>Internet Status :{internetStatus ? "✅" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
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
        </ul>
      </div>
      {showSidebar && (
        <>
          <div className={`nav-items sidebar open`}>
            <ul>
              <li>Internet Status: {internetStatus ? "✅" : "🔴"}</li>
              <li>
                <Link to="/" onClick={() => setShowSidebar(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setShowSidebar(false)}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/cart" onClick={() => setShowSidebar(false)}>
                  Cart ({cartItems.length} items)
                </Link>
              </li>
              <button
                onClick={() => {
                  btn === "Login" ? changeBtn("Logout") : changeBtn("Login");
                }}
                className="login"
              >
                {btn}
              </button>
            </ul>
          </div>
          <div className="backdrop" onClick={() => setShowSidebar(false)} />
        </>
      )}
    </div>
  );
};

export default Header;

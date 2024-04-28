import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Assets/TEMP.jpg";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
            <Link to="/">
                <img src={Logo} alt="" />
            </Link>
        </div>
        <div className="links">
            <Link className="link" to="/">
                Home (tests)
            </Link>
            <Link className="link" to="/about">
                About
            </Link>
            <Link className="link" to="/order">
                Order
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
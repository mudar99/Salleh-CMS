import React from "react";
import { useDispatch } from "react-redux";
import { toggle } from "../../redux/themeSlice";
import "./navBar.scss";
const NavBar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="navBar">
      <div className="logo">
        <img src="/Img/Salleh.png" alt="Salleh" />
      </div>
      <ul className="list">
        <li className="item" onClick={() => dispatch(toggle())}>
          Theme
        </li>
        <li className="item">About</li>
        <li className="item">Salleh</li>
      </ul>
    </nav>
  );
};

export default NavBar;

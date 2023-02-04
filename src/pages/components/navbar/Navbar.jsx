import React from "react";
import "./navbar.scss";
import { useDispatch } from "react-redux";
import { toggle } from "../../../redux/themeSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
          <div className="item">
            <i className="pi pi-list"></i>
          </div>
          <div className="item">
            <i className="pi pi-comments"></i>
            <div className="counter">2</div>
          </div>
          <div className="item">
            <i className="pi pi-send"></i>
            <div className="counter">1</div>
          </div>
          <div className="item">
            <i
              className="pi pi-moon"
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(toggle())}
            ></i>
          </div>
          <div className="item">
            <i className="pi pi-folder"></i>
          </div>
          <div className="item">
            <i className="pi pi-globe m-1"></i>
            العربية
          </div>
        </div>

        <div className="search">
          <input type="text" placeholder="البحث" />
          <i className="pi pi-search"></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

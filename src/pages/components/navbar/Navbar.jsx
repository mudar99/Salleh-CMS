import React from "react";
import "./navbar.scss";
import { useDispatch } from "react-redux";
import { toggle } from "../../../redux/themeSlice";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";

const Navbar = () => {
  const dispatch = useDispatch();
  const profileTt = React.useRef(null);
  const settingTt = React.useRef(null);
  const notificationTt = React.useRef(null);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <Link to="/">
            <div ref={profileTt} className="item">
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="avatar"
              />
              <Tooltip
                showDelay={1000}
                target={profileTt}
                content="الملف الشخصي"
                position="bottom"
              />
            </div>
          </Link>
          <div ref={settingTt} className="item">
            <i className="bi bi-gear-fill"></i>
            <Tooltip
              showDelay={1000}
              target={settingTt}
              content="الإعدادات"
              position="bottom"
            />
          </div>
          <Link to="/notifications">
            <div ref={notificationTt} className="item">
              <i className="bi bi-bell-fill"></i>
              <Tooltip
                showDelay={1000}
                target={notificationTt}
                content="الإشعارات"
                position="bottom"
              />
            </div>
          </Link>
          <div className="item">
            <i className="bi bi-envelope-fill"></i>
            <div className="counter">1</div>
          </div>
          <div className="item">
            <i
              className="bi bi-moon-fill"
              onClick={() => dispatch(toggle())}
            ></i>
          </div>
        </div>

        {/* <div className="search">
          <input type="text" placeholder="البحث" />
          <i className="pi pi-search"></i>
        </div> */}

        <span className="search p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="بحث" />
        </span>
      </div>
    </div>
  );
};

export default Navbar;

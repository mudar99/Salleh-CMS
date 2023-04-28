import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dark, light } from "../../../redux/themeSlice";
import {
  categoriesManage,
  customers,
  dashboard,
  employees,
  requestsManage,
  towing,
  towingV,
  verfications,
  warehouseV,
  warehouses,
  workshopV,
  workshops,
} from "../../../redux/visitSlice";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { adminLogout } from "../../../redux/API/authSlice";
import Cookies from "universal-cookie";

const Sidebar = () => {
  // const { darkMode } = useSelector((state) => state.DarkMode);
  // let color = darkMode === true ? "#212121" : "#fffff";
  const dispatch = useDispatch();
  const cookie = new Cookies();

  const logoutConfirmation = (event) => {
    confirmPopup({
      appendTo: document.querySelector("#log-out"),
      appendTo: "self",
      target: event.currentTarget,
      message: "هل تود تسجيل الخروج؟",
      icon: "pi pi-info-circle",
      acceptLabel: "نعم",
      rejectLabel: "لا",
      acceptClassName: "p-button-danger",
      rejectClassName: "p-button-text",
      accept: () => {
        dispatch(adminLogout(cookie.get("jwt_authorization")));
      },
    });
  };

  const { place } = useSelector((state) => state.VisitStatus);
  console.log(place);
  localStorage.setItem("place", place);
  const currentPlace = localStorage.getItem("place");
  return (
    <div className="sidebar">
      <div className="top ">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img className="logo" src="/Img/amara logo 3 png.png" alt="Salleh" />
        </Link>
      </div>

      <hr />

      <div className="center">
        <ul>
          <div
            className="header"
            data-bs-toggle="collapse"
            href="#mainServices"
          >
            <p className="title">رئيسي</p>
            <li className="fas fa-caret-down"></li>
          </div>

          <div className="collapse show" id="mainServices">
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(dashboard())}
            >
              <li className={currentPlace === "dashboard" ? "visited" : ""}>
                <i className="fas fa-chart-pie"></i>
                <span>لوحة التحكم</span>
              </li>
            </Link>
            <Link
              to="/customers"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(customers())}
            >
              <li className={currentPlace === "customers" ? "visited" : ""}>
                <i className="fas fa-users"></i>
                <span>زبائن</span>
              </li>
            </Link>
            <Link
              to="/workshops"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(workshops())}
            >
              <li className={currentPlace === "workshops" ? "visited" : ""}>
                <i className="fas fa-home"></i>
                <span>ورشات</span>
              </li>
            </Link>
            <Link
              to="/towingcars"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(towing())}
            >
              <li className={currentPlace === "towing" ? "visited" : ""}>
                <i className="fas fa-truck-monster"></i>
                <span>سيارات سحب</span>
              </li>
            </Link>

            <Link
              to="/warehouses"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(warehouses())}
            >
              <li className={currentPlace === "warehouses" ? "visited" : ""}>
                <i className="fas fa-warehouse"></i>
                <span>مستودعات</span>
              </li>
            </Link>
          </div>

          <div className="header" data-bs-toggle="collapse" href="#management">
            <p className="title">إدارة</p>
            <li className="fas fa-caret-down"></li>
          </div>

          <div className="collapse show" id="management">
            <Link
              to="/orders"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(requestsManage())}
            >
              <li
                className={currentPlace === "requestsManage" ? "visited" : ""}
              >
                <i className="fas fa-home"></i>
                <span>إدارة الطلبات</span>
              </li>
            </Link>

            <Link
              to="/categories"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(categoriesManage())}
            >
              <li
                className={currentPlace === "categoriesManage" ? "visited" : ""}
              >
                <i className="fas fa-truck-pickup	"></i>
                <span>إدارة الأصناف</span>
              </li>
            </Link>
          </div>

          <div
            className="header"
            data-bs-toggle="collapse"
            href="#verifications"
          >
            <p className="title">طلبات التحقق</p>
            <li className="fas fa-caret-down"></li>
          </div>

          <div className="collapse show" id="verifications">
            <Link
              to="/workshops-verification"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(workshopV())}
            >
              <li className={currentPlace === "workshopV" ? "visited" : ""}>
                <i className="fas fa-home"></i>
                <span>توثيق ورشات</span>
              </li>
            </Link>

            <Link
              to="/towings-verification"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(towingV())}
            >
              <li className={currentPlace === "towingV" ? "visited" : ""}>
                <i className="fas fa-truck-pickup	"></i>
                <span>توثيق سيارات سحب</span>
              </li>
            </Link>

            <Link
              to="/warehouses-verification"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(warehouseV())}
            >
              <li className={currentPlace === "warehouseV" ? "visited" : ""}>
                <i className="fas fa-check-double	"></i>
                <span>توثيق مستودعات</span>
              </li>
            </Link>
          </div>

          <div className="header" data-bs-toggle="collapse" href="#usage">
            <p className="title">استخدام</p>
            <li className="fas fa-caret-down"></li>
          </div>

          <div className="collapse show" id="usage">
            <Link
              to="/employees"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(employees())}
            >
              <li className={currentPlace === "employees" ? "visited" : ""}>
                <i className="fas fa-user-friends"></i>
                <span>موظفون</span>
              </li>
            </Link>

            <li>
              <i className="fas fa-bell"></i>
              <span>إشعارات</span>
            </li>
          </div>

          <div className="header" data-bs-toggle="collapse" href="#services">
            <p className="title">خدمات</p>
            <li className="fas fa-caret-down"></li>
          </div>

          <div className="collapse show" id="services">
            <li>
              <i className="fas fa-exclamation-circle	"></i>
              <span>شكاوى</span>
            </li>
            <li>
              <i className="fas fa-history"></i>
              <span>سجلات النظام</span>
            </li>
            <li>
              <i className="fas fa-cogs"></i>
              <span>إعدادات</span>
            </li>
          </div>

          <div className="header" data-bs-toggle="collapse" href="#user">
            <p className="title">مستخدم</p>
            <li className="fas fa-caret-down"></li>
          </div>

          <div className="collapse show" id="user">
            <li>
              <i className="pi pi-user"></i>
              <span>{localStorage.getItem("email")}</span>
            </li>
            <li onClick={logoutConfirmation}>
              <i className="fa fa-sign-out-alt"></i>
              <span id="log-out">تسجيل خروج</span>
            </li>
          </div>
        </ul>
      </div>

      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch(light())}></div>
        <div className="colorOption" onClick={() => dispatch(dark())}></div>
      </div>
      <ConfirmPopup />
    </div>
  );
};

export default Sidebar;

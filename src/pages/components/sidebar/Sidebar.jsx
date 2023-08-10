import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dark, light } from "../../../redux/themeSlice";
import {
  block,
  categoriesManage,
  complaints,
  customers,
  dashboard,
  employees,
  maps,
  preRequestsManage,
  requestsManage,
  roles,
  suggestions,
  towing,
  towingRequests,
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
            <li className="bi bi-caret-down-fill"></li>
          </div>

          <div className="collapse show" id="mainServices">
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(dashboard())}
            >
              <li className={currentPlace === "dashboard" ? "visited" : ""}>
                <i className="bi bi-pie-chart-fill"></i>
                <span>لوحة التحكم</span>
              </li>
            </Link>
            <Link
              to="/clientsmap"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(maps())}
            >
              <li className={currentPlace === "maps" ? "visited" : ""}>
                <i className="bi bi-globe-central-south-asia"></i>
                <span>خارطة العملاء</span>
              </li>
            </Link>
          </div>
          <div className="header" data-bs-toggle="collapse" href="#users">
            <p className="title">مستخدمين</p>
            <li className="bi bi-caret-down-fill"></li>
          </div>

          <div className="collapse show" id="users">
            <Link
              to="/customers"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(customers())}
            >
              <li className={currentPlace === "customers" ? "visited" : ""}>
                <i className="bi bi-people-fill"></i>
                <span>زبائن</span>
              </li>
            </Link>
            <Link
              to="/workshops"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(workshops())}
            >
              <li className={currentPlace === "workshops" ? "visited" : ""}>
                <i className="bi bi-house-fill"></i>
                <span>ورشات</span>
              </li>
            </Link>
            <Link
              to="/towingcars"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(towing())}
            >
              <li className={currentPlace === "towing" ? "visited" : ""}>
                <i className="bi bi-truck-flatbed"></i>
                <span>سيارات سحب</span>
              </li>
            </Link>

            <Link
              to="/warehouses"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(warehouses())}
            >
              <li className={currentPlace === "warehouses" ? "visited" : ""}>
                <i className="bi bi-building-fill"></i>
                <span>مستودعات</span>
              </li>
            </Link>

            <Link
              to="/black-list"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(block())}
            >
              <li className={currentPlace === "block" ? "visited" : ""}>
                <i className="bi bi-person-fill-slash"></i>
                <span>حظر</span>
              </li>
            </Link>
          </div>

          <div className="header" data-bs-toggle="collapse" href="#management">
            <p className="title">صيانة</p>
            <li className="bi bi-caret-down-fill"></li>
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
                <i className="bi bi-house-gear-fill"></i>
                <span>طلبات صيانة فورية</span>
              </li>
            </Link>

            <Link
              to="/pre-orders"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(preRequestsManage())}
            >
              <li
                className={
                  currentPlace === "preRequestsManage" ? "visited" : ""
                }
              >
                <i className="bi bi-house-gear-fill"></i>
                <span>طلبات صيانة مسبقة</span>
              </li>
            </Link>

            <Link
              to="/towing-orders"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(towingRequests())}
            >
              <li
                className={currentPlace === "towingRequests" ? "visited" : ""}
              >
                <i className="bi bi-truck-flatbed"></i>
                <span>طلبات سيارات السحب</span>
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
                <i className="bi bi-tags-fill"></i>
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
            <li className="bi bi-caret-down-fill"></li>
          </div>

          <div className="collapse show" id="verifications">
            <Link
              to="/workshops-verification"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(workshopV())}
            >
              <li className={currentPlace === "workshopV" ? "visited" : ""}>
                <i className="bi bi-house-check-fill"></i>
                <span>توثيق ورشات</span>
              </li>
            </Link>

            <Link
              to="/towings-verification"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(towingV())}
            >
              <li className={currentPlace === "towingV" ? "visited" : ""}>
                <i className="bi bi-truck-flatbed"></i>
                <span>توثيق سيارات سحب</span>
              </li>
            </Link>

            <Link
              to="/warehouses-verification"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(warehouseV())}
            >
              <li className={currentPlace === "warehouseV" ? "visited" : ""}>
                <i className="bi bi-building-fill-check"></i>
                <span>توثيق مستودعات</span>
              </li>
            </Link>
          </div>

          <div className="header" data-bs-toggle="collapse" href="#usage">
            <p className="title">استخدام</p>
            <li className="bi bi-caret-down-fill"></li>
          </div>

          <div className="collapse show" id="usage">
            <Link
              to="/roles"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(roles())}
            >
              <li className={currentPlace === "roles" ? "visited" : ""}>
                <i className="bi bi-person-lines-fill"></i>
                <span>أدوار</span>
              </li>
            </Link>

            <Link
              to="/employees"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(employees())}
            >
              <li className={currentPlace === "employees" ? "visited" : ""}>
                <i className="bi bi-person-circle"></i>
                <span>موظفون</span>
              </li>
            </Link>
          </div>

          <div className="header" data-bs-toggle="collapse" href="#services">
            <p className="title">خدمات</p>
            <li className="bi bi-caret-down-fill"></li>
          </div>

          <div className="collapse show" id="services">
            <Link
              to="/complaints"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(complaints())}
            >
              <li className={currentPlace === "complaints" ? "visited" : ""}>
                <i className="bi bi-exclamation-circle-fill"></i>
                <span>شكاوى</span>
              </li>
            </Link>
            <Link
              to="/suggestions"
              style={{ textDecoration: "none" }}
              onClick={() => dispatch(suggestions())}
            >
              <li className={currentPlace === "suggestions" ? "visited" : ""}>
                <i className="bi bi-patch-check-fill"></i>
                <span>اقتراحات</span>
              </li>
            </Link>
            <li>
              <i className="bi bi-file-earmark-fill"></i>
              <span>سجلات النظام</span>
            </li>
            <li>
              <i className="bi bi-gear-fill"></i>
              <span>إعدادات</span>
            </li>
          </div>

          <div className="header" data-bs-toggle="collapse" href="#user">
            <p className="title">مستخدم</p>
            <li className="bi bi-caret-down-fill"></li>
          </div>

          <div className="collapse show" id="user">
            <li>
              <i className="bi bi-person-fill"></i>
              <span>{localStorage.getItem("email")}</span>
            </li>
            <li onClick={logoutConfirmation}>
              <i className="bi bi-box-arrow-right"></i>
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

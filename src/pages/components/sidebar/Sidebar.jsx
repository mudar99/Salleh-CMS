import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dark, light } from "../../../redux/themeSlice";
import {
  customers,
  dashboard,
  employees,
  towing,
  verfications,
  warehouses,
  workshops,
} from "../../../redux/visitSlice";
const Sidebar = () => {
  const dispatch = useDispatch();
  const { place } = useSelector((state) => state.VisitStatus);
  console.log(place);
  localStorage.setItem("place", place);
  const currentPlace = localStorage.getItem("place");
  return (
    <div className="sidebar">
      <div className="top ">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img className="logo" src="/Img/amara logo 3 png.png" alt="logo" />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">رئيسي</p>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            onClick={() => dispatch(dashboard())}
          >
            <li className={currentPlace === "dashboard" && "visited"}>
              <i className="fas fa-chart-pie"></i>
              <span>لوحة التحكم</span>
            </li>
          </Link>

          <p className="title">قوائم</p>
          <Link
            to="/customers"
            style={{ textDecoration: "none" }}
            onClick={() => dispatch(customers())}
          >
            <li className={currentPlace === "customers" && "visited"}>
              <i className="fas fa-users"></i>
              <span>زبائن</span>
            </li>
          </Link>
          <Link
            to="/workshops"
            style={{ textDecoration: "none" }}
            onClick={() => dispatch(workshops())}
          >
            <li className={currentPlace === "workshops" && "visited"}>
              <i className="fas fa-home"></i>
              <span>ورشات</span>
            </li>
          </Link>
          <Link
            to="/towingcars"
            style={{ textDecoration: "none" }}
            onClick={() => dispatch(towing())}
          >
            <li className={currentPlace === "towing" && "visited"}>
              <i className="fas fa-truck-monster"></i>
              <span>سيارات سحب</span>
            </li>
          </Link>

          <Link
            to="/warehouses"
            style={{ textDecoration: "none" }}
            onClick={() => dispatch(warehouses())}
          >
            <li className={currentPlace === "warehouses" && "visited"}>
              <i className="fas fa-warehouse"></i>
              <span>مستودعات</span>
            </li>
          </Link>
          <Link
            to="/verifications"
            style={{ textDecoration: "none" }}
            onClick={() => dispatch(verfications())}
          >
            <li className={currentPlace === "verifications" && "visited"}>
              <i className="fas fa-check-double	"></i>
              <span>طلبات التحقق</span>
            </li>
          </Link>
          <p className="title">استخدام</p>

          <Link
            to="/employees"
            style={{ textDecoration: "none" }}
            onClick={() => dispatch(employees())}
          >
            <li className={currentPlace === "employees" && "visited"}>
              <i className="fas fa-user-friends"></i>
              <span>موظفون</span>
            </li>
          </Link>

          <li>
            <i className="fas fa-bell"></i>
            <span>إشعارات</span>
          </li>
          <p className="title">خدمات</p>
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
          <p className="title">مستخدم</p>
          <li>
            <i className="pi pi-check"></i>
            <span>ملف شخصي</span>
          </li>
          <li>
            <i className="fa fa-sign-out-alt"></i>
            <span>تسجيل خروج</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch(light())}></div>
        <div className="colorOption" onClick={() => dispatch(dark())}></div>
      </div>
    </div>
  );
};

export default Sidebar;

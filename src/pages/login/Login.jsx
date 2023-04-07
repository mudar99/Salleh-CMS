import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../redux/API/authSlice";
import { showError, showInfo, showSuccess } from "../../ToastService";
import "./login.scss";
import NavBar from "./NavBar";
import Cookies from "universal-cookie";
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector((state) => state.admin);
  const toast = useRef(null);
  const cookie = new Cookies();

  useEffect(() => {
    if (cookie.get("jwt_authoriazation") !== undefined) {
      window.location.href = "/";
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    let user = new FormData();
    user.append("email", email);
    user.append("password", password);
    dispatch(adminLogin(user)).then((res) => {
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        return;
      }
      if (typeof res.payload === "object") {
        showError(res.payload.message, toast);
      } else if (typeof res.payload === "string") {
        showError(res.payload, toast);
      }
    });
  };
  return (
    <div className="login">
      <Toast ref={toast} dir="ltr" />
      <NavBar />
      <div className="loginContainer">
        <div className="logo">
          <img src="/Img/amara logo 3 png.png" alt="Car Maintenance" />
        </div>
        <div className="title">
          <h4>Salleh</h4>
          <h6>نظام إدارة محتوى</h6>
        </div>
        <form onSubmit={submitHandler}>
          <div className="card flex justify-content-center">
            <span className="p-float-label">
              <InputText
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%" }}
                type="email"
              />
              <label htmlFor="email">
                <i className="fa fa-envelope"></i>
                <p>البريد الالكتروني</p>
              </label>
            </span>
          </div>

          <div className="card flex justify-content-center">
            <span className="p-float-label">
              <InputText
                required
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%" }}
                type="password"
              />
              <label htmlFor="password">
                <i className="fas fa-user-lock	"></i>
                <p>كلمة المرور</p>
              </label>
            </span>
          </div>
          <div className="submit">
            <Button
              label="تسجيل الدخول"
              raised
              loading={loading}
              type="submit"
              dir="ltr"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

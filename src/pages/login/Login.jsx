import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../redux/API/authSlice";
import { showError, showSuccess } from "../../ToastService";
import "./login.scss";
import NavBar from "./NavBar";
// import { Checkbox } from "primereact/checkbox";
import Cookies from "universal-cookie";
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const toast = useRef(null);
  const cookie = new Cookies();
  // const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (cookie.get("jwt_authorization") !== undefined) {
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
                <i class="bi bi-envelope-at-fill"></i>
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
                <i class="bi bi-person-fill-lock"></i>
                <p>كلمة المرور</p>
              </label>
            </span>
          </div>
          {/* <span className="remember">
            <Checkbox
              onChange={(e) => setChecked(e.checked)}
              checked={checked}
            ></Checkbox>
            <label>حفظ كلمة المرور</label>
          </span> */}
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

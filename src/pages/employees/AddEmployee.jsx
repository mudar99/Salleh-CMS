import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { CreateAdmin } from "../../redux/API/adminSlice";
import { showError, showSuccess } from "../../ToastService";
import { useDispatch, useSelector } from "react-redux";

const AddEmployee = (props) => {
  const dispatch = useDispatch();
  const { btnLoading } = useSelector((state) => state.admins);
  const [adminName, setAdminName] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [adminPassword, setAdminPassword] = useState();
  const [roleId, setRoleId] = useState();
  const toast = useRef(null);
  const AddAdminHandler = (e) => {
    e.preventDefault();
    let obj = new FormData();
    obj.append("name", adminName);
    obj.append("email", adminEmail);
    obj.append("password", adminPassword);
    obj.append("role_id", roleId);

    dispatch(CreateAdmin(obj)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        return;
      }
      showError(res.payload, toast);
    });
  };

  return (
    <form className="addEmployee container" onSubmit={AddAdminHandler}>
      <div className="form-group wrapper">
        <div className="container mt-3">
          <h6 className="mt-2 text-right">اسم المستخدم</h6>
          <InputText
            placeholder="User name"
            style={{ width: "100%" }}
            onChange={(e) => {
              setAdminName(e.target.value);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">البريد الالكتروني</h6>
          <InputText
            placeholder="name@example.com"
            style={{ width: "100%" }}
            onChange={(e) => {
              setAdminEmail(e.target.value);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">كلمة المرور</h6>
          <InputText
            placeholder="Password"
            style={{ width: "100%" }}
            onChange={(e) => {
              setAdminPassword(e.target.value);
            }}
            type="password"
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">Role ID</h6>
          <InputText
            placeholder="ID"
            style={{ width: "100%" }}
            onChange={(e) => {
              setRoleId(e.target.value);
            }}
            type="number"
          />
        </div>
      </div>
      <span className="actions">
        <Button label="إضافة" icon="pi pi-check" raised loading={btnLoading} />
        <Button
          label="إلغاء"
          icon="pi pi-times"
          severity="danger"
          raised
          onClick={() => props.visibleState(false)}
        />
      </span>
    </form>
  );
};

export default AddEmployee;

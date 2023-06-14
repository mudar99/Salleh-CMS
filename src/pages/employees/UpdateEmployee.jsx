import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../ToastService";
import { GetAdmins, UpdateAdmin as updateApi } from "../../redux/API/adminSlice";
import { GetRoles } from "../../redux/API/roles&permissions/rolesSlice";
import { Dropdown } from "primereact/dropdown";
import LanguageInput from "../../utils/LanguageInput";

const UpdateEmployee = (props) => {
  const dispatch = useDispatch();
  const { btnLoading, currentPage } = useSelector((state) => state.admins);
  const [adminName, setAdminName] = useState(props.data.name);
  const [adminEmail, setAdminEmail] = useState(props.data.email);
  const [adminPassword, setAdminPassword] = useState();
  const [adminPhone, setAdminPhone] = useState(props.data.phone_number);
  const [selectedRole, setSelectedRole] = useState(props.data.role);
  const toast = useRef(null);
  const { data } = useSelector((state) => state.roles);
  const UpdateAdminHandler = (e) => {
    e.preventDefault();

    let obj = new FormData();
    obj.append("name", adminName);
    obj.append("email", adminEmail);
    obj.append("phone_number", adminPhone);
    if (adminPassword !== undefined) obj.append("password", adminPassword);
    obj.append("role_id", selectedRole.id);
    let data = { id: props.data.id, obj };
    let info = { size: props.basicRows, page: currentPage, isPaginate: 1 };
    dispatch(updateApi(data)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        setTimeout(() => {
          props.visibleState(false);
          dispatch(GetAdmins(info));
        }, 1000);
        return;
      }
      showError(res.payload, toast);
    });
  };
  const getRolesHandler = () => {
    let info = { size: 2, page: 1 };
    dispatch(GetRoles(info));
  };
  return (
    <form className="container" onSubmit={UpdateAdminHandler}>
      <Toast ref={toast} appendTo={document.querySelector(".employees")} />
      <div className="form-group wrapper">
        <div className="container mt-3">
          <h6 className="mt-2 text-right">الدور</h6>
          <Dropdown
            appendTo={"self"}
            valueTemplate={props.data.role.name}
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.value)}
            onShow={getRolesHandler}
            options={data}
            optionLabel="name"
            placeholder="Select a Role"
            className="w-100"
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">اسم المستخدم</h6>
          <LanguageInput
            defaultValue={props.data.name}
            required
            placeholder="User name"
            type="text"
            onChange={(e) => {
              setAdminName(e);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">البريد الالكتروني</h6>
          <LanguageInput
            defaultValue={props.data.email}
            required
            placeholder="name@example.com"
            type="email"
            onChange={(e) => {
              setAdminEmail(e);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">رقم الجوال</h6>
          <LanguageInput
            defaultValue={props.data.phone_number}
            required
            placeholder="Phone Number"
            type="text"
            onChange={(e) => {
              setAdminPhone(e);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">كلمة المرور</h6>
          <LanguageInput
            required
            placeholder="Password"
            type="password"
            onChange={(e) => {
              setAdminPassword(e);
            }}
          />
        </div>
      </div>
      <span className="actions">
        <Button
          label="تعديل"
          icon="pi pi-check"
          type="submit"
          raised
          loading={btnLoading}
        />
        <Button
          label="إلغاء"
          icon="pi pi-times"
          severity="danger"
          type="button"
          raised
          onClick={() => props.visibleState(false)}
        />
      </span>
      <Toast ref={toast} />
    </form>
  );
};

export default UpdateEmployee;

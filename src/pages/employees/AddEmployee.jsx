import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { CreateAdmin, GetAdmins } from "../../redux/API/adminSlice";
import { showError, showSuccess } from "../../ToastService";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { GetRoles } from "../../redux/API/roles&permissions/rolesSlice";
import LanguageInput from "../../utils/LanguageInput";

const AddEmployee = (props) => {
  const dispatch = useDispatch();
  const { btnLoading, currentPage } = useSelector((state) => state.admins);
  const { data } = useSelector((state) => state.roles);
  const [adminName, setAdminName] = useState();
  const [adminEmail, setAdminEmail] = useState();
  const [adminPassword, setAdminPassword] = useState();
  const [adminPhone, setAdminPhone] = useState();
  const toast = useRef(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const AddAdminHandler = (e) => {
    e.preventDefault();
    let obj = new FormData();
    obj.append("name", adminName);
    obj.append("email", adminEmail);
    obj.append("phone_number", adminPhone);
    obj.append("password", adminPassword);
    obj.append("role_id", selectedRole.id);
    let info = { size: props.basicRows, page: currentPage, isPaginate: 1 };

    dispatch(CreateAdmin(obj)).then((res) => {
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
    <form className="addEmployee container" onSubmit={AddAdminHandler}>
      <div className="form-group wrapper">
        <div className="container mt-3">
          <h6 className="mt-2 text-right">الدور</h6>
          <Dropdown
            appendTo={"self"}
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
          label="إضافة"
          type="submit"
          icon="pi pi-check"
          raised
          loading={btnLoading}
        />
        <Button
          type="button"
          label="إلغاء"
          icon="pi pi-times"
          severity="danger"
          raised
          onClick={() => props.visibleState(false)}
        />
      </span>
      <Toast ref={toast} />
    </form>
  );
};

export default AddEmployee;

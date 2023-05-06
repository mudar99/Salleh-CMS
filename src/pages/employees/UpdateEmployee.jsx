import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../ToastService";
import { UpdateAdmin as updateApi } from "../../redux/API/adminSlice";
import { GetRoles } from "../../redux/API/roles&permissions/rolesSlice";
import { Dropdown } from "primereact/dropdown";

const UpdateEmployee = (props) => {
  const dispatch = useDispatch();
  const { btnLoading } = useSelector((state) => state.admins);
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
    dispatch(updateApi(data)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        setTimeout(() => {
          props.visibleState(false);
          // dispatch(getCategories());
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
          <InputText
            defaultValue={props.data.name}
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
            defaultValue={props.data.email}
            placeholder="name@example.com"
            style={{ width: "100%" }}
            onChange={(e) => {
              setAdminEmail(e.target.value);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">رقم الجوال</h6>
          <InputText
            defaultValue={props.data.phone_number}
            required
            placeholder="Phone Number"
            style={{ width: "100%" }}
            onChange={(e) => {
              setAdminPhone(e.target.value);
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

import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { CreateAdmin } from "../../redux/API/adminSlice";
import { showError, showSuccess } from "../../ToastService";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { GetRoles } from "../../redux/API/roles&permissions/rolesSlice";

const AddEmployee = (props) => {
  const dispatch = useDispatch();
  const { btnLoading } = useSelector((state) => state.admins);
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

    dispatch(CreateAdmin(obj)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
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
          <InputText
            required
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
            required
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
            required
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
        <Button label="إضافة" icon="pi pi-check" raised loading={btnLoading} />
        <Button
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

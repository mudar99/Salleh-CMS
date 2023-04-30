import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { CreateCategory, getCategories } from "../../redux/API/categorySlice";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../ToastService";
import { CreateRole, GetRoles } from "../../redux/API/roles&permissions/rolesSlice";

const AddRole = (props) => {
  const dispatch = useDispatch();
  const { btnLoading } = useSelector((state) => state.roles);
  const AddRoleHandler = (e) => {
    e.preventDefault();
    let obj = new FormData();
    obj.append("name", roleName);
    dispatch(CreateRole(obj)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        return;
      }
      showError(res.payload, toast);
    });
  };
  const [roleName, setRoleName] = useState();
  const toast = useRef(null);
  return (
    <form className="container" onSubmit={AddRoleHandler}>
      <Toast ref={toast} />
      <div className="form-group wrapper">
        <div className="container mt-3">
          <h6 className="mt-2 text-right">اسم الدور</h6>
          <InputText
            placeholder="Role name"
            style={{ width: "100%" }}
            onChange={(e) => {
              setRoleName(e.target.value);
            }}
          />
        </div>
      </div>
      <span className="actions">
        <Button
          label="إضافة"
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
    </form>
  );
};

export default AddRole;

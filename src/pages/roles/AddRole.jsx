import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../ToastService";
import {
  CreateRole,
  GetPaginateRoles,
  GetRoles,
} from "../../redux/API/roles&permissions/rolesSlice";
import LanguageInput from "../../utils/LanguageInput";

const AddRole = (props) => {
  const dispatch = useDispatch();
  const { btnLoading, currentPage } = useSelector((state) => state.roles);

  const AddRoleHandler = (e) => {
    e.preventDefault();
    let obj = new FormData();
    obj.append("name", roleName);
    console.log(props.basicRows, currentPage);
    let info = { size: props.basicRows, page: currentPage, isPaginate: 1 };
    dispatch(CreateRole(obj)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        setTimeout(() => {
          props.visibleState(false);
          dispatch(GetPaginateRoles(info));
        }, 1000);
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
          <LanguageInput
            required
            placeholder="Role name"
            type="text"
            onChange={(e) => {
              setRoleName(e);
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

import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../ToastService";
import {
  GetPaginateRoles,
  UpdateRole as updateApi,
} from "../../redux/API/roles&permissions/rolesSlice";
import LanguageInput from "../../utils/LanguageInput";

const UpdateRole = (props) => {
  const dispatch = useDispatch();
  const { btnLoading, currentPage } = useSelector((state) => state.roles);
  const [roleName, setRoleName] = useState(props.data.name);
  const toast = useRef(null);
  const UpdateRoleHandler = (e) => {
    e.preventDefault();
    let obj = new FormData();
    obj.append("name", roleName);
    let data = { id: props.data.id, obj };
    let info = { size: props.basicRows, page: currentPage, isPaginate: 1 };
    dispatch(updateApi(data)).then((res) => {
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
  return (
    <form className="container" onSubmit={UpdateRoleHandler}>
      <Toast ref={toast} appendTo={document.querySelector(".roles")} />
      <div className="form-group wrapper">
        <div className="container mt-3">
          <h6 className="mt-2 text-right">اسم الدور</h6>
          <LanguageInput
            defaultValue={props.data.name}
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
    </form>
  );
};

export default UpdateRole;

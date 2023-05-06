import { Button } from "primereact/button";
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AssignPermissionsToRole,
  GetPermissions,
} from "../../redux/API/roles&permissions/rolesSlice";
import { showError, showSuccess } from "../../ToastService";
import { Toast } from "primereact/toast";

const AssignPermissions = (props) => {
  const dispatch = useDispatch();
  const toast = useRef(null);

  const multiselectRef = React.createRef();
  const { show, btnLoading } = useSelector((state) => state.roles);
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState(
    show.permissions
  );
  const deletedPermissions = [];
  useEffect(() => {
    dispatch(GetPermissions()).then((res) => {
      setPermissions(res.payload.data);
    });
  }, []);

  const selectHandler = (selectedList) => {
    setSelectedPermissions(selectedList);
  };
  const removeHandler = (selectedList, removedItem) => {
    setSelectedPermissions(selectedList);
    deletedPermissions.push(removedItem);
  };
  const SubmitHandler = (e) => {
    e.preventDefault();
    let obj;
    let formData = new FormData();

    for (let i = 0; i < selectedPermissions.length; i++) {
      for (let j = 0; j < deletedPermissions.length; j++) {
        if (selectedPermissions[i] === deletedPermissions[j]) {
          deletedPermissions.splice(j);
        }
      }
    }
    console.log(selectedPermissions);
    console.log(deletedPermissions);

    for (let i = 0; i < selectedPermissions.length; i++) {
      formData.append(`permission[${i}]`, selectedPermissions[i].id);
    }
    for (let i = 0; i < deletedPermissions.length; i++) {
      formData.append(`delete_permission[${i}]`, deletedPermissions[i].id);
    }

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }
    obj = { id: props.data.id, info: formData };
    dispatch(AssignPermissionsToRole(obj)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        return;
      }
      showError(res.payload, toast);
    });
  };
  return (
    <div>
      {btnLoading && show.length === 0 ? (
        <div className="text-center m-4">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        show.permissions && (
          <form onSubmit={SubmitHandler}>
            <div className="container border-bottom border-top p-4">
              <h6 className="fw-bold">صلاحيات هذا الدور</h6>
              <ul style={{ direction: "ltr", listStyleType: "circle" }}>
                {show.permissions.length === 0 && (
                  <h6 className=" text-end text-danger mt-3">
                    لايوجد صلاحيات لهذا الدور
                  </h6>
                )}
                {show.permissions.map((item) => {
                  return <li style={{ textAlign: "left" }}>{item.name}</li>;
                })}
              </ul>
            </div>
            <div style={{ height: "21vw" }}>
              <div className="container p-4">
                <h6 className="fw-bold mt-3 mb-3">تعديل الصلاحيات</h6>
                <Multiselect
                  selectedValues={show.permissions.map((e) => {
                    return e;
                  })}
                  onRemove={removeHandler}
                  options={permissions}
                  displayValue="name"
                  onSelect={selectHandler}
                  ref={multiselectRef}
                  placeholder="اختيار الصلاحيات"
                  showArrow={true}
                  loading={btnLoading}
                  loadingMessage="... الرجاء الانتظار"
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
        )
      )}
      <Toast ref={toast} />
    </div>
  );
};

export default AssignPermissions;

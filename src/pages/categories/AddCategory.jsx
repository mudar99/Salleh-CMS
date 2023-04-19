import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { CreateCategory, getCategories } from "../../redux/API/categorySlice";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../ToastService";

const AddCategory = (props) => {
  const dispatch = useDispatch();
  const { btnLoading } = useSelector((state) => state.category);
  const AddCategoryHandler = (e) => {
    e.preventDefault();
    let obj = new FormData();
    obj.append("name", catName);
    obj.append("description", catDescription);
    if (parentID) obj.append("category_id", parentID);
    dispatch(CreateCategory(obj)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        setTimeout(() => {
          props.visibleState(false);
          dispatch(getCategories());
        }, 1000);
        return;
      }
      showError(res.payload, toast);
    });
  };
  const [catName, setCatName] = useState();
  const [catDescription, setCatDescription] = useState();
  const [parentID, setParentID] = useState();
  const toast = useRef(null);
  return (
    <form className="container" onSubmit={AddCategoryHandler}>
      <Toast ref={toast} />
      <div className="form-group wrapper">
        <div className="container mt-3">
          <h6 className="mt-2 text-right">اسم الصنف</h6>
          <InputText
            placeholder="Category name"
            style={{ width: "100%" }}
            onChange={(e) => {
              setCatName(e.target.value);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">وصف الصنف</h6>{" "}
          <InputText
            placeholder="Description"
            style={{ width: "100%" }}
            onChange={(e) => {
              setCatDescription(e.target.value);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">معرف الصنف الأب</h6>
          <InputText
            placeholder="Parent ID"
            style={{ width: "100%" }}
            type="number"
            onChange={(e) => {
              setParentID(e.target.value);
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

export default AddCategory;

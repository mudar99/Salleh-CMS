import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../ToastService";
import {
  GetCategories,
  UpdateCategory as updateApi,
} from "../../redux/API/categorySlice";
import LanguageInput from "../../utils/LanguageInput";
import { FileUpload } from "primereact/fileupload";

const UpdateCategory = (props) => {
  const dispatch = useDispatch();
  const { btnLoading } = useSelector((state) => state.category);

  const [catName, setCatName] = useState(props.data.data.name);
  const [catDescription, setCatDescription] = useState(
    props.data.data.description
  );
  const [parentID, setParentID] = useState(props.data.category_id);
  const [catPhoto, setCatPhoto] = useState();
  const toast = useRef(null);

  console.log(props.data);
  const UpdateCategoryHandler = (e) => {
    e.preventDefault();
    // console.log(catName, catDescription, parentID);
    let obj = new FormData();
    obj.append("name", catName);
    obj.append("description", catDescription);
    if (catPhoto !== undefined) obj.append("category_photo", catPhoto);
    if (parentID) obj.append("category_id", parentID);
    let data = { id: props.data.key, obj };
    dispatch(updateApi(data)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        setTimeout(() => {
          props.visibleState(false);
          dispatch(GetCategories());
        }, 1000);
        return;
      }
      showError(res.payload, toast);
    });
  };
  return (
    <form className="container" onSubmit={UpdateCategoryHandler}>
      <Toast ref={toast} appendTo={document.querySelector(".categories")} />
      <div className="form-group wrapper">
        <div className="container mt-3">
          <h6 className="mt-2 text-right">اسم الصنف</h6>
          <LanguageInput
            defaultValue={props.data.data.name}
            placeholder="Category name"
            type="text"
            onChange={(e) => {
              setCatName(e);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">وصف الصنف</h6>
          <LanguageInput
            defaultValue={props.data.data.description}
            placeholder="Description"
            type="text"
            onChange={(e) => {
              setCatDescription(e);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">معرف الصنف الأب</h6>
          <LanguageInput
            defaultValue={
              props.data.data.category_id !== null &&
              props.data.data.category_id
            }
            placeholder="Parent ID"
            type="number"
            onChange={(e) => {
              setParentID(e);
            }}
          />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">صورة الصنف</h6>
          <FileUpload
            mode="advanced"
            chooseLabel="اختر صورة"
            cancelLabel="إلغاء"
            accept="image/*"
            maxFileSize={1000000}
            onSelect={(event) => setCatPhoto(event.files[0])}
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

export default UpdateCategory;

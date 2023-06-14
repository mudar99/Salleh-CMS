import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { CreateCategory, GetCategories } from "../../redux/API/categorySlice";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "../../ToastService";
import LanguageInput from "../../utils/LanguageInput";
import { FileUpload } from "primereact/fileupload";

const AddCategory = (props) => {
  const dispatch = useDispatch();
  const { btnLoading } = useSelector((state) => state.category);
  const AddCategoryHandler = (e) => {
    e.preventDefault();
    let obj = new FormData();
    obj.append("name", catName);
    obj.append("description", catDescription);
    obj.append("category_photo", catPhoto);
    if (parentID) obj.append("category_id", parentID);
    dispatch(CreateCategory(obj)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        return;
      }
      showError(res.payload, toast);
    });
  };
  const [catName, setCatName] = useState();
  const [catDescription, setCatDescription] = useState();
  const [parentID, setParentID] = useState();
  const [catPhoto, setCatPhoto] = useState();

  const toast = useRef(null);
  return (
    <form className="container" onSubmit={AddCategoryHandler}>
      <Toast ref={toast} />
      <div className="form-group wrapper">
        <div className="container mt-3">
          <h6 className="mt-2 text-right">اسم الصنف</h6>
          <LanguageInput
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

export default AddCategory;

import React, { useEffect, useRef, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import LoadingFS from "../components/loading/LoadingFS";
import { DeleteCategory, getCategories } from "../../redux/API/categorySlice";
import { showInfo, showSuccess } from "../../ToastService";
import { confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";

const CategoriesDataTable = (props) => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.category);
  const toast = useRef(null);
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const headers = [
    "المعرف",
    "اسم الصنف",
    "معرف الأب",
    "تاريخ الإضافة",
    "وصف",
    "حدث",
  ];
  const header = (
    <div className="header">
      <span className="title">أصناف</span>
      <Button
        icon="pi pi-plus"
        onClick={() => props.createState("C")}
        rounded
        text
        raised
        aria-label="Favorite"
      />
    </div>
  );
  const acitonBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text p-button-success"
          aria-label="Submit"
          onClick={() => props.updateState("U", rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-text p-button-danger"
          aria-label="Submit"
          onClick={(event) => {
            confirmPopup({
              target: event.currentTarget,
              message: "هل تود حذف هذا الصنف؟",
              header: "تاكيد",
              icon: "pi pi-info-circle",
              acceptLabel: "تأكيد",
              rejectLabel: "إلغاء",
              acceptClassName: "p-button-danger",
              rejectClassName: "p-button-text",
              accept: () => {
                dispatch(DeleteCategory(rowData.id)).then((res) => {
                  console.log(res);
                  if (res.payload.status === true) {
                    showSuccess(res.payload.message, toast);
                    dispatch(getCategories());
                    return;
                  }
                });
              },
              reject: () => {
                showInfo("تم الإلغاء", toast);
              },
              appendTo: document.querySelector(".datatable"),
            });
          }}
        />
      </>
    );
  };
  return (
    <div className="datatable">
      {loading && <LoadingFS />}
      <div className="card">
        <DataTable
          header={header}
          value={data}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column align="center" header={headers[0]} field="id"></Column>
          <Column align="center" header={headers[1]} field="name"></Column>
          <Column
            align="center"
            header={headers[2]}
            field={"category_id"}
          ></Column>
          <Column
            align="center"
            header={headers[3]}
            field="created_at"
          ></Column>
          <Column
            align="center"
            header={headers[4]}
            field="description"
          ></Column>
          <Column
            align="center"
            header={headers[5]}
            field="action"
            body={acitonBodyTemplate}
          ></Column>
        </DataTable>
      </div>
      <Toast ref={toast} />
    </div>
  );
};

export default CategoriesDataTable;

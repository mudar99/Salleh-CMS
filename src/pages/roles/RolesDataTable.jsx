import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../style/datatable.scss";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { useDispatch, useSelector } from "react-redux";
import LoadingFS from "../components/loading/LoadingFS";
import {
  DeleteRole,
  GetPaginateRoles,
} from "../../redux/API/roles&permissions/rolesSlice";
import { confirmPopup } from "primereact/confirmpopup";
import { showInfo, showSuccess } from "../../ToastService";
import { Toast } from "primereact/toast";
const RolesDataTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { loading, data, totalItems } = useSelector((state) => state.roles);
  const toast = useRef(null);
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(5);

  useEffect(() => {
    let info = { size: basicRows, page: currentPage, isPaginate: 1 };
    dispatch(GetPaginateRoles(info));
  }, []);
  const onBasicPageChange = (event) => {
    let currentPage = event.page + 1;
    setCurrentPage(currentPage);
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    let info = { size: basicRows, page: currentPage, isPaginate: 1 };
    dispatch(GetPaginateRoles(info));
  };
  const headers = [
    "المعرف",
    "اسم الدور",
    "تاريخ التسجيل",
    "تاريخ التحديث",
    "حدث",
  ];
  const acitonBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-text p-button-danger"
          aria-label="Submit"
          onClick={(event) => {
            confirmPopup({
              target: event.currentTarget,
              message: "هل تود حذف هذا الدور؟",
              header: "تاكيد",
              icon: "pi pi-info-circle",
              acceptLabel: "تأكيد",
              rejectLabel: "إلغاء",
              acceptClassName: "p-button-danger",
              rejectClassName: "p-button-text",
              accept: () => {
                let info = {
                  size: basicRows,
                  page: currentPage,
                  isPaginate: 1,
                };
                dispatch(DeleteRole(rowData.id)).then((res) => {
                  console.log(res);
                  if (res.payload.status === true) {
                    showSuccess(res.payload.message, toast);
                    dispatch(GetPaginateRoles(info));
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
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-text p-button-primary"
          aria-label="Submit"
          onClick={() => props.updateState("U", rowData, basicRows)}
        />
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-text p-button-success"
          aria-label="Submit"
          onClick={() => props.showState("S", rowData, basicRows)}
        />
      </>
    );
  };
  const header = (
    <div className="header">
      <span className="title">أدوار</span>
      <Button
        icon="pi pi-plus"
        onClick={() => props.createState("C", undefined, basicRows)}
        rounded
        text
        raised
        aria-label="Favorite"
      />
    </div>
  );
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
          <Column align="center" header={headers[1]} field={"name"}></Column>
          <Column
            align="center"
            header={headers[2]}
            field={"created_at"}
          ></Column>
          <Column
            align="center"
            header={headers[3]}
            field="updated_at"
          ></Column>
          <Column
            align="center"
            header={headers[4]}
            field="action"
            body={acitonBodyTemplate}
          ></Column>
        </DataTable>
        <Paginator
          first={basicFirst}
          rows={basicRows}
          totalRecords={totalItems}
          onPageChange={onBasicPageChange}
        ></Paginator>
      </div>
      <Toast ref={toast} />
    </div>
  );
};

export default RolesDataTable;

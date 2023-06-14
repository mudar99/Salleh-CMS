import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../style/datatable.scss";
import { Button } from "primereact/button";
import { DeleteAdmin, GetAdmins } from "../../redux/API/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { Paginator } from "primereact/paginator";
import { showInfo, showSuccess } from "../../ToastService";
import { confirmPopup } from "primereact/confirmpopup";

const EmployeeDataTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { loading, data, totalItems } = useSelector((state) => state.admins);
  const toast = useRef(null);

  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(5);

  useEffect(() => {
    let info = { size: basicRows, page: currentPage };
    dispatch(GetAdmins(info));
  }, []);
  const onBasicPageChange = (event) => {
    let currentPage = event.page + 1;
    setCurrentPage(currentPage);
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    let info = { size: basicRows, page: currentPage };
    dispatch(GetAdmins(info));
  };
  const headers = [
    "المعرف",
    "البريد الإلكتروني",
    "رقم الجوال",
    "تاريخ التسجيل",
    "معرف الدور",
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
              message: "هل تود حذف هذا الموظّف؟",
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
                };
                dispatch(DeleteAdmin(rowData.id)).then((res) => {
                  console.log(res);
                  if (res.payload.status === true) {
                    showSuccess(res.payload.message, toast);
                    dispatch(GetAdmins(info));
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
      <span className="title">موظّفون</span>
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
      <div className="card">
        <DataTable
          header={header}
          value={data}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column align="center" header={headers[0]} field="id"></Column>
          <Column align="center" header={headers[1]} field="email"></Column>
          <Column
            align="center"
            header={headers[2]}
            field="phone_number"
          ></Column>
          <Column
            align="center"
            header={headers[3]}
            field="created_at"
          ></Column>
          <Column align="center" header={headers[4]} field="role_id"></Column>
          <Column
            align="center"
            header={headers[5]}
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

export default EmployeeDataTable;

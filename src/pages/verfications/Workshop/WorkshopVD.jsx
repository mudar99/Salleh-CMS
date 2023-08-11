import React, { useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../../style/datatable.scss";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import WorkshopExplore from "./WorkshopExplore";
import {
  acceptRequest,
  getVerifyRequests,
  rejectRequest,
} from "../../../redux/API/verify/workshop/workshopVerifications";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { showInfo, showSuccess } from "../../../ToastService";
import LoadingFS from "../../components/loading/LoadingFS";
const WorkshopVD = () => {
  const galleria = useRef(null);
  const toast = useRef(null);
  const headers = [
    "معرف الورشة",
    "اسم الورشة",
    "خط الطول",
    "خط العرض",
    "تاريخ الطلب",
    "صاحب الورشة",
    "البريد",
    "رقم الهاتف",
    "حدث",
  ];

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.WorkshopVerifications);
  useEffect(() => {
    dispatch(getVerifyRequests());
  }, []);
  // console.log(data);

  const acitonBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-text p-button-danger"
          aria-label="Submit"
          onClick={(event) => {
            confirmPopup({
              target: event.currentTarget,
              message: "هل تود رفض الطلب؟",
              header: "تاكيد",
              icon: "pi pi-info-circle",
              acceptLabel: "تأكيد",
              rejectLabel: "إلغاء",
              acceptClassName: "p-button-danger",
              rejectClassName: "p-button-text",
              accept: () => {
                dispatch(rejectRequest(rowData.user_id)).then((res) => {
                  if (res.payload.status === true) {
                    showSuccess(res.payload.message, toast);
                    dispatch(getVerifyRequests());
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
          icon="pi pi-check"
          className="p-button-rounded p-button-text p-button-primary"
          aria-label="Submit"
          onClick={(event) => {
            confirmPopup({
              target: event.currentTarget,
              message: "هل تود الموافقة على الطلب؟",
              header: "تاكيد",
              icon: "pi pi-info-circle",
              acceptLabel: "تأكيد",
              rejectLabel: "إلغاء",
              acceptClassName: "p-button-danger",
              rejectClassName: "p-button-text",
              accept: () => {
                dispatch(acceptRequest(rowData.user_id)).then((res) => {
                  console.log(res);
                  if (res.payload.status === true) {
                    showSuccess(res.payload.message, toast);
                    dispatch(getVerifyRequests());
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
        <WorkshopExplore user_id={rowData.user_id} />
      </>
    );
  };
  return (
    <div className="datatable">
      {loading && <LoadingFS />}
      <div className="">
        <DataTable
          showGridlines
          value={data}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            align="center"
            header={headers[0]}
            field="workshop_id"
          ></Column>
          <Column
            align="center"
            header={headers[1]}
            field="workshop_name"
          ></Column>
          <Column align="center" header={headers[2]} field="longitude"></Column>
          <Column align="center" header={headers[3]} field="latitude"></Column>
          <Column
            align="center"
            header={headers[4]}
            field="created_at"
          ></Column>
          <Column
            align="center"
            header={headers[5]}
            body={(rowData) => {
              return (
                <div>
                  {rowData.firstname} {rowData.lastname}
                </div>
              );
            }}
          ></Column>
          <Column align="center" header={headers[6]} field="email"></Column>
          <Column
            align="center"
            header={headers[7]}
            field="phone_number"
          ></Column>
          <Column
            align="center"
            header={headers[8]}
            field="action"
            body={acitonBodyTemplate}
          ></Column>
        </DataTable>
      </div>
      <ConfirmPopup />
      <Toast ref={toast} />
    </div>
  );
};

export default WorkshopVD;

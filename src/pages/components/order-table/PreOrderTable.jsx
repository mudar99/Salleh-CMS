import React, { useEffect, useRef, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import LoadingFS from "../loading/LoadingFS";
import "../../../style/datatable.scss";
import { Paginator } from "primereact/paginator";
import { isArabic } from "../../../utils/langType";
import {
  ShowWorkshopOrders,
  ShowWorkshopPreOrders,
} from "../../../redux/API/ordersSlice";
import { Tag } from "primereact/tag";

const PreOrderTable = (props) => {
  const dispatch = useDispatch();
  const { loading, userPreOrders, totalItems } = useSelector(
    (state) => state.orders
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(1);
  useEffect(() => {
    let info = { id: props.id, size: basicRows, page: currentPage };
    dispatch(ShowWorkshopPreOrders(info));
  }, []);
  const headers = ["الورشة", "مقدم الطلب", "تاريخ التسجيل", "الحالة"];
  const onBasicPageChange = (event) => {
    let currentPage = event.page + 1;
    setCurrentPage(currentPage);
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    let info = { id: props.id, size: basicRows, page: currentPage };
    dispatch(ShowWorkshopPreOrders(info));
  };
  const statusBodyTemplate = (rowData) => {
    let val;
    switch (rowData.stage) {
      case 0:
        val = "انتظار";
        break;
      case 1:
        val = "بدء";
        break;
      case 2:
        val = "صيانة";
        break;
      case 3:
        val = "تم";
        break;
      default:
        break;
    }
    return <Tag value={val} severity={getSeverity(rowData)}></Tag>;
  };
  const getSeverity = (rowData) => {
    switch (rowData.stage) {
      case 0:
        return "danger";
      case 1:
        return "warning";
      case 2:
        return "info";
      case 3:
        return "success";
      default:
        return null;
    }
  };
  return (
    <div className="datatable">
      {loading && <LoadingFS />}
      <div className="">
        <DataTable value={userPreOrders} tableStyle={{ minWidth: "50rem" }}>
          <Column
            align="center"
            header={headers[0]}
            field="workshop_email"
          ></Column>
          <Column
            align="center"
            header={headers[1]}
            field="user_email"
          ></Column>
          <Column
            align="center"
            header={headers[2]}
            field="created_at"
          ></Column>
          <Column
            align="center"
            header={headers[3]}
            field="action"
            body={statusBodyTemplate}
          ></Column>
        </DataTable>

        <Paginator
          first={basicFirst}
          rows={basicRows}
          totalRecords={totalItems}
          onPageChange={onBasicPageChange}
        ></Paginator>
      </div>
    </div>
  );
};
export default PreOrderTable;

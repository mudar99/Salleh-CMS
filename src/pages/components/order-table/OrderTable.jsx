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

const OrderTable = (props) => {
  const dispatch = useDispatch();
  const { loading, data, totalItems } = useSelector((state) => state.orders);
  const [currentPage, setCurrentPage] = useState(1);
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(5);

  useEffect(() => {
    console.log(props.type, props.id);
    if (props.type === "orders") {
      dispatch(ShowWorkshopOrders(props.id));
    }
    if (props.type === "preorders") {
      dispatch(ShowWorkshopPreOrders(props.id));
    }
  }, [props.type]);
  const headers = [
    "اسم المنتج",
    "تاريخ الإضافة",
    "السعر",
    "الكمية",
    "البلد المصنع",
    "وصف",
    "صورة المنتج",
  ];
  const onBasicPageChange = (event) => {
    let currentPage = event.page + 1;
    setCurrentPage(currentPage);
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    let info = { id: props.id, size: basicRows, page: currentPage };
    // dispatch(GetStoreHouseProducts(info));
  };
  return (
    <div className="datatable">
      {loading && <LoadingFS />}
      <div className="card">
        <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
          <Column align="center" header={headers[0]} field="name"></Column>
          <Column align="center" header={headers[2]} field={"price"}></Column>
          <Column align="center" header={headers[3]} field="quantity"></Column>
          <Column align="center" header={headers[4]} field="made"></Column>
          <Column
            alignHeader="center"
            bodyClassName={(rowData) => {
              return isArabic(rowData.description) ? "arabic" : "english";
            }}
            header={headers[5]}
            field="description"
          ></Column>
          <Column
            align="center"
            header={headers[1]}
            field="created_at"
          ></Column>
          <Column
            align="center"
            header={headers[6]}
            body={(rowData) => {
              return (
                <img
                  src={"http://127.0.0.1:8060" + rowData.image_path}
                  style={{ width: "100px" }}
                />
              );
            }}
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

export default OrderTable;

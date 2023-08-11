import React, { useEffect, useRef, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import LoadingFS from "../loading/LoadingFS";
import "../../../style/datatable.scss";
import { Paginator } from "primereact/paginator";
import { isArabic } from "../../../utils/langType";
import { GetStoreHouseProducts } from "../../../redux/API/users/usersSlice";

const ProductTable = (props) => {
  const dispatch = useDispatch();
  const { loading, userData, totalItems } = useSelector((state) => state.users);
  const [currentPage, setCurrentPage] = useState(1);
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(5);

  useEffect(() => {
    let info = { id: props.id, size: basicRows, page: currentPage };
    dispatch(GetStoreHouseProducts(info));
  }, []);
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
    dispatch(GetStoreHouseProducts(info));
  };
  return (
    <div className="datatable">
      {loading && <LoadingFS />}
      <div className="">
        <DataTable value={userData.products} tableStyle={{ minWidth: "50rem" }}>
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

export default ProductTable;

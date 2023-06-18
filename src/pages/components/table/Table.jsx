import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./table.scss";
import { useDispatch, useSelector } from "react-redux";
import { GetUserCharges } from "../../../redux/API/users/usersSlice";
import { Paginator } from "primereact/paginator";
import LoadingFS from "../loading/LoadingFS";
import { Tag } from "primereact/tag";
export const Table = (props) => {
  const dispatch = useDispatch();
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, userData, totalItems } = useSelector((state) => state.users);

  const onBasicPageChange = (event) => {
    let currentPage = event.page + 1;
    setCurrentPage(currentPage);
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    let info = { size: basicRows, page: currentPage, id: props.id };
    dispatch(GetUserCharges(info));
  };
  useEffect(() => {
    let info = { size: basicRows, page: currentPage, id: props.id };
    dispatch(GetUserCharges(info));
  }, [props.id]);
  const getSeverity = (rowData) => {
    switch (rowData.type) {
      case 0:
        return "warning";
      case 1:
        return "info";
      default:
        return null;
    }
  };
  const statusBodyTemplate = (rowData) => {
    let val;
    switch (rowData.type) {
      case 0:
        val = "شحن";
        break;
      case 1:
        val = "سحب";
        break;
      default:
        break;
    }
    return <Tag className="text-dark" value={val} severity={getSeverity(rowData)}></Tag>;
  };

  return (
    <div className="datatable">
      {loading && <LoadingFS />}
      <div className="card">
        <DataTable value={userData.charges} tableStyle={{ minWidth: "50rem" }}>
          <Column align="center" field="id" header="معرف العملية"></Column>
          <Column
            align="center"
            field="pre_mount"
            header="القيمة السابقة"
          ></Column>
          <Column
            align="center"
            field="new_amount"
            header="القيمة الجديدة"
          ></Column>
          <Column align="center" field="charge" header="المبلغ"></Column>
          <Column
            align="center"
            field="created_at"
            header="تاريخ العملية"
          ></Column>
          <Column
            align="center"
            field="type"
            body={statusBodyTemplate}
            header="نوع العملية"
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

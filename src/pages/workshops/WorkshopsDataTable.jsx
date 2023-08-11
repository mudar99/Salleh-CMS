import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { GetWorkShops } from "../../redux/API/users/usersSlice";
import { Paginator } from "primereact/paginator";
import LoadingFS from "../components/loading/LoadingFS";
import { Link } from "react-router-dom";

const WorkshopsDataTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { loading, data, totalItems } = useSelector((state) => state.users);

  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(5);

  const onBasicPageChange = (event) => {
    let currentPage = event.page + 1;
    setCurrentPage(currentPage);
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    let info = { size: basicRows, page: currentPage, isPaginate: 1 };
    dispatch(GetWorkShops(info));
  };
  useEffect(() => {
    let info = { size: basicRows, page: currentPage, isPaginate: 1 };
    dispatch(GetWorkShops(info));
  }, []);
  const headers = [
    "المعرف",
    "صاحب الورشة",
    "رقم الهاتف",
    "تاريخ التسجيل",
    "البريد",
    "وصف الورشة",
    "تخصص الورشة",
    "عنوان",
    "حدث",
  ];

  const acitonBodyTemplate = (rowData) => {
    return (
      <Link to={String(rowData.id)}>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-text p-button-success"
          aria-label="Submit"
        />
      </Link>
    );
  };
  return (
    <div className="datatable">
      {loading && <LoadingFS />}
      <div className="">
        <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
          <Column align="center" header={headers[0]} field="id"></Column>
          <Column
            align="center"
            header={headers[1]}
            body={(rowData) => {
              return (
                <div>
                  {rowData.firstname} {rowData.lastname}
                </div>
              );
            }}
          ></Column>
          <Column
            align="center"
            header={headers[2]}
            field={"phone_number"}
          ></Column>
          <Column
            align="center"
            header={headers[3]}
            field="created_at"
          ></Column>
          <Column align="center" header={headers[4]} field="email"></Column>
          <Column align="center" header={headers[5]} field="email"></Column>
          <Column align="center" header={headers[6]} field="email"></Column>
          <Column align="center" header={headers[7]} field="email"></Column>
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
    </div>
  );
};

export default WorkshopsDataTable;

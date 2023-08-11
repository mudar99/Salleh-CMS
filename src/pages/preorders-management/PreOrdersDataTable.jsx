import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Tag } from "primereact/tag";
import { useDispatch, useSelector } from "react-redux";
import { GetWorkshopOrders } from "../../redux/API/ordersSlice";
import LoadingFS from "../components/loading/LoadingFS";
import { Paginator } from "primereact/paginator";
const PreOrdersDataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { loading, data, totalItems } = useSelector((state) => state.orders);
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(5);

  const onBasicPageChange = (event) => {
    let currentPage = event.page + 1;
    setCurrentPage(currentPage);
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    let info = { size: basicRows, page: currentPage };
    dispatch(GetWorkshopOrders(info));
  };
  useEffect(() => {
    let info = { size: basicRows, page: currentPage };
    dispatch(GetWorkshopOrders(info));
  }, []);
  console.log(data);
  const headers = [
    "الورشة المسؤولة",
    "عنوان الورشة",
    "مقدم الطلب",
    "تاريخ التسجيل",
    "رقم مقدم الطلب",
    "الحالة",
  ];

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
        <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
          <Column
            align="center"
            header={headers[0]}
            body={(rowData) => {
              return rowData.workshop !== null ? (
                <div>{rowData.workshop.name}</div>
              ) : (
                ".."
              );
            }}
          ></Column>
          <Column
            align="center"
            header={headers[1]}
            body={(rowData) => {
              return rowData.workshop !== null ? (
                <div>{rowData.workshop.address}</div>
              ) : (
                ".."
              );
            }}
          ></Column>
          <Column
            align="center"
            header={headers[2]}
            body={(rowData) => {
              return rowData.user !== null ? (
                <div>
                  {rowData.user.firstname} {rowData.user.lastname}
                </div>
              ) : (
                ".."
              );
            }}
          ></Column>
          <Column
            align="center"
            header={headers[4]}
            body={(rowData) => {
              return rowData.user !== null ? (
                <div>{rowData.user.phone_number}</div>
              ) : (
                ".."
              );
            }}
          ></Column>
          <Column
            align="center"
            header={headers[3]}
            field="created_at"
          ></Column>
          <Column
            align="center"
            header={headers[5]}
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

export default PreOrdersDataTable;

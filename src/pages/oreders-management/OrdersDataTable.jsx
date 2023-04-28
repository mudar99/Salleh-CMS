import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { useDispatch, useSelector } from "react-redux";
import { GetWorkshopOrders } from "../../redux/API/ordersSlice";
import LoadingFS from "../components/loading/LoadingFS";
import { Paginator } from "primereact/paginator";
const OrdersDataTable = () => {
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

  const headers = [
    "المعرف",
    "اسم الطلب",
    "اسم المستخدم",
    "تاريخ التسجيل",
    "طريقة الدفع",
    "الحالة",
  ];
  const data1 = [
    {
      id: 1,
      order: "طلب صيانة دينامو",
      customer: "مضر أبو فخر",
      date: "1 March",
      description: "حالاااات",
      status: "Done",
    },
    {
      id: 2,
      order: "طلب صيانة محرك",
      description: "أصوات في المحرك",
      customer: "علي خضر",
      date: "5 March",
      status: "In Progress",
    },
    {
      id: 3,
      order: "طلب صيانة عجلات",
      description: "اهتزاز في السيارة",
      customer: "أمارة شجاع",
      date: "11 March",
      status: "Pending",
    },
    {
      id: 4,
      order: "طلب صيانة دينامو",
      description: "حالاااات",
      customer: "عبير جريرة",
      date: "3 March",
      status: "Pending",
    },
    {
      id: 5,
      order: "طلب صيانة دينامو",
      description: "حالاااات",
      customer: "علي خضر",
      date: "1 March",
      status: "In Progress",
    },
    {
      id: 5,
      order: "طلب صيانة دينامو",
      description: "حالاااات",
      customer: "مضر أبو فخر",
      date: "1 March",
      status: "In Progress",
    },
    {
      id: 6,
      order: "طلب صيانة دينامو",
      description: "حالاااات",
      customer: "مضر أبو فخر",
      date: "1 March",
      status: "In Progress",
    },
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
      <div className="card">
        <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
          <Column align="center" header={headers[0]} field="id"></Column>
          <Column align="center" header={headers[1]} field="order"></Column>
          <Column align="center" header={headers[2]} field="customer"></Column>
          <Column
            align="center"
            header={headers[3]}
            field="created_at"
          ></Column>
          <Column
            align="center"
            header={headers[4]}
            field="payment_method"
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

export default OrdersDataTable;

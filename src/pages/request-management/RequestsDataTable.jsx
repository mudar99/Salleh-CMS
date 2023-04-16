import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
const RequestsDataTable = () => {
  const headers = [
    "المعرف",
    "اسم الطلب",
    "اسم المستخدم",
    "تاريخ التسجيل",
    "وصف",
    "الحالة",
  ];
  const data = [
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
    return <Tag value={rowData.status} severity={getSeverity(rowData)}></Tag>;
  };
  const getSeverity = (rowData) => {
    switch (rowData.status) {
      case "Done":
        return "success";

      case "In Progress":
        return "warning";

      case "Pending":
        return "danger";

      default:
        return null;
    }
  };
  return (
    <div className="datatable">
      <div className="card">
        <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
          <Column align="center" header={headers[0]} field="id"></Column>
          <Column align="center" header={headers[1]} field="order"></Column>
          <Column align="center" header={headers[2]} field="customer"></Column>
          <Column
            align="center"
            header={headers[3]}
            field="date"
          ></Column>
          <Column align="center" header={headers[4]} field="description"></Column>
          <Column
            align="center"
            header={headers[5]}
            field="action"
            body={statusBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default RequestsDataTable;

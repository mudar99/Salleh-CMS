import React, { useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../../style/datatable.scss";
import { Button } from "primereact/button";
import WarehouseExplore from "./WarehouseExplore";
const WarehouseVD = () => {
  const galleria = useRef(null);
  const headers = [
    "معرف المستودع",
    "اسم الورشة",
    "صاحب الورشة",
    "خط العرض",
    "خط الطول",
    "تاريخ الطلب",
    "رقم الهاتف",
    "البريد",
    "حدث",
  ];
  const data = [
    {
      id: 1,
      name: "ورشة الأنوار",
      customer: "مضر أبو فخر",
      latitude: 40.2,
      longitude: 20.2,
      date: "1 March",
      phone: "0935150221",
      email: "Name@Example.com",
    },
    {
      id: 1,
      name: "ورشة الأنوار",
      customer: "مضر أبو فخر",
      latitude: 40.2,
      longitude: 20.2,
      date: "1 March",
      phone: "0935150221",
      email: "Name@Example.com",
    },
    {
      id: 1,
      name: "ورشة الأنوار",
      customer: "مضر أبو فخر",
      latitude: 40.2,
      longitude: 20.2,
      date: "1 March",
      phone: "0935150221",
      email: "Name@Example.com",
    },
    {
      id: 1,
      name: "ورشة الأنوار",
      customer: "مضر أبو فخر",
      latitude: 40.2,
      longitude: 20.2,
      date: "1 March",
      phone: "0935150221",
      email: "Name@Example.com",
    },
    {
      id: 1,
      name: "ورشة الأنوار",
      customer: "مضر أبو فخر",
      latitude: 40.2,
      longitude: 20.2,
      date: "1 March",
      phone: "0935150221",
      email: "Name@Example.com",
    },
    {
      id: 1,
      name: "ورشة الأنوار",
      customer: "مضر أبو فخر",
      latitude: 40.2,
      longitude: 20.2,
      date: "1 March",
      phone: "0935150221",
      email: "Name@Example.com",
    },
    {
      id: 1,
      name: "ورشة الأنوار",
      customer: "مضر أبو فخر",
      latitude: 40.2,
      longitude: 20.2,
      date: "1 March",
      phone: "0935150221",
      email: "Name@Example.com",
    },
  ];
  const explore = (e) => {
    e.preventDefault();
    galleria.current.show();
  };
  const acitonBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-text p-button-danger"
          aria-label="Submit"
          onClick={() => {
            console.log(rowData.id);
          }}
        />
        <Button
          icon="pi pi-check"
          className="p-button-rounded p-button-text p-button-primary"
          aria-label="Submit"
        />
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-text p-button-success"
          aria-label="Submit"
          onClick={explore}
        />
      </>
    );
  };
  return (
    <div className="datatable">
      <div className="card">
        <DataTable
          showGridlines
          value={data}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column align="center" header={headers[0]} field="id"></Column>
          <Column align="center" header={headers[1]} field="name"></Column>
          <Column align="center" header={headers[2]} field="customer"></Column>
          <Column align="center" header={headers[3]} field="latitude"></Column>
          <Column align="center" header={headers[4]} field="longitude"></Column>
          <Column align="center" header={headers[5]} field="date"></Column>
          <Column align="center" header={headers[6]} field="phone"></Column>
          <Column align="center" header={headers[7]} field="email"></Column>
          <Column
            align="center"
            header={headers[8]}
            field="action"
            body={acitonBodyTemplate}
          ></Column>
        </DataTable>
      </div>
      <WarehouseExplore galleria={galleria} />
    </div>
  );
};

export default WarehouseVD;

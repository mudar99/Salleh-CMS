import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";

const TowingDataTable = () => {
  const headers = [
    "المعرف",
    "صاحب السيارة",
    "نوع السيارة",
    "تاريخ التسجيل",
    "البريد",
    "حدث",
  ];
  const data = [
    {
      id: 1,
      img: "/Img/Peugeot.png",
      customer: "مضر أبو فخر",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 2,
      img: "/Img/Hyundai.png",
      customer: "عبد الله",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 3,
      img: "/Img/Peugeot.png",
      customer: "عبير جريرة",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 4,
      img: "/Img/Nissan.png",
      customer: "علي خضر",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      img: "/Img/Nissan.png",
      customer: "حازم سلامي",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      img: "ورشة الأنوار",
      customer: "حازم سلامي",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      img: "ورشة الأنوار",
      customer: "حازم سلامي",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      img: "/Img/Nissan.png",
      customer: "حازم سلامي",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      img: "/Img/Nissan.png",
      customer: "221e21asd",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      img: "/Img/Nissan.png",
      customer: "qwdqw",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      img: "/Img/Nissan.png",
      customer: "wdqdqw",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      img: "/Img/Nissan.png",
      customer: "dadsaa",
      date: "1 March",
      email: "Name@Example.com",
    },
  ];
  const imageBodyTemplate = (rowData) => {
    return (
      <img src={rowData.img} alt={rowData.img} className="product-image" />
    );
  };
  const acitonBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-text p-button-success"
          aria-label="Submit"
        />
      </>
    );
  };
  return (
    <div className="datatable">
      <div className="card">
        <DataTable value={data} tableStyle={{ minWidth: "50rem" }}>
          <Column align="center" header={headers[0]} field="id"></Column>
          <Column align="center" header={headers[1]} field="customer"></Column>
          <Column
            align="center"
            header={headers[2]}
            field={imageBodyTemplate}
          ></Column>
          <Column align="center" header={headers[3]} field="date"></Column>
          <Column align="center" header={headers[4]} field="email"></Column>
          <Column
            align="center"
            header={headers[5]}
            field="action"
            body={acitonBodyTemplate}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default TowingDataTable;

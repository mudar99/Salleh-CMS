import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../style/datatable.scss";
import { Button } from "primereact/button";
const CustomersDataTable = () => {
  const headers = [
    "المعرف",
    "الزبون",
    "نوع السيارة",
    "تاريخ التسجيل",
    "البريد",
    "حدث",
  ];
  const data = [
    {
      id: 1,
      customer: "مضر أبو فخر",
      img: "/Img/Peugeot.png",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 2,
      customer: "عبد الله",
      img: "/Img/Hyundai.png",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 3,
      customer: "عبير جريرة",
      img: "/Img/Peugeot.png",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 4,
      customer: "علي خضر",
      img: "/Img/Nissan.png",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "حازم سلامي",
      img: "/Img/Nissan.png",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "حازم سلامي",
      img: "/Img/Nissan.png",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "حازم سلامي",
      img: "/Img/Nissan.png",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "حازم سلامي",
      img: "/Img/Nissan.png",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "221e21asd",
      img: "/Img/Nissan.png",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "qwdqw",
      img: "/Img/Nissan.png",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "wdqdqw",
      img: "/Img/Nissan.png",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "dadsaa",
      img: "/Img/Nissan.png",
      date: "1 March",
      email: "Name@Example.com",
    },
  ];
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

  const imageBodyTemplate = (rowData) => {
    return (
      <img src={rowData.img} alt={rowData.img} className="product-image" />
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

export default CustomersDataTable;

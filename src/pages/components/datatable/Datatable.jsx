import { React, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./datatable.scss";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const Datatable = () => {
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
      img: "/Img/Nissan.png",
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
  const [, setCurrentPage] = useState(1);

  const imageBodyTemplate = (rowData) => {
    return (
      <img src={rowData.img} alt={rowData.img} className="product-image" />
    );
  };
  const acitonBodyTemplate = (rowData) => {
    return (
      <>
        <Link to="/users/123" style={{ textDecoration: "none" }}>
          <Button
            icon="pi pi-eye"
            className="p-button-rounded p-button-text p-button-success"
            aria-label="Submit"
          />
        </Link>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-text p-button-danger"
          aria-label="Submit"
        />
      </>
    );
  };
  const onCustomPage1 = (event) => {
    setCurrentPage(event.page + 1);
    console.log(event.page + 1)
  };
  return (
    <div className="datatable">
      <DataTable
        value={data}
        responsiveLayout="scroll"
        rows={5}
        paginator
        onPage={onCustomPage1}
      >
        <Column align="center" field="id" header="المعرف"></Column>
        <Column align="center" field="customer" header="الزبون"></Column>
        <Column
          align="center"
          body={imageBodyTemplate}
          field="img"
          header="نوع السيارة"
        ></Column>
        <Column align="center" field="date" header="تاريخ التسجيل"></Column>
        <Column align="center" field="email" header="البريد"></Column>
        <Column
          body={acitonBodyTemplate}
          align="center"
          field="status"
          header="حدث"
        ></Column>
      </DataTable>
    </div>
  );
};

export default Datatable;

import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../style/datatable.scss";
import { Button } from "primereact/button";
const CategoriesDataTable = () => {
  const headers = [
    "المعرف",
    "اسم الصنف",
    "معرف الأب",
    "تاريخ الإضافة",
    "وصف",
    "حدث",
  ];
  const data = [
    {
      id: 1,
      label: "ميكانيك",
      parentId: null,
      date: "01/12/2021",
      description: "قطع ميكانيكية",
    },
    {
      id: 2,
      label: "كهرباء",
      parentId: null,
      date: "09/10/2021",
      description: "قطع كهربائية",
    },
    {
      id: 3,
      label: "دينامو",
      parentId: 1,
      date: "11/02/2023",
      description: "مولد كهرباء للبطارية",
    },
    {
      id: 4,
      label: "محرك",
      parentId: 2,
      date: "12/12/2022",
      description: "محرك 6 سلندر",
    },
    {
      id: 5,
      label: "محرك",
      parentId: 2,
      date: "21/04/2022",
      description: "محرك 8 سلندر",
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
          <Column align="center" header={headers[1]} field="label"></Column>
          <Column align="center" header={headers[2]} field="parentId"></Column>
          <Column align="center" header={headers[3]} field="date"></Column>
          <Column
            align="center"
            header={headers[4]}
            field="description"
          ></Column>
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

export default CategoriesDataTable;

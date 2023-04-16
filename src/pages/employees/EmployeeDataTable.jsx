import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../../style/datatable.scss";
import { Button } from "primereact/button";
const EmployeeDataTable = () => {
  const headers = [
    "المعرف",
    "الموظّف",
    "الوظيفة",
    "تاريخ التسجيل",
    "البريد",
    "حدث",
  ];
  const data = [
    {
      id: 1,
      customer: "مضر أبو فخر",
      job: "admin",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 2,
      customer: "عبد الله",
      job: "admin",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 3,
      customer: "عبير جريرة",
      job: "admin",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 4,
      customer: "علي خضر",
      job: "admin",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "حازم سلامي",
      job: "admin",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "حازم سلامي",
      job: "admin",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "حازم سلامي",
      job: "admin",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "حازم سلامي",
      job: "admin",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "221e21asd",
      job: "admin",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "qwdqw",
      job: "admin",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "wdqdqw",
      job: "admin",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      customer: "dadsaa",
      job: "admin",
      date: "1 March",
      email: "Name@Example.com",
    },
  ];
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
          <Column align="center" header={headers[2]} field="job"></Column>
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

export default EmployeeDataTable;

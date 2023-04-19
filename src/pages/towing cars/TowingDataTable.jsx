import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { GetTowings } from "../../redux/API/users/usersSlice";
import { Paginator } from "primereact/paginator";
import LoadingFS from "../components/loading/LoadingFS";

const TowingDataTable = () => {
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
    let info = { size: basicRows, page: currentPage };
    dispatch(GetTowings(info));
  };
  useEffect(() => {
    let info = { size: basicRows, page: currentPage };
    dispatch(GetTowings(info));
  }, []);

  const headers = [
    "المعرف",
    "صاحب السيارة",
    "رقم الهاتف",
    "تاريخ التسجيل",
    "البريد",
    "حدث",
  ];
  //   {
  //     id: 1,
  //     img: "/Img/Peugeot.png",
  //     customer: "مضر أبو فخر",
  //     date: "1 March",
  //     email: "Name@Example.com",
  //   },
  //   {
  //     id: 2,
  //     img: "/Img/Hyundai.png",
  //     customer: "عبد الله",
  //     date: "1 March",
  //     email: "Name@Example.com",
  //   },
  //   {
  //     id: 3,
  //     img: "/Img/Peugeot.png",
  //     customer: "عبير جريرة",
  //     date: "1 March",
  //     email: "Name@Example.com",
  //   },
  //   {
  //     id: 4,
  //     img: "/Img/Nissan.png",
  //     customer: "علي خضر",
  //     date: "1 March",
  //     email: "Name@Example.com",
  //   },
  //   {
  //     id: 5,
  //     img: "/Img/Nissan.png",
  //     customer: "حازم سلامي",
  //     date: "1 March",
  //     email: "Name@Example.com",
  //   },
  //   {
  //     id: 5,
  //     img: "ورشة الأنوار",
  //     customer: "حازم سلامي",
  //     date: "1 March",
  //     email: "Name@Example.com",
  //   },
  //   {
  //     id: 5,
  //     img: "ورشة الأنوار",
  //     customer: "حازم سلامي",
  //     date: "1 March",
  //     email: "Name@Example.com",
  //   },
  //   {
  //     id: 5,
  //     img: "/Img/Nissan.png",
  //     customer: "حازم سلامي",
  //     date: "1 March",
  //     email: "Name@Example.com",
  //   },
  //   {
  //     id: 5,
  //     img: "/Img/Nissan.png",
  //     customer: "221e21asd",
  //     date: "1 March",
  //     email: "Name@Example.com",
  //   },
  //   {
  //     id: 5,
  //     img: "/Img/Nissan.png",
  //     customer: "qwdqw",
  //     date: "1 March",
  //     email: "Name@Example.com",
  //   },
  //   {
  //     id: 5,
  //     img: "/Img/Nissan.png",
  //     customer: "wdqdqw",
  //     date: "1 March",
  //     email: "Name@Example.com",
  //   },
  //   {
  //     id: 5,
  //     img: "/Img/Nissan.png",
  //     customer: "dadsaa",
  //     date: "1 March",
  //     email: "Name@Example.com",
  //   },
  // ];
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
      {loading && <LoadingFS />}
      <div className="card">
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

export default TowingDataTable;

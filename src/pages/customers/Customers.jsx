import React, { useEffect } from "react";
import List from "../list/List";

const Customers = () => {
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
  return (
    <div className="users">
      <List
        data={data}
        headers={headers}
        actions={true}
        component="CustomersDataTable"
      />
    </div>
  );
};

export default Customers;

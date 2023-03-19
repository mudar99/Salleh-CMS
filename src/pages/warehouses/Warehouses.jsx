import React, { useEffect } from "react";
import List from "../list/List";

const Warehouses = () => {
  const headers = [
    "المعرف",
    "صاحب المستودع",
    "مكان المستودع",
    "تاريخ التسجيل",
    "البريد",
    "حدث",
  ];
  const data = [
    {
      id: 1,
      img: "ورشة الأنوار",
      customer: "مضر أبو فخر",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 2,
      img: "ورشة الأنوار",
      customer: "عبد الله",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 3,
      img: "ورشة الأنوار",
      customer: "عبير جريرة",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 4,
      img: "ورشة الأنوار",
      customer: "علي خضر",
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
  return (
    <div className="users">
      <List data={data} headers={headers} header={"مستودعات"} />
    </div>
  );
};

export default Warehouses;

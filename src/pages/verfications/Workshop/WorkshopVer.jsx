import React from "react";
import List from "../../list/List";

const WorkshopVer = () => {
  const headers = [
    "المعرف",
    "اسم الزبون",
    "اسم الورشة",
    "تاريخ التسجيل",
    "رقم الهاتف",
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
  return (
    <div>
      <List data={data} headers={headers} explore="workshopVer" />
    </div>
  );
};

export default WorkshopVer;

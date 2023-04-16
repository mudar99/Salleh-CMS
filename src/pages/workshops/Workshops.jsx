import React from "react";
import List from "../list/List";

const Workshops = () => {
  const headers = [
    "المعرف",
    "صاحب الورشة",
    "اسم الورشة",
    "تاريخ التسجيل",
    "البريد",
    "حدث",
  ];
  const data = [
    {
      id: 1,
      name: "ورشة الأنوار",
      customer: "مضر أبو فخر",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 2,
      name: "ورشة الأنوار",
      customer: "عبد الله",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 3,
      name: "ورشة الأنوار",
      customer: "عبير جريرة",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 4,
      name: "ورشة الأنوار",
      customer: "علي خضر",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      name: "ورشة الأنوار",
      customer: "حازم سلامي",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      name: "ورشة الأنوار",
      customer: "حازم سلامي",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      name: "ورشة الأنوار",
      customer: "حازم سلامي",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      name: "ورشة الأنوار",
      customer: "حازم سلامي",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      name: "ورشة الأنوار",
      customer: "221e21asd",
      date: "1 March",
      email: "Name@Example.com",
    },
    {
      id: 5,
      name: "ورشة الأنوار",
      customer: "qwdqw",
      date: "1 March",
      email: "Name@Example.com",
    },
  ];
  return (
    <div className="users">
      <List component="WorkshopsDataTable" />
    </div>
  );
};

export default Workshops;

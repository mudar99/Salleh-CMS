import React from "react";
import "./widget.scss";

const Widget = ({ type, num, ratio }) => {
  let data;
  switch (type) {
    case "user":
      data = {
        title: "المستخدمون",
        icon: <i className="bi bi-person-fill"></i>,
      };
      break;
    case "customer":
      data = {
        title: "الزبائن",
        icon: <i className="bi bi-people-fill"></i>,
      };
      break;
    case "workshop":
      data = {
        title: "ورشات",
        icon: <i className="bi bi-house-fill"></i>,
      };
      break;
    case "towing":
      data = {
        title: "سيارات سحب",
        icon: <i className="bi bi-truck-flatbed"></i>,
      };
      break;
    case "storehouse":
      data = {
        title: "مستودعات",
        icon: <i className="bi bi-building-fill"></i>,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{num}</span>
        <span className="link">عرض التفاصيل</span>
      </div>
      <div className="right">
        {data.title !== "المستخدمون" && (
          <div className="percentage positive">
            % {Math.round(ratio * 10 ** 2) / 10 ** 2}
          </div>
        )}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;

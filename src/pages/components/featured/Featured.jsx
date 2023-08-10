import React, { useRef, useState } from "react";
import "./featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

const Featured = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const toast = useRef(null);

  const handleFromDateChange = (e) => {
    setFromDate(e.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let obj = new FormData();
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    const formattedFrom = new Date(fromDate)
      .toLocaleDateString("en-GB", options)
      .replace(/(^|\/)0+/g, "$1");
    const formattedTo = new Date(toDate)
      .toLocaleDateString("en-GB", options)
      .replace(/(^|\/)0+/g, "$1");

    obj.append("start_date", formattedFrom);
    obj.append("end_date", formattedTo);

    console.log("Selected date range:", fromDate, " ----- ", toDate);

    // dispatch(GetUsersNumberChart(obj)).then((res) => {
    //   console.log(res);
    //   if (res.payload.status === true) {
    //     showSuccess(res.payload.message, toast);
    //     return;
    //   }
    //   showError(res.payload, toast);
    // });
  };
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">إجمالي الإيرادات</h1>
        <li
          className="pi pi-ellipsis-v"
          style={{
            fontSize: ".9em",
            cursor: "pointer",
            color: "rgb(160, 160, 160)",
          }}
        ></li>
      </div>

      <form className="rangeClass" onSubmit={submitHandler}>
        <div>
          <Calendar
          baseZIndex={1}
            className="smaller-calendar"
            showButtonBar
            appendTo={"self"}
            value={fromDate}
            onChange={handleFromDateChange}
            placeholder="من"
            showTime={false}
          />
        </div>
        <h6>
          <i className="bi bi-arrow-down"></i>
        </h6>
        <div>
          <Calendar
            className="smaller-calendar"
            showButtonBar
            appendTo={"self"}
            value={toDate}
            onChange={handleToDateChange}
            placeholder="إلى"
            showTime={false}
          />
        </div>
        <Button className="submit" type="submit" label="تأكيد" />
      </form>

      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">مجموع مبيعات اليوم</p>
        <p className="amount">$499.99</p>
        <p className="desc">الإيرادات والدخل السابقين</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">الهدف</div>
            <div className="itemResult negative container">
              <li className="pi pi-angle-down"></li>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">الأسبوع الماضي</div>
            <div className="itemResult positive container">
              <li className="pi pi-angle-up"></li>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">الشهر الماضي</div>
            <div className="itemResult positive container">
              <li className="pi pi-angle-up"></li>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;

import React, { useRef, useState } from "react";
import "./featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { GetRevenues } from "../../../redux/API/visualizations/revenuesSlice";
import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../../../ToastService";
import { Toast } from "primereact/toast";

const Featured = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const toast = useRef(null);
  const dispatch = useDispatch();
  const [isLocked, setIsLocked] = useState(true);
  const { amount, revenueLoading } = useSelector((state) => state.revenue);

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

    dispatch(GetRevenues(obj)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        setIsLocked(false);
        return;
      }
      showError(res.payload, toast);
    });
  };
  return (
    <div className="featured">
      <Toast ref={toast} />
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

      {revenueLoading ? (
        <div className="spinner text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="bottom">
          {isLocked ? (
            <i className="lock-icon bi bi-slash-circle"></i>
          ) : (
            <>
              <p className="title">مجموع الأرباح</p>
              <p className="amount">{amount} ل.س</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Featured;

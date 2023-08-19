import React, { useRef, useState } from "react";
import "./chart.scss";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { GetUsersNumberChart } from "../../../redux/API/visualizations/usersChartSlice";
import { showError, showSuccess } from "../../../ToastService";
import { Toast } from "primereact/toast";
import { Chart } from "primereact/chart";

export const PrimeReactChart = ({ title }) => {
  const { darkMode } = useSelector((state) => state.DarkMode);
  const dispatch = useDispatch();
  const { data, chartLoading } = useSelector((state) => state.userChart);
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

    console.log("Selected date range:", formattedFrom, " ----- ", formattedTo);

    dispatch(GetUsersNumberChart(obj)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        return;
      }
      showError(res.payload, toast);
    });
  };

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "عدد المستخدمين",
        data: data.map((item) => item.num_user),
        backgroundColor: darkMode
          ? "rgba(74, 139, 223, 0.8)"
          : "rgba(1, 37, 125, 0.8)",
        borderColor: "#7484a9",
        fill: true,
      },
    ],
  };

  return (
    <div className="chart">
      <Toast ref={toast} />
      <div className="title">{title}</div>
      <form className="rangeClass" onSubmit={submitHandler}>
        <Calendar
          showButtonBar
          appendTo={"self"}
          value={fromDate}
          onChange={handleFromDateChange}
          placeholder="من"
          showTime={false}
        />
        <h6>
          <i className="bi bi-arrow-left"></i>
        </h6>
        <Calendar
          showButtonBar
          appendTo={"self"}
          value={toDate}
          onChange={handleToDateChange}
          placeholder="إلى"
          showTime={false}
        />
        <Button className="submit" type="submit" label="تأكيد" />
      </form>

      {chartLoading ? (
        <div className="spinner text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="p-mb-4">
          <Chart type="line" data={chartData} />
        </div>
      )}
    </div>
  );
};

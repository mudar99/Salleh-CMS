import React, { useEffect, useState } from "react";
import Chart from "../components/chart/Chart";
import Featured from "../components/featured/Featured";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Widget from "../components/widget/Widget";
 import "./home.scss";
import Cookies from "universal-cookie";
import { Table } from "../components/table/Table";

const cookie = new Cookies();

const Home = () => {
  useEffect(() => {
    if (cookie.get("jwt_authorization") === undefined) {
      window.location.href = "/login";
    }
  }, []);
  if (cookie.get("jwt_authorization") === undefined) {
    window.location.href = "/login";
  } else
    return (
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>
          <div className="charts">
            <Featured />
            <Chart title="مخطط الربح" aspect={2 / 1} />
          </div>
          <div className="listContainer">
            <div className="listTitle">الأعمال</div>
            <Table />
          </div>
        </div>
      </div>
    );
};

export default Home;

import React, { useEffect } from "react";
import Featured from "../components/featured/Featured";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Widget from "../components/widget/Widget";
import "./home.scss";
import Cookies from "universal-cookie";
import { ChargeTable, Table } from "../components/charge-table/ChargeTable";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUsersNumber,
  GetUsersRatioNumber,
} from "../../redux/API/visualizations/usersStatisticsSlice";
import LoadingFS from "../components/loading/LoadingFS";
import { Chart, PrimeReactChart } from "../components/chart/PrimeReactChart";

const cookie = new Cookies();

const Home = () => {
  const dispatch = useDispatch();
  const { numbers, ratio, loading } = useSelector(
    (state) => state.userStatistic
  );
  
  useEffect(() => {
    if (cookie.get("jwt_authorization") === undefined) {
      window.location.href = "/login";
    }
    dispatch(GetUsersNumber());
    dispatch(GetUsersRatioNumber());
  }, []);
  if (cookie.get("jwt_authorization") === undefined) {
    window.location.href = "/login";
  } else
    return (
      <div className="home">
        {loading && <LoadingFS />}
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="user" num={numbers.num_user} />
            <Widget
              type="customer"
              num={numbers.num_client}
              ratio={ratio.ratio_client}
            />
            <Widget
              type="workshop"
              num={numbers.num_workshop}
              ratio={ratio.ratio_workshop}
            />
            <Widget
              type="towing"
              num={numbers.num_towing}
              ratio={ratio.ratio_towing}
            />
            <Widget
              type="storehouse"
              num={numbers.num_storehouse}
              ratio={ratio.ratio_storehouse}
            />
          </div>
          <div className="charts">
            <Featured />
            <PrimeReactChart title="مخطط الربح" aspect={3 / 1} />
          </div>
          {/* <div className="listContainer">
            <div className="listTitle">الأعمال</div>
            <ChargeTable />
          </div> */}
        </div>
      </div>
    );
};

export default Home;

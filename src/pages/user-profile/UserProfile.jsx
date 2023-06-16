import React, { useEffect, useState } from "react";
import "./userprofile.scss";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import Chart from "../components/chart/Chart";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "../components/table/Table";
import { ShowUser } from "../../redux/API/users/usersSlice";
import { Dialog } from "primereact/dialog";
import WalletCharge from "./WalletCharge";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.users);
  const [id, setId] = useState();
  const [walletDialog, setWalletDialog] = useState();
  console.log(userData);
  useEffect(() => {
    // let currentPlace = window.location.pathname.split("/")[1];
    let id = window.location.pathname.split("/")[2];
    setId(id);
    dispatch(ShowUser(id));
  }, []);

  return (
    <>
      {id && (
        <div className="single">
          <Sidebar />
          <div className="singleContainer">
            <Navbar />
            <div className="top">
              <div className="left">
                <div className="editButton">
                  <Button
                    disabled={
                      userData.information.wallet == null ? true : false
                    }
                    icon="pi pi-dollar"
                    className="p-button-rounded p-button-text p-button-primary"
                    aria-label="Submit"
                    onClick={() => setWalletDialog(true)}
                  />
                </div>
                <h1 className="title">معلومات المستخدم</h1>
                <div className="card-content">
                  <img
                    src="/Img/profile.png"
                    alt="profile"
                    className="card-image"
                  />
                  <h3 className="card-name">
                    {userData.information.firstname}{" "}
                    {userData.information.lastname}
                  </h3>

                  <div className="card-details">
                    <div className="card-label">البريد الإلكتروني</div>
                    <div className="card-value">
                      {userData.information.email}
                    </div>
                  </div>
                  <div className="card-details">
                    <div className="card-label">رقم الجوال</div>
                    <div className="card-value">
                      {userData.information.phone_number}
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <Chart aspect={3 / 1} title="إنفاق المستخدم" />
              </div>
            </div>
            <div className="bottom">
              <h1 className="title">شحنات المحفظة</h1>
              {userData.information.wallet ? (
                <Table id={id} />
              ) : (
                <div className="warning">
                  <span className="warning-message">
                    هذا المستخدم لايمتلك محفظة
                  </span>
                  <span className="warning-icon">!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Dialog
        header="شحن المحفظة"
        visible={walletDialog}
        style={{ width: "30vw" }}
        onHide={() => setWalletDialog(false)}
        resizable
        appendTo={"self"}
      >
        <WalletCharge id={id} visibleState={(e) => setWalletDialog(e)} />
      </Dialog>
    </>
  );
};

export default UserProfile;

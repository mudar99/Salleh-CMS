import React, { useEffect, useState } from "react";
import "./userprofile.scss";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { ChargeTable } from "../components/charge-table/ChargeTable";
import { ShowUser } from "../../redux/API/users/usersSlice";
import { Dialog } from "primereact/dialog";
import WalletCharge from "./WalletCharge";
import ProductTable from "../components/product-table/ProductTable";
import { Dropdown } from "primereact/dropdown";
import OrderTable from "../components/order-table/OrderTable";
import { Chart, PrimeReactChart } from "../components/chart/PrimeReactChart";
import { GetRevenueByUser } from "../../redux/API/visualizations/revenuesSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.users);
  const { amount } = useSelector((state) => state.revenue);
  const [id, setId] = useState();
  const [walletDialog, setWalletDialog] = useState();
  const [store, setStore] = useState(false);
  const [workshop, setWorkshop] = useState(false);
  const [selectedOption, setSelectedOption] = useState("orders");
  const options = [
    { label: "فورية", value: "orders" },
    { label: "مسبقة", value: "preorders" },
  ];
  const handleSelect = (e) => {
    setSelectedOption(e.value);
  };

  console.log(userData);
  useEffect(() => {
    let currentPlace = window.location.pathname.split("/")[1];
    let id = window.location.pathname.split("/")[2];
    if (currentPlace === "warehouses") {
      setStore(true);
    }
    if (currentPlace === "workshops") {
      setWorkshop(true);
    }
    setId(id);
    dispatch(ShowUser(id));
    dispatch(GetRevenueByUser(id));
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
                    <div className="card-label">
                      <i className="bi bi-envelope-at"></i>
                      <label>البريد الإلكتروني</label>
                    </div>
                    <div className="card-value">
                      {userData.information.email}
                    </div>
                  </div>

                  <div className="card-details">
                    <div className="card-label">
                      <i className="bi bi-telephone"></i>
                      <label>رقم الجوال</label>
                    </div>
                    <div className="card-value">
                      {userData.information.phone_number}
                    </div>
                  </div>

                  <div className="card-details">
                    <div className="card-label">
                      <i className="bi bi-coin"></i>
                      <label>العائدات من المستخدم</label>
                    </div>
                    <div className="card-value">{amount} ل.س</div>
                  </div>

                </div>
              </div>
              <div className="right">
                <h1 className="title">شحنات المحفظة</h1>
                {userData.information.wallet ? (
                  <ChargeTable id={id} />
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

            {store && (
              <div className="bottom">
                <h1 className="title">منتجات المستودع</h1>
                <ProductTable id={id} />
              </div>
            )}

            {workshop && (
              <>
                <div className="selection-container">
                  <div className="selection">
                    <h6>اختر نوع طلب الصيانة</h6>
                    <div>
                      <Dropdown
                        appendTo={"self"}
                        value={selectedOption}
                        options={options}
                        onChange={handleSelect}
                        placeholder="قم بالاختيار"
                      />
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  <h1 className="title">
                    طلبات صيانة{" "}
                    {selectedOption === "preorders" ? "المسبقة" : "الفورية"}
                  </h1>
                  <OrderTable type={selectedOption} id={id} />
                </div>
              </>
            )}
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

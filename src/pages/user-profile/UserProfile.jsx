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
import { GetRevenueByUser } from "../../redux/API/visualizations/revenuesSlice";
import { ToggleButton } from "primereact/togglebutton";
import TowingOrderTable from "../components/order-table/TowingOrderTable";
import PreOrderTable from "../components/order-table/PreOrderTable";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.users);
  const { amount } = useSelector((state) => state.revenue);
  const [id, setId] = useState();
  const [walletDialog, setWalletDialog] = useState(false);
  const [store, setStore] = useState(false);
  const [workshop, setWorkshop] = useState(false);
  const [selectedOption, setSelectedOption] = useState("orders");
  const options = [
    { label: "فورية", value: "orders" },
    { label: "مسبقة", value: "preorders" },
  ];
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const currentPlace = window.location.pathname.split("/")[1];
    const userId = window.location.pathname.split("/")[2];
    setId(userId);
    dispatch(ShowUser(userId));
    dispatch(GetRevenueByUser(userId));

    if (currentPlace === "warehouses") {
      setStore(true);
    }
    if (currentPlace === "workshops") {
      setWorkshop(true);
    }
  }, [dispatch]);

  const renderProfileTypeTitle = () => {
    switch (userData.information.user_type) {
      case 0:
        return <h1 className="title">معلومات المستخدم</h1>;
      case 1:
        return <h1 className="title">معلومات الورشة</h1>;
      case 2:
        return <h1 className="title">معلومات سيارة السحب</h1>;
      case 3:
        return <h1 className="title">معلومات المستودع</h1>;
      default:
        return null;
    }
  };

  const handleSelect = (e) => {
    setSelectedOption(e.value);
  };

  const renderCardDetails = (icon, label, value) => (
    <div className="card-details">
      <div className="card-label">
        <i className={icon}></i>
        <label>{label}</label>
      </div>
      <div className="card-value">{value}</div>
    </div>
  );

  const renderChargeTable = () => {
    return userData.information.wallet ? (
      <ChargeTable id={id} />
    ) : (
      <div className="warning">
        <span className="warning-message">هذا المستخدم لايمتلك محفظة</span>
        <span className="warning-icon">!</span>
      </div>
    );
  };

  const renderOrderTable = () =>
    selectedOption === "preorders" ? (
      <PreOrderTable id={userData.information.workshop.id} />
    ) : (
      <OrderTable id={userData.information.workshop.id} />
    );

  const renderTowingOrderTable = () => (
    <TowingOrderTable id={userData.information.towing.id} />
  );

  return id ? (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">
              <Button
                disabled={!userData.information.wallet}
                icon="pi pi-dollar"
                className="p-button-rounded p-button-text p-button-primary"
                aria-label="Submit"
                onClick={() => setWalletDialog(true)}
              />
            </div>
            {renderProfileTypeTitle()}
            <div className="card-content">
              <img
                src="/Img/profile.png"
                alt="profile"
                className="card-image"
              />
              <h3 className="card-name">
                {userData.information.firstname} {userData.information.lastname}
              </h3>

              {renderCardDetails(
                "bi bi-envelope-at",
                "البريد الإلكتروني",
                userData.information.email
              )}

              {renderCardDetails(
                "bi bi-telephone",
                "رقم الجوال",
                userData.information.phone_number
              )}

              {renderCardDetails(
                "bi bi-coin",
                "العائدات من المستخدم",
                `${amount} ل.س`
              )}
            </div>
          </div>
          <div className="right">
            <h1 className="title">شحنات المحفظة</h1>
            {renderChargeTable()}
          </div>
        </div>

        {store && (
          <div className="bottom">
            <h1 className="title">منتجات المستودع</h1>
            <ProductTable id={id} />
          </div>
        )}

        {(workshop || userData.information.user_type === 2) && (
          <div className="toggle-btn">
            <ToggleButton
              checked={checked}
              onChange={(e) => setChecked(e.value)}
              onIcon="pi pi-angle-down"
              offIcon="pi pi-angle-up"
              offLabel="المزيد"
              onLabel="إلغاء"
            />
          </div>
        )}

        {checked && workshop && (
          <div>
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
              {renderOrderTable()}
            </div>
          </div>
        )}

        {checked && userData.information.user_type === 2 && (
          <div className="bottom">
            <h1 className="title">طلبات سيارة السحب</h1>
            {renderTowingOrderTable()}
          </div>
        )}
      </div>
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
    </div>
  ) : null;
};

export default UserProfile;

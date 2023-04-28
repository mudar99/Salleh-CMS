import React, { useState } from "react";
import List from "../list/List";
import { Dialog } from "primereact/dialog";
import WorkShopOrders from "./WorkShopOrders";

const Workshops = () => {
  const [data, setData] = useState("");
  const [showVisible, setShowVisible] = useState(false);

  const callback = (e, rowData) => {
    console.log(e, rowData);
    setData(rowData);
    if (e === "S") {
      setShowVisible(true);
    }
  };
  return (
    <div className="">
      <List visibleState={callback} component="WorkshopsDataTable" />

      <Dialog
        visible={showVisible}
        style={{ width: "50vw" }}
        onHide={() => setShowVisible(false)}
        resizable
        appendTo={"self"}
      >
        <WorkShopOrders data={data} />
      </Dialog>
    </div>
  );
};

export default Workshops;

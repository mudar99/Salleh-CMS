import React, { useEffect } from "react";
import List from "../list/List";

const Warehouses = () => {
  return (
    <div className="users">
      <List component="WarehousesDataTable" />
    </div>
  );
};

export default Warehouses;

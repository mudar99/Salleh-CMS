import React, { useEffect } from "react";
import List from "../list/List";

const TowingCars = () => {
  return (
    <div className="users">
      <List component="TowingDataTable" />
    </div>
  );
};

export default TowingCars;

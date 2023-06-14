import React, { useState } from "react";
import List from "../list/List";

const Complaints = () => {
  return (
    <div>
      <List component="ComplaintsDataTable" />
    </div>
  );
};

export default Complaints;

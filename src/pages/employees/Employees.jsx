import React from "react";
import "./employee.scss";
import List from "../list/List";
import { Dialog } from "primereact/dialog";
import AddEmployee from "./AddEmployee";

const Employees = () => {
  return (
    <div className="users">
      <List component="EmployeeDataTable" />
      <Dialog
        header="إضافة مدير جديد"
        // visible={visible}
        style={{ width: "50vw" }}
        // onHide={() => dispatch(closedDialog())}
        resizable
        appendTo={"self"}
      >
        <AddEmployee />
      </Dialog>
    </div>
  );
};

export default Employees;

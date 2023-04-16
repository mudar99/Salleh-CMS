import React, { useEffect } from "react";
import "./employee.scss";
import List from "../list/List";
import { Dialog } from "primereact/dialog";
import { closed, closedDialog } from "../../redux/visibleDialog";
import { useDispatch, useSelector } from "react-redux";
import AddEmployee from "./AddEmployee";
import { classNames } from "primereact/utils";

const Employees = () => {
  const dispatch = useDispatch();
  const { visible } = useSelector((state) => state.VisibleDialog);

  return (
    <div className="users">
      <List component="EmployeeDataTable" />
      <Dialog
        header="إضافة مدير جديد"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => dispatch(closedDialog())}
        resizable
        appendTo={"self"}
      >
        <AddEmployee />
      </Dialog>
    </div>
  );
};

export default Employees;

import React, { useState } from "react";
import List from "../list/List";
import { Dialog } from "primereact/dialog";
import AddEmployee from "./AddEmployee";
import UpdateEmployee from "./UpdateEmployee";
import { ShowAdmin } from "../../redux/API/adminSlice";
import ViewEmployee from "./ViewEmployee";
import { useDispatch } from "react-redux";

const Employees = () => {
  const [updateVisible, setUpdateVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [showVisible, setShowVisible] = useState(false);
  const [basicRows, setBasicRows] = useState();
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const callback = (e, rowData, basicRows) => {
    setData(rowData);
    switch (e) {
      case "U":
        setUpdateVisible(true);
        setBasicRows(basicRows);
        break;
      case "C":
        setCreateVisible(true);
        setBasicRows(basicRows);
        break;
      case "S":
        setShowVisible(true);
        setBasicRows(basicRows);
        break;
      default:
        break;
    }
  };
  return (
    <div className="employees">
      <List visibleState={callback} component="EmployeeDataTable" />
      <Dialog
        header="إضافة موظّف جديد"
        visible={createVisible}
        style={{ width: "50vw" }}
        onHide={() => setCreateVisible(false)}
        resizable
        appendTo={"self"}
      >
        <AddEmployee
          basicRows={basicRows}
          visibleState={(e) => setCreateVisible(e)}
        />
      </Dialog>

      <Dialog
        header="تعديل الموظّف"
        visible={updateVisible}
        style={{ width: "50vw" }}
        onHide={() => setUpdateVisible(false)}
        resizable
        appendTo={"self"}
      >
        <UpdateEmployee
          basicRows={basicRows}
          data={data}
          visibleState={(e) => setUpdateVisible(e)}
        />
      </Dialog>

      <Dialog
        header="عرض معلومات الموظّف"
        visible={showVisible}
        style={{ width: "50vw" }}
        onHide={() => setShowVisible(false)}
        onShow={() => dispatch(ShowAdmin(data.id))}
        resizable
        appendTo={"self"}
      >
        <ViewEmployee />
      </Dialog>
    </div>
  );
};

export default Employees;

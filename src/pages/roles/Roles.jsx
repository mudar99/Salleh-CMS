import React, { useState } from "react";
import List from "../list/List";
import { Dialog } from "primereact/dialog";
import AddRole from "./AddRole";
import UpdateRole from "./UpdateRole";
import { useDispatch, useSelector } from "react-redux";
import {
  GetPermissions,
  ShowRole,
} from "../../redux/API/roles&permissions/rolesSlice";
import ViewRole from "./AssignPermissions";
import AssignPermissions from "./AssignPermissions";
import "./roles.scss";

const Roles = () => {
  const dispatch = useDispatch();
  const { showLoading } = useSelector((state) => state.roles);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [showVisible, setShowVisible] = useState(false);
  const [basicRows, setBasicRows] = useState();
  const [data, setData] = useState("");
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
    <div className="roles">
      <List visibleState={callback} component="RolesDataTable" />
      <Dialog
        header="إضافة دور جديد"
        visible={createVisible}
        style={{ width: "30vw" }}
        onHide={() => setCreateVisible(false)}
        resizable
        appendTo={"self"}
      >
        <AddRole
          basicRows={basicRows}
          visibleState={(e) => setCreateVisible(e)}
        />
      </Dialog>

      <Dialog
        header="تعديل الدور"
        visible={updateVisible}
        style={{ width: "30vw" }}
        onHide={() => setUpdateVisible(false)}
        resizable
        appendTo={"self"}
      >
        <UpdateRole
          basicRows={basicRows}
          data={data}
          visibleState={(e) => setUpdateVisible(e)}
        />
      </Dialog>

      <Dialog
        header="الصلاحيات"
        visible={showVisible}
        style={{
          width: "50vw",
          height: "40vw",
        }}
        onHide={() => setShowVisible(false)}
        onShow={() => {
          // dispatch(GetPermissions());
          dispatch(ShowRole(data.id));
        }}
        resizable
        appendTo={"self"}
      >
        {!showLoading && (
          <AssignPermissions
            basicRows={basicRows}
            data={data}
            visibleState={(e) => setShowVisible(e)}
          />
        )}
      </Dialog>
    </div>
  );
};

export default Roles;

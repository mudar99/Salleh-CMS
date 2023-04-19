import React, { useState } from "react";
import List from "../list/List";
import { Dialog } from "primereact/dialog";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";

const Categories = () => {
  const [updateVisible, setUpdateVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [data, setData] = useState("");
  const callback = (e, rowData) => {
    setData(rowData);
    switch (e) {
      case "U":
        setUpdateVisible(true);
        break;
      case "C":
        setCreateVisible(true);
      case "D":
        break;
      default:
        break;
    }
  };
  return (
    <div className="categories">
      <List visibleState={callback} component="CategoriesDataTable" />
      <Dialog
        visible={createVisible}
        style={{ width: "50vw" }}
        onHide={() => setCreateVisible(false)}
        resizable
        appendTo={"self"}
      >
        <AddCategory visibleState={(e) => setCreateVisible(e)} />
      </Dialog>
      <Dialog
        visible={updateVisible}
        style={{ width: "50vw" }}
        onHide={() => setUpdateVisible(false)}
        resizable
        appendTo={"self"}
      >
        <UpdateCategory data={data} visibleState={(e) => setUpdateVisible(e)} />
      </Dialog>
    </div>
  );
};

export default Categories;

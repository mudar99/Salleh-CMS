import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useRef, useState } from "react";
import "./blockpage.scss";
import { Button } from "primereact/button";
import {
  BlockUser,
  GetCustomers,
  GetStorehouses,
  GetTowings,
  GetWorkShops,
} from "../../redux/API/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingFS from "../components/loading/LoadingFS";
import { showError, showSuccess, showWarn } from "../../ToastService";
import { Toast } from "primereact/toast";

const BlockPage = () => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const { btnLoading, loading, data } = useSelector((state) => state.users);
  const [selectedOption, setSelectedOption] = useState("customers");
  const [selectedUser, setSelectedUser] = useState();
  const typeOptions = [
    { label: "زبائن", value: "customers" },
    { label: "ورشات", value: "workshops" },
    { label: "سيارات سحب", value: "towingcars" },
    { label: "مستودعات", value: "storehouses" },
  ];
  console.log(data);
  useEffect(() => {
    switch (selectedOption) {
      case "customers":
        dispatch(GetCustomers());
        break;
      case "workshops":
        dispatch(GetWorkShops());
        break;
      case "towingcars":
        dispatch(GetTowings());
        break;
      case "storehouses":
        dispatch(GetStorehouses());
        break;
      default:
        break;
    }
  }, [selectedOption]);

  const options = data.map((item, index) => ({
    label: `${item.phone_number} - ${item.firstname} ${item.lastname}`,
    value: item.id,
  }));

  const handleSelect = (e) => {
    setSelectedUser(undefined);
    setSelectedOption(e.value);
  };
  const handleUserSelect = (e) => {
    let id = e.value;
    setSelectedUser(id);
  };
  const blockHandler = (e) => {
    e.preventDefault();
    console.log("selectedUser", selectedUser);
    if (!selectedUser) {
      showWarn("الرجاء اختيار مستخدم", toast);
      return;
    }
    dispatch(BlockUser(selectedUser)).then((res) => {
      console.log(res);
      if (res.payload.status === true) {
        showSuccess(res.payload.message, toast);
        return;
      }
      showError(res.payload, toast);
    });
  };
  return (
    <>
      {loading && <LoadingFS />}
      <Toast ref={toast} />
      <div className="container blockpage">
        <h1>حظر مستخدم</h1>
        <form className="form-container" onSubmit={blockHandler}>
          <div className="form-header">
            <h6>نوع المستخدم</h6>
            <Dropdown
              className="dropdown"
              appendTo={"self"}
              value={selectedOption}
              options={typeOptions}
              onChange={handleSelect}
              placeholder="Select an option"
            />
          </div>
          <div className="form-header">
            <h6>اختر المستخدم</h6>
            <Dropdown
              className="dropdown"
              appendTo={"self"}
              value={selectedUser}
              options={options}
              onChange={handleUserSelect}
              filter
              filterBy="label"
              placeholder="Select an option"
            />
          </div>

          <div className="form-footer">
            <Button
              loading={btnLoading}
              icon="pi pi-ban"
              type="submit"
              label="حظر"
              className="p-button-danger"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default BlockPage;

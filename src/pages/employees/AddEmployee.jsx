import React from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const AddEmployee = () => {
  const AddEmployee = (e) => {
    e.preventDefault();
  };
  return (
    <form className="addEmployee container" onSubmit={AddEmployee}>
      {/* <Toast ref={(el) => (this.toastSuccess = el)} position="bottom-right" /> */}
      {/* <Toast ref={(el) => (this.toastFailure = el)} position="bottom-right" /> */}
      <div className="form-group wrapper">
        <div className="container mt-3">
          <h6 className="mt-2 text-right">اسم المستخدم</h6>
          <InputText placeholder="User Name" style={{ width: "100%" }} />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">البريد الالكتروني</h6>{" "}
          <InputText placeholder="name@example.com" style={{ width: "100%" }} />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">كلمة المرور</h6>
          <InputText placeholder="Password" style={{ width: "100%" }} />
        </div>
        <div className="container mt-3">
          <h6 className="mt-2 text-right">Role ID</h6>
          <InputText placeholder="ID" style={{ width: "100%" }} />
        </div>
      </div>
      <span className="actions">
        <Button label="إضافة" icon="pi pi-check" raised />
        <Button label="إلغاء" icon="pi pi-times" severity="danger" raised />
      </span>
    </form>
  );
};

export default AddEmployee;

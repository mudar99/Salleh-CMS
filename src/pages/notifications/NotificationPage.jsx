import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import "./notificationpage.scss";

const NotificationPage = () => {
  const [userType, setUserType] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process the submitted notification data here
    // You can send it to an API or handle it as needed

    // Reset form fields after submission
    setUserType(null);
    setTitle("");
    setDescription("");
  };

  const userTypeOptions = [
    { label: "Client", value: "client" },
    { label: "Towing Car", value: "towing_car" },
    { label: "Workshop", value: "workshop" },
    { label: "Store", value: "store" },
  ];

  return (
    <div className="notifications">
      <div className="notification-page">
        <h1>إرسال إشعار</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userType">نوع المستخدم</label>
            <Dropdown
              id="userType"
              value={userType}
              options={userTypeOptions}
              onChange={(e) => setUserType(e.value)}
              placeholder="Select User Type"
              className="p-inputtext"
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">عنوان الإشعار</label>
            <InputText
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-inputtext"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">وصف الإشعار</label>
            <InputTextarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="p-inputtextarea"
            />
          </div>
          <Button type="submit" label="Submit" className="p-button" />
        </form>
      </div>
    </div>
  );
};

export default NotificationPage;

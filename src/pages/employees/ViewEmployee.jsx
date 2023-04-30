import React from "react";
import { useSelector } from "react-redux";

const ViewEmployee = () => {
  const { show, btnLoading } = useSelector((state) => state.admins);
  console.log(show);
  return (
    <div>
      {btnLoading ? (
        <div className="text-center m-4">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        show.email
      )}
    </div>
  );
};

export default ViewEmployee;

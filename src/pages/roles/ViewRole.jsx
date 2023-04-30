import React from "react";
import { useSelector } from "react-redux";

const ViewRole = () => {
  const { show, btnLoading } = useSelector((state) => state.roles);
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
        show.name
      )}
    </div>
  );
};

export default ViewRole;

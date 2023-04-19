import React, { useRef, useState } from "react";
import { Galleria } from "primereact/galleria";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { getFileRequest } from "../../../redux/API/verify/towing/towingVerifications";

export const WarehouseExplore = (props) => {
  const { images, galliriaLoading } = useSelector(
    (state) => state.TowingVerifications
  );
  const galleria = useRef(null);
  const dispatch = useDispatch();

  // const images = [
  //   {
  //     id: 1,
  //     img: "/Img/graphic-design.jpg",
  //   },
  //   {
  //     id: 2,
  //     img: "/Img/Nissan.png",
  //   },
  //   {
  //     id: 3,
  //     img: "/Img/Peugeot.png",
  //   },
  //   {
  //     id: 4,
  //     img: "/Img/Salleh.png",
  //   },
  // ];
  //   const galleria = useRef(null);

  const itemTemplate = (item) => {
    return (
      <img
        src={"http://127.0.0.1:8060" + item.path}
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  return (
    <div>
      <div className="card flex justify-content-center">
        <Galleria
          ref={galleria}
          value={images}
          numVisible={10}
          style={{ maxWidth: "50%" }}
          circular
          fullScreen
          showItemNavigators
          showThumbnails={false}
          item={itemTemplate}
        />
      </div>
      <Button
        icon="pi pi-eye"
        className="p-button-rounded p-button-text p-button-success"
        aria-label="Submit"
        onClick={() => {
          dispatch(getFileRequest(props.user_id)).then(galleria.current.show());
        }}
      />
    </div>
  );
};

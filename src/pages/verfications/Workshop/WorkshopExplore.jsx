import React, { useRef, useState } from "react";
import { Galleria } from "primereact/galleria";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { local } from "../../../API";

const WorkshopExplore = (props) => {
  const { images } = useSelector((state) => state.WorkshopVerifications);
  // console.log(images);
  //   const galleria = useRef(null);

  const itemTemplate = (item) => {
    return (
      <>
        {/* {console.log("http://127.0.0.1:8060" + item.path)} */}
        <img
          src={"http://127.0.0.1:8060" + item.path}
          alt={item.alt}
          style={{ width: "100%", display: "block" }}
        />
      </>
    );
  };

  return (
    <div className="card flex justify-content-center">
      <Galleria
        ref={props.galleria}
        value={images}
        numVisible={10}
        style={{ maxWidth: "50%" }}
        circular
        fullScreen
        showItemNavigators
        showThumbnails={false}
        item={itemTemplate}
      />
      {/* <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => galleria.current.show()}
      /> */}
    </div>
  );
};

export default WorkshopExplore;

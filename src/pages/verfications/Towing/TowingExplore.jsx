import React, { useRef, useState } from "react";
import { Galleria } from "primereact/galleria";
import { Button } from "primereact/button";

const TowingExplore = (props) => {
  const images = [
    {
      id: 1,
      img: "/Img/graphic-design.jpg",
    },
    {
      id: 2,
      img: "/Img/Nissan.png",
    },
    {
      id: 3,
      img: "/Img/Peugeot.png",
    },
    {
      id: 4,
      img: "/Img/Salleh.png",
    },
  ];
  //   const galleria = useRef(null);

  const itemTemplate = (item) => {
    return (
      <img
        src={item.img}
        alt={item.alt}
        style={{ width: "100%", display: "block" }}
      />
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

export default TowingExplore;

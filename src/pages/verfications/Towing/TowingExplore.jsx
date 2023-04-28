import React, { useRef, useState } from "react";
import { Galleria } from "primereact/galleria";
import LoadingFS from "../../components/loading/LoadingFS";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { getFileRequest } from "../../../redux/API/verify/towing/towingVerifications";
const TowingExplore = (props) => {
  const { images, galliriaLoading } = useSelector(
    (state) => state.TowingVerifications
  );
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const itemTemplate = (item) => {
    return (
      <img
        src={"http://127.0.0.1:8060" + item.path}
        alt={item.alt}
        style={{
          width: "100%",
          maxWidth: "30vw",
          display: "block",
        }}
      />
    );
  };

  return (
    <>
      <div className="card">
        {galliriaLoading && <LoadingFS />}
        <Dialog
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
          resizable
          appendTo={"self"}
        >
          <div className="galleria">
            <Galleria
              className="container"
              value={images}
              numVisible={5}
              circular
              showThumbnails={false}
              showIndicators
              indicatorsPosition="top"
              item={itemTemplate}
            />
          </div>
        </Dialog>
      </div>
      <Button
        icon="pi pi-eye"
        className="p-button-rounded p-button-text p-button-success"
        aria-label="Submit"
        onClick={() => {
          dispatch(getFileRequest(props.user_id)).then(setVisible(true));
        }}
      />
    </>
  );
};

export default TowingExplore;

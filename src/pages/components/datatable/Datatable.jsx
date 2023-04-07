import { React, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./datatable.scss";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openedDialog } from "../../../redux/visibleDialog";
import WorkshopExplore from "../../verfications/Workshop/WorkshopExplore";
import WorkshopVer from "../../verfications/Workshop/WorkshopVer";

const Datatable = (props) => {
  const dispatch = useDispatch();
  const [, setCurrentPage] = useState(1);
  const imageBodyTemplate = (rowData) => {
    return rowData.img.includes("/") ? (
      <img src={rowData.img} alt={rowData.img} className="product-image" />
    ) : (
      rowData.img
    );
  };
  const galleria = useRef(null);

  const explore = (e) => {
    if (props.explore === undefined) {
      return;
    }
    e.preventDefault();
    switch (props.explore) {
      case "workshopVer":
        dispatch(WorkshopVer());
        galleria.current.show();
        break;
      case "towingVer":
        // dispatch(WorkshopVer());
        // galleria.current.show();
        break;
      case "warehouseVer":
        // dispatch(WorkshopVer());
        // galleria.current.show();
        break;
      default:
        break;
    }
  };

  const acitonBodyTemplate = (rowData) => {
    return (
      <>
        <Link
          to={props.explore === undefined ? "/employees/123" : ""}
          style={{ textDecoration: "none" }}
          onClick={explore}
        >
          <Button
            icon="pi pi-eye"
            className="p-button-rounded p-button-text p-button-success"
            aria-label="Submit"
          />
        </Link>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-text p-button-danger"
          aria-label="Submit"
        />
      </>
    );
  };
  const onCustomPage1 = (event) => {
    setCurrentPage(event.page + 1);
    console.log(event.page + 1);
  };
  const header = props.header && (
    <>
      <div className="header">
        <span className="title">{props.header}</span>
        <Button
          icon="pi pi-plus"
          onClick={() => dispatch(openedDialog())}
          rounded
          text
          raised
          aria-label="Favorite"
        />
      </div>
    </>
  );
  return (
    <div className="datatable">
      <DataTable
        header={header}
        value={props.data}
        responsiveLayout="scroll"
        rows={5}
        paginator
        onPage={onCustomPage1}
      >
        <Column align="center" field="id" header={props.headers[0]}></Column>
        <Column
          align="center"
          field="customer"
          header={props.headers[1]}
        ></Column>
        <Column
          align="center"
          body={imageBodyTemplate}
          field="img"
          header={props.headers[2]}
        ></Column>
        <Column align="center" field="date" header={props.headers[3]}></Column>
        <Column align="center" field="email" header={props.headers[4]}></Column>
        <Column
          body={acitonBodyTemplate}
          align="center"
          field="status"
          header={props.headers[5]}
        ></Column>
      </DataTable>
      <WorkshopExplore galleria={galleria} />
    </div>
  );
};

export default Datatable;

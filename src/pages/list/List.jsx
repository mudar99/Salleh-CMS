import React from "react";
import "./list.scss";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import WorkshopVD from "../verfications/Workshop/WorkshopVD";
import EmployeeDataTable from "../employees/EmployeeDataTable";
import CustomersDataTable from "../customers/CustomersDataTable";
import WorkshopsDataTable from "../workshops/WorkshopsDataTable";
import TowingDataTable from "../towing cars/TowingDataTable";
import WarehousesDataTable from "../warehouses/WarehousesDataTable";
import RequestsDataTable from "../request-management/RequestsDataTable";
import CategoriesDataTable from "../categories/CategoriesDataTable";
import TowingVD from "../verfications/Towing/TowingVD";
import WarehouseVD from "../verfications/Warehouse/WarehouseVD";
const List = (props) => {
  const visibleCallBack = (e, rowData) => {
    // switch (e) {
    //   case "U":
    //     props.updateState(e);
    //     break;
    //   case "C":
    //     props.createState(e);
    //   case "D":
    //     break;
    //   default:
    //     break;
    // }
    props.visibleState(e, rowData);
  };
  const x = () => {
    // console.log(props.component);
    switch (props.component) {
      case "WorkshopVD":
        return <WorkshopVD />;
      case "TowingVD":
        return <TowingVD />;
      case "WarehouseVD":
        return <WarehouseVD />;
      case "EmployeeDataTable":
        return <EmployeeDataTable />;
      case "CustomersDataTable":
        return <CustomersDataTable />;
      case "WorkshopsDataTable":
        return <WorkshopsDataTable />;
      case "TowingDataTable":
        return <TowingDataTable />;
      case "WarehousesDataTable":
        return <WarehousesDataTable />;
      case "RequestsDataTable":
        return <RequestsDataTable />;
      case "CategoriesDataTable":
        return (
          <CategoriesDataTable
            createState={visibleCallBack}
            updateState={visibleCallBack}
          />
        );
      default:
        return;
    }
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {x()}
      </div>
    </div>
  );
};

export default List;

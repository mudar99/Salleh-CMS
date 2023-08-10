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
import TowingVD from "../verfications/Towing/TowingVD";
import WarehouseVD from "../verfications/Warehouse/WarehouseVD";
import OrdersDataTable from "../orders-management/OrdersDataTable";
import RolesDataTable from "../roles/RolesDataTable";
import CategoriesTreeTable from "../categories/CategoriesTreeTable";
import ClientsExplore from "../maps/ClientsExplore";
import ComplaintsDataTable from "../complaints/ComplaintsDataTable";
import SuggestionsDataTable from "../suggestions/SuggestionsDataTable";
import NotificationPage from "../notifications/NotificationPage";
import BlockPage from "../black-list/BlockPage";
import PreOrdersDataTable from "../preorders-management/PreOrdersDataTable";
import TowingOrdersDataTable from "../towing-orders/TowingOrdersDataTable";
const List = (props) => {
  const visibleCallBack = (e, rowData, basicRows) => {
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
    console.log("------------------");
    console.log(e, rowData, basicRows);
    props.visibleState(e, rowData, basicRows);
  };
  const switchComponent = () => {
    // console.log(props.component);
    switch (props.component) {
      case "WorkshopVD":
        return <WorkshopVD />;
      case "ClientsMap":
        return <ClientsExplore />;
      case "TowingVD":
        return <TowingVD />;
      case "WarehouseVD":
        return <WarehouseVD />;
      case "EmployeeDataTable":
        return (
          <EmployeeDataTable
            createState={visibleCallBack}
            updateState={visibleCallBack}
            showState={visibleCallBack}
          />
        );
      case "RolesDataTable":
        return (
          <RolesDataTable
            createState={visibleCallBack}
            updateState={visibleCallBack}
            showState={visibleCallBack}
          />
        );
      case "CustomersDataTable":
        return <CustomersDataTable />;
      case "WorkshopsDataTable":
        return <WorkshopsDataTable />;
      case "TowingDataTable":
        return <TowingDataTable />;
      case "WarehousesDataTable":
        return <WarehousesDataTable />;
      case "OrdersDataTable":
        return <OrdersDataTable />;
      case "PreOrdersDataTable":
        return <PreOrdersDataTable />;
        case "TowingOrdersDataTable":
          return <TowingOrdersDataTable />;
      case "CategoriesDataTable":
        return (
          <CategoriesTreeTable
            createState={visibleCallBack}
            updateState={visibleCallBack}
          />
        );
      case "ComplaintsDataTable":
        return <ComplaintsDataTable />;
      case "SuggestionsDataTable":
        return <SuggestionsDataTable />;
      case "NotificationPage":
        return <NotificationPage />;
      case "BlockPage":
        return <BlockPage />;
      default:
        return;
    }
  };
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {switchComponent()}
      </div>
    </div>
  );
};

export default List;

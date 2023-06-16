import React, { useEffect, useRef, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import LoadingFS from "../components/loading/LoadingFS";
import { DeleteCategory, GetCategories } from "../../redux/API/categorySlice";
import { showInfo, showSuccess } from "../../ToastService";
import { confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { TreeTable } from "primereact/treetable";
import { Paginator } from "primereact/paginator";
import { isArabic } from "../../utils/langType";

const CategoriesTreeTable = (props) => {
  const dispatch = useDispatch();
  const [selectedNodeKey, setSelectedNodeKey] = useState(null);
  const [basicFirst, setBasicFirst] = useState(1);
  const [basicRows, setBasicRows] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [capacity, setCapacity] = useState(2);
  const { data, totalItems } = useSelector((state) => state.category);
  const [loading, setLoading] = useState(false);
  const [loadPlace, setLoadPlace] = useState();
  const [counter, setCounter] = useState(1);

  const toast = useRef(null);
  useEffect(() => {
    let info = {
      size: basicRows,
      page: currentPage,
      capacity: capacity,
      id: 1,
      load: 2,
    };
    dispatch(GetCategories(info));
  }, []);
  const onBasicPageChange = (event) => {
    let currentPage = event.page + 1;
    setCurrentPage(currentPage);
    setBasicFirst(event.first);
    setBasicRows(event.rows);
    let info = {
      size: basicRows,
      page: currentPage,
      capacity: capacity,
      id: 1,
      load: 2,
    };
    dispatch(GetCategories(info));
  };
  const header = (
    <div className="header">
      <span className="title">أصناف</span>
      <Button
        icon="pi pi-plus"
        onClick={() => props.createState("C")}
        rounded
        text
        raised
        aria-label="Favorite"
      />
    </div>
  );
  const acitonBodyTemplate = (rowData) => {
    if (rowData.children.length !== 0) {
      return (
        <div className="text-center">
          <Button
            className="p-button-rounded p-button-text p-button-success"
            dir="ltr"
            icon="pi pi-spinner"
            severity="success"
            onClick={() => {
              let info;
              let c;
              let co;
              // console.log(rowData);
              setLoadPlace(rowData.data.name);
              if (loadPlace === rowData.data.name || loadPlace === undefined) {
                c = false;
              } else {
                c = true;
              }
              if (c) {
                setCounter(2);
                co = 2;
                info = {
                  size: basicRows,
                  page: currentPage,
                  capacity: capacity,
                  id: rowData.key,
                  load: co,
                };
              } else {
                setCounter(counter + 1);
                co = counter + 1;
                info = {
                  size: basicRows,
                  page: currentPage,
                  capacity: capacity,
                  id: rowData.key,
                  load: co,
                };
              }
              // console.log(chg);
              // console.log(co);
              dispatch(GetCategories(info));
            }}
          />
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-text p-button-success"
            aria-label="Submit"
            onClick={() => props.updateState("U", rowData)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-text p-button-danger"
            aria-label="Submit"
            onClick={(event) => {
              confirmPopup({
                target: event.currentTarget,
                message: "هل تود حذف هذا الصنف؟",
                header: "تاكيد",
                icon: "pi pi-info-circle",
                acceptLabel: "تأكيد",
                rejectLabel: "إلغاء",
                acceptClassName: "p-button-danger",
                rejectClassName: "p-button-text",
                accept: () => {
                  dispatch(DeleteCategory(rowData.key)).then((res) => {
                    console.log(res);
                    if (res.payload.status === true) {
                      showSuccess(res.payload.message, toast);
                      dispatch(GetCategories());
                      return;
                    }
                  });
                },
                reject: () => {
                  showInfo("تم الإلغاء", toast);
                },
                appendTo: document.querySelector(".datatable"),
              });
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-text p-button-success"
            aria-label="Submit"
            onClick={() => props.updateState("U", rowData)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-text p-button-danger"
            aria-label="Submit"
            onClick={(event) => {
              confirmPopup({
                target: event.currentTarget,
                message: "هل تود حذف هذا الصنف؟",
                header: "تاكيد",
                icon: "pi pi-info-circle",
                acceptLabel: "تأكيد",
                rejectLabel: "إلغاء",
                acceptClassName: "p-button-danger",
                rejectClassName: "p-button-text",
                accept: () => {
                  dispatch(DeleteCategory(rowData.key)).then((res) => {
                    console.log(res);
                    if (res.payload.status === true) {
                      showSuccess(res.payload.message, toast);
                      dispatch(GetCategories());
                      return;
                    }
                  });
                },
                reject: () => {
                  showInfo("تم الإلغاء", toast);
                },
                appendTo: document.querySelector(".datatable"),
              });
            }}
          />
        </div>
      );
    }
  };
  const bodyClassName = (category_id, field) => {
    let className = undefined;
    if (category_id === null) {
      className = "parent text-break ";
    }
    if (isArabic(field)) {
      className = className ? className + "arabic" : "arabic";
    } else {
      className = className ? className + "english" : "english";
    }
    return className;
  };

  const onSelect = (event) => {
    let id = event.node.data.id;
  };
  return (
    <div className="treetable">
      {loading && <LoadingFS />}
      <TreeTable
        header={header}
        showGridlines
        value={data}
        tableStyle={{ minWidth: "50rem" }}
        onSelect={onSelect}
        selectionMode="single"
        selectionKeys={selectedNodeKey}
        onSelectionChange={(e) => setSelectedNodeKey(e.value)}
      >
        <Column
          bodyClassName={(rowData) => rowData.category_id === null && "parent"}
          body={(rowData) => {
            return <>{rowData.key}</>;
          }}
          header="المعرف"
          className="text-break"
          expander
        ></Column>
        <Column
          bodyClassName={(rowData) =>
            bodyClassName(rowData.category_id, rowData.name)
          }
          field="name"
          className="text-break"
          header="الاسم"
        ></Column>
        <Column
          bodyClassName={(rowData) =>
            bodyClassName(rowData.category_id, rowData.created_at)
          }
          className="text-break"
          field="created_at"
          header="تاريخ الإنشاء"
        ></Column>
        <Column
          bodyClassName={(rowData) =>
            bodyClassName(rowData.category_id, rowData.description)
          }
          className="text-break"
          field="description"
          header="الوصف"
        ></Column>
        <Column
          bodyClassName={(rowData) =>
            rowData.category_id === null && "image parent text-break"
          }
          body={(rowData) => {
            return (
              <div className="text-center">
                <img
                  src={"http://127.0.0.1:8060" + rowData.data.image_path}
                ></img>
              </div>
            );
          }}
          header="صورة"
        ></Column>
        <Column
          bodyClassName={(rowData) =>
            rowData.category_id === null && "parent text-break"
          }
          header="حدث"
          className="text-break"
          body={acitonBodyTemplate}
        ></Column>
      </TreeTable>

      <Paginator
        first={basicFirst}
        rows={basicRows}
        totalRecords={totalItems}
        onPageChange={onBasicPageChange}
      ></Paginator>
      <Toast ref={toast} />
    </div>
  );
};

export default CategoriesTreeTable;
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { SearchField } from "./SeacrchField";
import "leaflet-geosearch/dist/geosearch.css";
import { Dropdown } from "primereact/dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  GetStorehousesMarkers,
  GetTowingsMarkers,
  GetWorkShopsMarkers,
} from "../../redux/API/users/markersSlice";
import LoadingFS from "../components/loading/LoadingFS";
import "./clientexplore.scss";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import L from "leaflet";

const ClientsExplore = (props) => {
  const [selectedOption, setSelectedOption] = useState("workshops");
  const options = [
    { label: "ورشات", value: "workshops" },
    { label: "مستودعات", value: "warehouses" },
    { label: "سيارات سحب", value: "towingcars" },
  ];
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    setSelectedOption(e.value);
  };
  const [setPosition] = useState({ lat: 33.492021, lng: 36.332652 });
  const { loading, data } = useSelector((state) => state.markers);
  console.log(data);
  useEffect(() => {
    switch (selectedOption) {
      case "workshops":
        dispatch(GetWorkShopsMarkers());
        break;
      case "warehouses":
        dispatch(GetStorehousesMarkers());
        break;
      case "towingcars":
        dispatch(GetTowingsMarkers());
        break;
      default:
        break;
    }
    console.log(selectedOption);
  }, [selectedOption]);

  const lightTheme = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const workshopIcon = L.icon({
    iconUrl: "/Img/workshop-icon.png",
    iconSize: [50, 50],
    iconAnchor: [25, 5],
  });
  const storeIcon = L.icon({
    iconUrl: "/Img/store-icon.png",
    iconSize: [50, 50],
    iconAnchor: [25, 5],
  });
  const towingIcon = L.icon({
    iconUrl: "/Img/towing-icon.png",
    iconSize: [50, 50],
    iconAnchor: [25, 5],
  });
  const iconHandler = () => {
    switch (selectedOption) {
      case "workshops":
        return workshopIcon;
      case "warehouses":
        return storeIcon;
      case "towingcars":
        return towingIcon;
    }
  };
  return (
    <div className="client-explore">
      {loading && <LoadingFS />}
      <div className="selection-container">
        <div className="selection">
          <h6>اختر نوع العميل</h6>
          <div className="">
            <Dropdown
              appendTo={"self"}
              value={selectedOption}
              options={options}
              onChange={handleSelect}
              placeholder="Select an option"
            />
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">
        <MapContainer
          center={{ lat: 33.492021, lng: 36.332652 }}
          zoom={13}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
        >
          <TileLayer url={lightTheme} attribution="OpenStreetMap" />
          {data.map((item) => {
            return (
              <Marker
                icon={iconHandler()}
                key={item.id}
                position={{ lat: item.user_latitude, lng: item.user_longitude }}
                draggable={false}
              >
                <Popup>
                  <div className="card-information">
                    <h6 className="card-title">معلومات المستخدم</h6>
                    <div className="card-body">
                      <div className="card-info">
                        <h6>الاسم:</h6>
                        <div>
                          {item.firstname} {item.lastname}
                        </div>
                      </div>
                      <div className="card-info">
                        <h6>الرقم:</h6>
                        <div>{item.phone_number}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-center">
                      <Link
                        //  to={`${selectedOption + String(item.id)}`}
                        to={`/${selectedOption + "/" + String(item.id)}`}
                      >
                        <Button label="زيارة" raised />
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          <SearchField
            setPosition={(e1, e2) => setPosition({ lat: e1, lng: e2 })}
            apiKey={"38ab25a725154cf192acbe16aa4624e4"}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default ClientsExplore;

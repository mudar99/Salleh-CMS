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

const ClientsExplore = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { label: "ورشات", value: "workshops" },
    { label: "مستودعات", value: "storehouses" },
    { label: "سيارات سحب", value: "towings" },
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
      case "storehouses":
        dispatch(GetStorehousesMarkers());
        break;
      case "towings":
        dispatch(GetTowingsMarkers());
        break;
      default:
        break;
    }
    console.log(selectedOption);
  }, [selectedOption]);

  const lightTheme = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

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
                key={item.id}
                position={{ lat: item.user_latitude, lng: item.user_longitude }}
                draggable={false}
              >
                <Popup>
                  <div>
                    {/* Display your marker information here */}
                    <h4>معلومات المستخدم</h4>
                    <p>
                      Name: {item.firstname} {item.lastname}
                    </p>
                    <p>Store Name: {item.store_name}</p>
                    <p>Phone: {item.phone_number}</p>
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

import React, { useState } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { SearchField } from "./SeacrchField";
import "leaflet-geosearch/dist/geosearch.css";
import { Dropdown } from "primereact/dropdown";

const ClientsExplore = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { label: "ورشات", value: "workshops" },
    { label: "مستودعات", value: "storehouses" },
    { label: "سيارات سحب", value: "towings" },
  ];
  const handleSelect = (e) => {
    setSelectedOption(e.value);
  };
  const [position, setPosition] = useState({ lat: 33.492021, lng: 36.332652 });
  const workshopPositions = [
    {
      position: { lat: 33.492021, lng: 36.332652 },
      name: "السعادة",
      number: "0935150221",
    },

    {
      position: { lat: 33.502021, lng: 36.332652 },
      name: "ورشة معتز",
      number: "0935150221",
    },
    {
      position: { lat: 33.512021, lng: 36.332652 },
      name: "ورشة الأنوار",
      number: "0935150221",
    },
    {
      position: { lat: 33.2021, lng: 36.332652 },
      name: "ورشة سيارات",
      number: "0935150221",
    },
  ];

  return (
    <>
      <div className="d-flex align-items-center justify-content-center mt-2">
        <div className="w-50 card p-2">
          <div className="">
            <div className="d-flex justify-content-between">
              <h6 className="mt-3">اختر نوع العميل</h6>
              <div className="dropdown-container">
                <Dropdown
                  value={selectedOption}
                  options={options}
                  onChange={handleSelect}
                  placeholder="Select an option"
                />
              </div>
            </div>
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
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="OpenStreetMap"
          />
          {workshopPositions.map((item) => {
            return (
              <Marker position={item.position} draggable={false} >
                <Popup>
                  <div>
                    {/* Display your marker information here */}
                    <h4>Workshop Information</h4>
                    <p>Address: {item.name}</p>
                    <p>Contact: {item.number}</p>
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
    </>
  );
};

export default ClientsExplore;

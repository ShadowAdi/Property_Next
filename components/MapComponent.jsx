"use client";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS (optional)

const MapComponent = ({ location }) => {
  const [longitude, setLongitude] = useState(40.6691007);
  const [latitude, setLatitude] = useState(-73.993137);

  useEffect(() => {
    const getLocation = async () => {
      if (!process.env.NEXT_GEOCODING_API_KEY) {
        return;
      }
      try {
        console.log(process.env.NEXT_GEOCODING_API_KEY);
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${location.street}+${location.city}+${location.state}&key=${NEXT_GEOCODING_API_KEY}`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        setLongitude(data?.results?.[0]?.geometry?.lng);
        setLatitude(data?.results?.[0]?.geometry?.lat);
      } catch (err) {
        console.log(err);
      }
    };
    getLocation();
  }, []);

  const redOptions = { color: "blue" };

  return (
    <MapContainer
      center={[longitude, latitude]}
      zoom={13}
      style={{ height: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={[longitude, latitude]}
        pathOptions={redOptions}
        radius={20}
      >
        <Popup>
          {location?.street} {location?.city} {location?.state}
        </Popup>
      </CircleMarker>
    </MapContainer>
  );
};

export default MapComponent;

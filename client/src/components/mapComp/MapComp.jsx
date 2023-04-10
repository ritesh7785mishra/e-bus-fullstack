import React, { useEffect, useRef, useState } from "react";
import "./MapComp.css";
import { apiKey } from "../../util";
import * as tt from "@tomtom-international/web-sdk-maps";
// import * as ttapi from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const MapComp = () => {
  const mapElement = useRef();
  const [map, setMap] = useState({});
  const [longitude, setLongitude] = useState(80);

  const [latitude, setLatitude] = useState(27);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    let map = tt.map({
      key: apiKey,
      container: mapElement.current,
      center: [longitude, latitude],
      zoom: 14,
    });
    setMap(map);

    const addMarker = () => {
      const popupOffset = {
        bottom: [0, -25],
      };

      //creates  a popup to show
      const popup = new tt.Popup({ offset: popupOffset }).setHTML(
        "This is you!"
      );

      const element = document.createElement("div");
      element.className = "marker";

      const marker = new tt.Marker({
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      marker.setPopup(popup).togglePopup();
    };

    addMarker();

    return () => map.remove();
  }, [longitude, latitude]);

  return (
    <div
      ref={mapElement}
      className="shadow"
      style={{
        width: "350px",
      }}
    ></div>
  );
};

export default MapComp;

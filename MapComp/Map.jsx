"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoidGFydW4yNTA2IiwiYSI6ImNsaDdwbzlvZTAwdWkzcW8xM3Bib3k4bzIifQ.KY0XQwjRpgkn7KYvdaXDbQ";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [115.8613, -31.9523], // Default center, you can change it to `start` coordinates
      zoom: 12, // Default zoom level
      scrollZoom: false, // Disable scroll zoom
    });

    // Add navigation control (zoom buttons) to the top right corner
    const nav = new mapboxgl.NavigationControl({ position: "top-right" });
    mapRef.current.addControl(nav);

    // Remove Mapbox logo
    const logo = document.querySelector(".mapboxgl-ctrl-logo");
    if (logo) {
      logo.style.display = "none";
    }

    // Remove Mapbox attribution
    const attribution = document.querySelector(".mapboxgl-ctrl-attrib");
    if (attribution) {
      attribution.style.display = "none";
    }
  }, []);

  return (
    <div
      style={{ height: "100%" }}
      ref={mapContainerRef}
      className="map-container"
    />
  );
};

export default Map;
// "use client";
// import React, { useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// const Map = ({ center = [115.8613, -31.9523] }) => {
//   const mapContainerRef = useRef();
//   const mapRef = useRef();

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoidGFydW4yNTA2IiwiYSI6ImNsaDdwbzlvZTAwdWkzcW8xM3Bib3k4bzIifQ.KY0XQwjRpgkn7KYvdaXDbQ";

//     mapRef.current = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: center,
//       zoom: 12,
//       scrollZoom: false,
//     });

//     const nav = new mapboxgl.NavigationControl({ position: "top-right" });
//     mapRef.current.addControl(nav);

//     const logo = document.querySelector(".mapboxgl-ctrl-logo");
//     if (logo) {
//       logo.style.display = "none";
//     }

//     const attribution = document.querySelector(".mapboxgl-ctrl-attrib");
//     if (attribution) {
//       attribution.style.display = "none";
//     }
//   }, [center]);

//   return (
//     <div
//       style={{ height: "100%" }}
//       ref={mapContainerRef}
//       className="map-container"
//     />
//   );
// };

// export default Map;

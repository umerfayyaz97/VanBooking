// "use client";
// import React, { useEffect, useRef } from "react";
// import mapboxgl, { Map as MapboxMap, NavigationControl } from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// const Map = ({ start, end, stop }) => {
//   const mapContainerRef = useRef(null);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     mapboxgl.accessToken =
//       "pk.eyJ1IjoidGFydW4yNTA2IiwiYSI6ImNsaDdwbzlvZTAwdWkzcW8xM3Bib3k4bzIifQ.KY0XQwjRpgkn7KYvdaXDbQ";

//     if (mapContainerRef.current) {
//       mapRef.current = new mapboxgl.Map({
//         container: mapContainerRef.current,
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: [115.8613, -31.9523], // Default center, you can change it to `start` coordinates
//         zoom: 12, // Default zoom level
//       });

//       // mapRef.current.addControl(new NavigationControl(), "top-left");

//       // Disable scroll zoom
//       mapRef.current.scrollZoom.disable();

//       // Add other interactions
//       mapRef.current.dragRotate.enable();
//       mapRef.current.touchZoomRotate.enable();

//       mapRef.current.on("load", () => {
//         getRouteLine({ start, end, stop });
//       });
//     }

//     // Clean up on unmount
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//       }
//     };
//   }, [start, end, stop]);

//   useEffect(() => {
//     if (!mapRef.current) return;

//     const handleMove = () => {
//       console.log("Map moved");
//     };

//     mapRef.current.on("move", handleMove);

//     return () => {
//       mapRef.current?.off("move", handleMove);
//     };
//   }, []);

//   const getRouteLine = async ({ start, end, stop }) => {
//     if (!start || !end) {
//       console.error("Start and end locations are required");
//       return;
//     }

//     let queryUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;
//     if (stop) {
//       queryUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${stop.longitude},${stop.latitude};${end.longitude},${end.latitude}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;
//     }

//     const response = await fetch(queryUrl);
//     const data = await response.json();

//     if (!data.routes || data.routes.length === 0) return;

//     const route = data.routes[0].geometry.coordinates;
//     const geojson = {
//       type: "Feature",
//       properties: {},
//       geometry: {
//         type: "LineString",
//         coordinates: route,
//       },
//     };

//     if (mapRef.current.getSource("route")) {
//       mapRef.current.getSource("route").setData(geojson);
//     } else {
//       mapRef.current.addLayer({
//         id: "route",
//         type: "line",
//         source: {
//           type: "geojson",
//           data: geojson,
//         },
//         layout: {
//           "line-join": "round",
//           "line-cap": "round",
//         },
//         paint: {
//           "line-color": "#3887be",
//           "line-width": 5,
//           "line-opacity": 0.75,
//         },
//       });
//     }
//   };

//   return (
//     <div
//       style={{ height: "100vh", width: "100%" }}
//       ref={mapContainerRef}
//       className="map-container"
//     />
//   );
// };

// export default Map;

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

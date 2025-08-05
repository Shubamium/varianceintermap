/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useRef } from "react";
import L from "leaflet";
import RasterCoords from "leaflet-rastercoords";

import "leaflet/dist/leaflet.css";

// Map Image Size
const size = [8192, 5063];

// Use this function to convert pixel to latlng for position
// [X,Y]
// rc.unproject([0, 0]);

type SidebarOptions = {
  title: "string";
  content: "string";
};

// Icon Marker List
const IconList: {
  name: string;
  position: [number, number];
  options: L.IconOptions;
  tooltip?: string;
  sidebar?: SidebarOptions;
}[] = [
  {
    name: "Corrupter",
    position: [4000, 1500], // Position in Pixel Coordinate
    options: {
      iconUrl: "/corrupters.png",
      iconSize: [150, 150], // Might be stretched
      iconAnchor: [75, 75],
      popupAnchor: [0, 75],
      tooltipAnchor: [-5, -76],
      className: "faction-icons",
      shadowSize: [41, 41],
    },
  },
  {
    name: "Nakoda",
    position: [2000, 3200],
    options: {
      iconUrl: "/nakoda.png",
      iconSize: [150, 150],
      iconAnchor: [75, 75],
      tooltipAnchor: [-5, -76],
      popupAnchor: [0, 75],
      className: "faction-icons",
    },
  },
  {
    name: "Ziton Corporation",
    position: [4500, 2200],
    options: {
      iconUrl: "/ziton.png",
      iconSize: [110, 150],
      iconAnchor: [75, 75],
      popupAnchor: [0, -250],
      tooltipAnchor: [-5, -76],
      className: "faction-icons",
    },
  },
];

// Place Name
const PlacesNameList: {
  position: [number, number];
  options: L.MarkerOptions;
}[] = [
  {
    position: [5000, 2400],
    options: {
      title: "Place Name",
      icon: L.divIcon({
        className: "poi",
        html: "Place Name Here",
        iconSize: [200, 200],
      }),
    },
  },
];

export default function LeafletMap({
  openSidebar,
}: {
  openSidebar: (corp: string) => void;
}) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      // Initialize Map
      const map = L.map(mapRef.current, {
        center: [60, -10], // Center of the map (Lang,ltd)
        zoom: 3,
      });

      // Initialize RasterCoords for Position Conversion
      const rc = new L.RasterCoords(map, size);

      // Initialize the Layer
      L.tileLayer("/map/{z}/{x}/{y}.png", {
        maxZoom: rc.zoomLevel(),
        minZoom: 3,
        bounds: rc.getMaxBounds(),
        maxNativeZoom: rc.zoomLevel(),
        noWrap: true,
      }).addTo(map);

      const addIconsToMap = () => {
        const list: L.Marker[] = [];
        IconList.forEach((icon) => {
          const marker = L.marker(rc.unproject(icon.position), {
            icon: L.icon(icon.options),
          });
          marker.bindTooltip(icon.name, {
            direction: "bottom",
          });
          list.push(marker);
        });
        return L.layerGroup(list).addTo(map);
      };

      const addSmallPlacesToMap = () => {
        const list: L.Marker[] = [];
        PlacesNameList.forEach((place) => {
          const marker = L.marker(rc.unproject(place.position), place.options);
          list.push(marker);
        });
        return L.layerGroup(list);
      };
      const factions = addIconsToMap();
      const smallPlaces = addSmallPlacesToMap();
      // const f1Icon = L.icon({
      //   iconUrl: "/corrupters.png",
      //   iconSize: [150, 150],
      //   iconAnchor: [75, 75],
      //   popupAnchor: [0, 75],
      //   tooltipAnchor: [-5, -76],
      //   className: "faction-icons",
      //   shadowSize: [41, 41],
      // });
      // const f2icon = L.icon({
      //   iconUrl: "/nakoda.png",
      //   iconSize: [150, 150],
      //   iconAnchor: [75, 75],
      //   tooltipAnchor: [-5, -76],
      //   popupAnchor: [0, 75],
      //   className: "faction-icons",
      // });
      // const f3icon = L.icon({
      //   iconUrl: "/ziton.png",
      //   iconSize: [110, 150],
      //   iconAnchor: [75, 75],
      //   popupAnchor: [0, -250],
      //   tooltipAnchor: [-5, -76],
      //   className: "faction-icons",
      // });

      // const f1 = L.marker(rc.unproject([4000, 1500]), { icon: f1Icon }).addTo(
      //   map
      // );
      // const f2 = L.marker(rc.unproject([2000, 3200]), { icon: f2icon }).addTo(
      //   map
      // );
      // const f3 = L.marker(rc.unproject([4500, 2200]), { icon: f3icon }).addTo(
      //   map
      // );

      // f1.on("click", () => {
      //   openSidebar("Corrupters");
      // });
      // f2.on("click", () => {
      //   openSidebar("Nakoda");
      // });
      // f3.on("click", () => {
      //   openSidebar("Ziton");
      // });

      // Initialize First Layer
      // map.addLayer(factions);
      // map.addLayer(smallPlaces);

      // Layer Visibility based on zoom level
      map.on("zoom", () => {
        const zoom = map.getZoom();

        if (zoom >= 4) {
          // Show on zoom level more than 4
          map.addLayer(smallPlaces);
          map.removeLayer(factions);
        } else {
          // Hide on zoom level less than 4
          map.addLayer(factions);
          map.removeLayer(smallPlaces);
        }
      });

      // f1.bindTooltip("Corrupters", {
      //   direction: "top",
      // });
      // f2.bindTooltip("Nakoda", {
      //   direction: "top",
      // });
      // f3.bindTooltip("Ziton", {
      //   direction: "top",
      // });
    }
  }, []);

  return (
    <>
      <div
        ref={mapRef}
        id="map"
        className="map"
        style={{ width: "100vw", height: "100vh" }}
      ></div>
      <p>aaa</p>
    </>
  );
}

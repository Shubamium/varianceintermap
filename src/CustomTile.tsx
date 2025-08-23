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
  title: string;
  content: string;
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
    name: "Seraphine",
    position: [5100, 4600], // Position in Pixel Coordinate
    sidebar: {
      title: "Seraphine",
      content:
        "\"May the goddess bless you. \" \n \"Each step on the path of the righteous is guided by the grace of the Goddess. Your time in the Stel LaPhia has prepared you for the challenge ahead. Make the journey of the soul, and fly on wings of faith to the land that was promised. There, you will find true bliss.\"",
    },
    options: {
      iconUrl: "/factions/Seraphine_logo-1.png",
      iconSize: [125, 150], // Might be stretched
      iconAnchor: [75, 75],
      popupAnchor: [0, 75],
      tooltipAnchor: [-5, -76],
      className: "faction-icons seraphine-icon",
      shadowSize: [41, 41],
    },
  },
  {
    name: "Corrupter",
    position: [5450, 1000], 
    sidebar: {
      title: "Corrupter",
      content:
        "Equilibrium shall be reached. ",
    },
    options: {
      iconUrl: "/factions/Corrupters_logo-1.png",
      iconSize: [150, 150], // Might be stretched
      iconAnchor: [75, 75],
      popupAnchor: [0, 75],
      tooltipAnchor: [-5, -76],
      className: "faction-icons corrupter-icon",
      shadowSize: [41, 41],
    },
  },
  {
    name: "Nakoda",
    position: [5200, 2200],
    sidebar: {
      title: "The United Tribes of Nakoda",
      content:
        "In unison with the spirits.",
    },
    options: {
      iconUrl: "/factions/Nakoda_logo-1.png",
      iconSize: [150, 150],
      iconAnchor: [75, 75],
      tooltipAnchor: [-5, -76],
      popupAnchor: [0, 75],
      className: "faction-icons nakoda-icon",
    },
  },
  {
    name: "Ziton Corporation",
    position: [1780, 3100] ,
    sidebar: {
      title: "Ziton Corporation",
      content:
        "Order is the right answer.",
    },
    options: {
      iconUrl: "/factions/Ziton_logo-1.png",
      iconSize: [110, 150],
      iconAnchor: [75, 75],
      popupAnchor: [0, -250],
      tooltipAnchor: [-5, -76],
      className: "faction-icons ziton-icon",
    },
  },
  {
    name: "Gan Eden",
    position: [1630, 3650] ,
    sidebar: {
      title: "Gan Eden",
      content:
        "\"Ignite the spark of rebellion. \"",
    },
    options: {
      iconUrl: "/factions/GanEden_logo-1.png",
      iconSize: [180, 150],
      iconAnchor: [75, 75],
      popupAnchor: [0, -250],
      tooltipAnchor: [-5, -76],
      className: "faction-icons ganeden-icon",
    },
  },
  {
    name: "Cairon Empire",
    position: [4150, 1300] ,
    sidebar: {
      title: "Cairon Empire",
      content:
        "Power reigns absolute. \n The Cairon Empire is a nation most regal in name and its peoples are most opulent in nature.",
    },
    options: {
      iconUrl: "/factions/Cairon_logo-1.png",
      iconSize: [110, 150],
      iconAnchor: [75, 75],
      popupAnchor: [0, -250],
      tooltipAnchor: [-5, -76],
      className: "faction-icons cairon-icon",
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
  openSidebar: (corp: string, content: string) => void;
}) {
  console.log(RasterCoords);
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

          marker.on("click", () => {
            if (icon.sidebar) {
              openSidebar(icon.sidebar.title, icon.sidebar.content);
            }
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

      // Control Layer Visibility based on zoom level
      map.on("zoom", () => {
        const zoom = map.getZoom();

        if (zoom >= 5) {
          // Show on zoom level more than 4
          map.addLayer(smallPlaces);
          map.removeLayer(factions);
        } else {
          // Hide on zoom level less than 4
          map.addLayer(factions);
          map.removeLayer(smallPlaces);
        }
      });
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

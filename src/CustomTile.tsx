import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const size = [8192, 5063];

export default function LeafletMap({
  openSidebar,
}: {
  openSidebar: (corp: string) => void;
}) {
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current, {
        center: [60, -10], // London
        zoom: 3,
      });

      const rc = new L.RasterCoords(map, size);
      // map.setView(rc.unproject([size[0], size[1]]), 2);
      L.tileLayer("/map/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: rc.zoomLevel(),
        minZoom: 3,
        bounds: rc.getMaxBounds(),
        maxNativeZoom: rc.zoomLevel(),
        noWrap: true,
      }).addTo(map);

      const f1Icon = L.icon({
        iconUrl: "/corrupters.png",
        iconSize: [150, 150],
        iconAnchor: [75, 75],
        popupAnchor: [0, 75],
        tooltipAnchor: [-5, -76],
        className: "faction-icons",
        shadowSize: [41, 41],
      });
      const f2icon = L.icon({
        iconUrl: "/nakoda.png",
        iconSize: [150, 150],
        iconAnchor: [75, 75],
        tooltipAnchor: [-5, -76],
        popupAnchor: [0, 75],
        className: "faction-icons",
      });
      const f3icon = L.icon({
        iconUrl: "/ziton.png",
        iconSize: [110, 150],
        iconAnchor: [75, 75],
        popupAnchor: [0, -250],
        tooltipAnchor: [-5, -76],
        className: "faction-icons",
      });

      const f1 = L.marker(rc.unproject([4000, 1500]), { icon: f1Icon }).addTo(
        map
      );
      const f2 = L.marker(rc.unproject([2000, 3200]), { icon: f2icon }).addTo(
        map
      );
      const f3 = L.marker(rc.unproject([4500, 2200]), { icon: f3icon }).addTo(
        map
      );

      f1.on("click", () => {
        openSidebar("Corrupters");
      });
      f2.on("click", () => {
        openSidebar("Nakoda");
      });
      f3.on("click", () => {
        openSidebar("Ziton");
      });
      const poi = L.marker(rc.unproject([6000, 3000]), {
        title: "Place Name",
        icon: L.divIcon({
          className: "poi",
          html: "Place Name",
          iconSize: [200, 200],
        }),
      }).addTo(map);

      const factions = L.layerGroup([f1, f2, f3]);
      map.addLayer(factions);

      map.on("zoom", () => {
        const zoom = map.getZoom();
        console.log(zoom);
        if (zoom >= 4) {
          map.removeLayer(factions);
        } else {
          map.addLayer(factions);
        }
      });
      poi.on("click", () => {
        console.log("click");
      });
      f1.bindTooltip("Corrupters", {
        direction: "top",
      });
      f2.bindTooltip("Nakoda", {
        direction: "top",
      });
      f3.bindTooltip("Ziton", {
        direction: "top",
      });
    }
  }, [openSidebar]);

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

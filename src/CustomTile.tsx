/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef } from "react";
import L from "leaflet";
import RasterCoords from "leaflet-rastercoords";

import "leaflet/dist/leaflet.css";

// Map Image Size
const size = [8000, 5063];

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
      title: "The Cult of La' Seraphine",
      content: `❝ May the goddess bless you. ❞
        
        Bathed in the Goddess' tears, the Seraphine follow her teaching faithfully, drawing power from their emotional tides, a testament to the divine dance of cosmic intention.

        The tears of the Goddess are also known as “Astral Droplets” and are collected from a sacred basin hidden within the floating city of Del LaPhia. Upon being placed within specialized artificia, the droplets' latent power can be drawn out to aid the Seraphine cause.
        `,
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
      title: "The Corrupters",
      content: `❝ Equilibrium shall be reached. ❞
        
        The Corrupters are beings influenced by the ancient whispers of Izun, God of Corruption. Often, Corrupters are driven by an insatiable hunger for aracana and will ravage through realms, casting shadows of chaos and despair.

        Izun, once the God of Balance, wished to create equilibrium between the Gods and their creations. Yet betrayed and imprisoned, he awaits his chance to end it all in the name of true balance.

        `,
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
      title: "The United Clans of Nakoda",
      content: `❝ In unison with the spirits. ❞
        
        In spirtual harmony with the wilderness, the clans of Nakoda intertwine their destinies with the rhythmns of the earth, their shared essence echoing the song of unity.
        
        Long ago, the clans of the Great Forest put aside their rivalries and vowed to face any outside threats as a united people. No longer divided by individual interests, the Nakoda chose to be defined by shared beliefs, a common history, and their desire to protect their home.
        `,
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
    position: [1780, 3100],
    sidebar: {
      title: "Ziton Corporation",
      content: `❝ Order is the right answer. ❞
        
        Xtasis, capitol of the United Dunari Federation, is a city built through the exploitation of Arcana Stones.  The abundance of energy from these stones led to the rise of Ziton Corporation, which developed groundbreaking arcana technology and established itself as a leading high-tech enterprise in the region.
        
        Yet between the city's center and Outer Rim lies a darker side, a society where the rich get richer and the poor left behind.
        `,
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
    position: [1630, 3650],
    sidebar: {
      title: "Gan Eden",
      content: `❝ Ignite the spark of rebellion.  ❞
        
        Rejecting the hollow neon glow of Xtasis, the rebels of Gan Eden fight tooth and nail to reclaim a future stolen by greed. Their mission is clear: cleanse Arcblight's poison, stop Ziton's plunder, and build an untamed garden where life can flourish.
        
        Ziton has tech, numbers, and wealth, but Gan Eden has something stronger ー the will to fight for a world worth living in. Their activities range from guerrilla sabotage against Ziton's infrastructure to clandestine operations to aid the oppressed citizens of the Outer Rim.
        `,
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
    position: [4150, 1300],
    sidebar: {
      title: "The Cairon Empire",
      content: `❝ Power reigns absolute. ❞

        The Cairon Empire is a nation most regal in name and its peoples are most opulent in nature. Within the empire corrupt nobles dance upon a stage of treachery, while wars echo the symphony of shattered souls.
        
        The Empire stands unchallenged within its borders, led by the imperial family which holds the authority of Valorbane, a legendary sentient sword. So long as this sword has a wielder, the Cairon Empire thrives.
        `,
    },
    options: {
      iconUrl: "/factions/Cairon_logo-1.png",
      iconSize: [130, 150],
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
    position: [3350, 1580],
    options: {
      title: "Weaponfall",
      icon: L.divIcon({
        className: "poi",
        html: "Weaponfall",
        iconSize: [200, 200],
      }),
    },
  },
  {
    position: [5060, 2500],
    options: {
      title: "The Sanctuary",
      icon: L.divIcon({
        className: "poi",
        html: "The Sanctuary",
        iconSize: [200, 200],
      }),
    },
  },
  {
    position: [4700, 2020],
    options: {
      title: "Lignarian Frontier",
      icon: L.divIcon({
        className: "poi",
        html: "Lignarian Frontier",
        iconSize: [200, 200],
      }),
    },
  },
  {
    position: [2650, 1660],
    options: {
      title: "Kingdom of Lumidia",
      icon: L.divIcon({
        className: "poi",
        html: "Kingdom of Lumidia",
        iconSize: [200, 200],
      }),
    },
  },
  {
    position: [3200, 1060],
    options: {
      title: "Kingdom of Vespasia",
      icon: L.divIcon({
        className: "poi",
        html: "Kingdom of Vespasia",
        iconSize: [200, 200],
      }),
    },
  },
  {
    position: [3850, 1100],
    options: {
      title: "Kingdom of Raganvald",
      icon: L.divIcon({
        className: "poi",
        html: "Kingdom of Raganvald",
        iconSize: [200, 200],
      }),
    },
  },
  {
    position: [4100, 1500],
    options: {
      title: "Heart of Cairon",
      icon: L.divIcon({
        className: "poi",
        html: "Heart of Cairon",
        iconSize: [200, 200],
      }),
    },
  },
  //   {
  //   position: [4000, 1700],
  //   options: {
  //     title: "Port City of Magnolia",
  //     icon: L.divIcon({
  //       className: "poi",
  //       html: "Port City of Magnolia",
  //       iconSize: [200, 200],
  //     }),
  //   },
  // },
  {
    position: [3950, 1350],
    options: {
      title: "Sable Silver Mines",
      icon: L.divIcon({
        className: "poi",
        html: "Sable Silver Mines",
        iconSize: [200, 200],
      }),
    },
  },
  {
    position: [5100, 4690],
    options: {
      title: "Del LaPhia",
      icon: L.divIcon({
        className: "poi",
        html: "Del LaPhia",
        iconSize: [200, 200],
      }),
    },
  },
  {
    position: [1770, 3500],
    options: {
      title: "Xtasis",
      icon: L.divIcon({
        className: "poi",
        html: "Xtasis",
        iconSize: [200, 200],
      }),
    },
  },
  //     {
  //   position: [1610, 3380],
  //   options: {
  //     title: "Dunari-Sable Gate",
  //     icon: L.divIcon({
  //       className: "poi",
  //       html: "Dunari-Sable Gate",
  //       iconSize: [200, 200],
  //     }),
  //   },
  // },
  {
    position: [5050, 1600],
    options: {
      title: "The Great Wound",
      icon: L.divIcon({
        className: "poi",
        html: "The Great Wound",
        iconSize: [200, 200],
      }),
    },
  },
  {
    position: [5900, 1350],
    options: {
      title: "Banyaku Delta",
      icon: L.divIcon({
        className: "poi",
        html: "Banyaku Delta",
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
      const resize = new ResizeObserver(() => {
        map.invalidateSize();
        console.log("resize");
      });
      resize.observe(mapRef.current);
    }
  }, []);

  return (
    <>
      <div ref={mapRef} id="map" className="map"></div>
    </>
  );
}

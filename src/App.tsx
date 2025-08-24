import "leaflet/dist/leaflet.css";
import LeafletMap from "./CustomTile";
import "./App.scss";
import { useState } from "react";

function App() {
  const [sb, setSb] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <>
      <div className={`sidebar ${sb ? "open" : "closed"}`}>
        <button className="btn btn-main" onClick={() => setSb(!sb)}>
          CLOSE
        </button>
        <h1>{title}</h1>
        <p>
          {desc.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
      {/* Clickable text that opens the sidebar */}
      <button
        className="btn btn-main credit"
        onClick={() => {
          setSb(true);
          setTitle("Map Asset Credits");
          setDesc(`Assets used in this map are owned by their respective creators and are used here under commercial licenses or with permission.:

            Project Earth Theme
            Author: Nexoness (Innozoom)
            License: CC-BY-ND 4.0 - no changes made to materials
            Link: https://cartographyassets.com/assets/4889/project-earth

            CG2A - Mazlo Assets
            Author: Mazlo
            License: Attached Content License Agreement
            Link: www.patreon.com/cg2a/posts

            Rough Seas Theme
            Author: JChunick
            License: Attached Content License Agreement
            Link: https://cartographyassets.com/assets/7454/rough-seas-theme-commercial

            AoA WonderDraft Assets
            Author: AoA Store
            License: Attached Content License Agreement
            Link: https://payhip.com/AoA

            `);
        }}
      >
        Credits
      </button>
      <LeafletMap
        openSidebar={(name: string, sbDesc: string) => {
          setSb(() => true);
          setDesc(sbDesc);
          setTitle(name);
        }}
      />
    </>
  );
}

export default App;

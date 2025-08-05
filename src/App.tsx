import "leaflet/dist/leaflet.css";
import LeafletMap from "./CustomTile";
import "./App.css";
import { useState } from "react";

function App() {
  const [sb, setSb] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <>
      <div className={`sidebar ${sb ? "open" : "closed"}`}>
        <button onClick={() => setSb(!sb)}>CLOSE</button>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
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

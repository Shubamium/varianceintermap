import "leaflet/dist/leaflet.css";
import LeafletMap from "./CustomTile";
import "./App.css";
import { useState } from "react";

function App() {
  const [sb, setSb] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <>
      <div className={`sidebar ${sb ? "open" : "closed"}`}>
        <button onClick={() => setSb(!sb)}>CLOSE</button>
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          tempore adipisci id obcaecati eum beatae error consequatur ea
          doloribus, maiores neque nobis ratione omnis. Quisquam aliquid tempora
          dolores fuga commodi, explicabo dolore corporis similique voluptate
          assumenda praesentium architecto voluptas accusantium necessitatibus
          sint et! Error consequuntur omnis ipsa, labore eligendi laboriosam
        </p>
        <p>
          corrupti voluptatum iure beatae perferendis perspiciatis et placeat
          iusto sequi. Eaque, error. Hic veritatis sunt praesentium consequatur
          saepe quos consequuntur libero illum dolore quam cum dignissimos
          recusandae repudiandae porro doloremque similique ad, quasi officiis?
          Rem a qui, inventore, doloremque eligendi pariatur labore sint commodi
          dicta ea similique architecto omnis eveniet. Similique voluptatem
          fugit quo maxime commodi? Facilis, incidunt molestiae in iste iusto
          soluta sint laudantium autem architecto? Excepturi, ipsam facilis!
        </p>
      </div>
      <LeafletMap
        openSidebar={(name: string) => {
          console.log(name);
          setSb(() => true);
          console.log(sb);
          setTitle(name);
        }}
      />

      {/* </MapContainer> */}
    </>
  );
}

export default App;

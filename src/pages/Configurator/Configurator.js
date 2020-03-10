import React from "react";
import "./Configurator.css";

import Stage from "./Stage.js";
import ControlPanel from "./ControlPanel.js";

function Configurator() {
  return (
    <section className="configurator">
      <Stage />
      <ControlPanel />
    </section>
  );
}

export default Configurator;

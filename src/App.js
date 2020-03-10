import React from "react";
import "./App.css";

import Header from "./layout/Header.js";
import Configurator from "./pages/Configurator/Configurator.js";

function App() {
  return (
    <div id="top">
      <Header />
      <Configurator />
    </div>
  );
}

export default App;

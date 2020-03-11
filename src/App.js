import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Header from "./layout/Header.js";
import Configurator from "./pages/Configurator/Configurator.js";

function App() {
  return (
    <Router>
      <div id="top">
        <Header />

        <Switch>
          <Route path="/3d-configurator">
            <Configurator />
          </Route>

          <Route path="/">
            <h1>Home</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

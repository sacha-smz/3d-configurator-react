import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "destyle.css";
import "./App.css";

import Header from "./layout/Header";
import Configurator from "./pages/Configurator/Configurator";

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
            <h1 id="home-header">Configurateur 3D</h1>
            <p>SandBox pour la mise en pratique des apprentissages sur la MERN stack</p>
            <p>
              <a id="cta" href="/3d-configurator">
                Essayez-maintenant
              </a>
            </p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

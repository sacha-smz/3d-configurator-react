import React, { useEffect, useState } from "react";

import Scene from "./utils/Scene.js";

import "./Configurator.css";

import Stage from "./Stage.js";
import ControlPanel from "./ControlPanel.js";

const scene = new Scene();

function Configurator() {
  const [rendererSize, setRendererSize] = useState({
    width: 0,
    height: 0
  });

  // tableau vide en second argument -> 1 seule exécution, au montage du composant
  useEffect(() => {
    const container = document.querySelector("div.configurator__stage");
    scene.addToDom(container);

    const updateRendererSize = () => {
      const canvasWidth = 0.9 * container.clientWidth;
      const offset = container.clientWidth - canvasWidth;
      setRendererSize({
        width: canvasWidth,
        height: container.clientHeight - offset
      });
    };

    updateRendererSize();
    ["resize", "orientationchange"].forEach(event => {
      window.addEventListener(event, updateRendererSize);
    });
    return () => {
      ["resize", "orientationchange"].forEach(event => {
        window.removeEventListener(event, updateRendererSize);
      });
    };
  }, []);

  useEffect(() => {
    scene.updateSize(rendererSize.width, rendererSize.height);
  }, [rendererSize.width, rendererSize.height]);

  return (
    <section className="configurator">
      <Stage />
      <ControlPanel onChangeColor={scene.changeObjectColor} />
    </section>
  );
}

export default Configurator;
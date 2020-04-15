import React, { useState, useEffect } from "react";
import httpClient from "axios";

import Scene from "./utils/Scene";

import "./Configurator.css";

import Stage from "./Stage";
import ModelGallery from "./ModelGallery";
import ModelDetails from "./ModelDetails";

const scene = new Scene();
const modelsPath = process.env.REACT_APP_API_URL + "api/models";

function Configurator() {
  const [models, setModels] = useState([]);

  const [currentModel, setCurrentModel] = useState(null);

  const [rendererSize, setRendererSize] = useState({
    width: 0,
    height: 0
  });

  // tableau vide en second argument -> 1 seule exécution, au montage du composant
  useEffect(() => {
    httpClient
      .get(modelsPath)
      .then(res => {
        setModels(res.data);
      })
      .catch(error => error);
  }, []);

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

  const useCurrentModel = modelName => {
    setCurrentModel(modelName);
    scene.loadModel(modelName);
  };

  return (
    <section className="configurator">
      <Stage />
      <ModelGallery onButtonClick={useCurrentModel} models={models} modelsPath={modelsPath} />
      <ModelDetails onTextureChange={scene.applyTexture} model={models.find(model => model.ref === currentModel)} />
    </section>
  );
}

export default Configurator;

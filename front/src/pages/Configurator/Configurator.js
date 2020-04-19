import React, { useState, useEffect } from "react";
import httpClient from "axios";

import Scene from "./utils/Scene";
import Selector from "./utils/Selector";

import "./Configurator.css";

import Stage from "./Stage";
import ModelGallery from "./ModelGallery";
import ModelDetails from "./ModelDetails";

const modelsPath = process.env.REACT_APP_API_URL + "api/models";
const scene = new Scene();

function Configurator() {
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState(null);

  useEffect(() => {
    httpClient
      .get(modelsPath)
      .then(res => {
        setModels(res.data);
        scene.init();
        const selector = new Selector(scene);
        selector.init();
      })
      .catch(error => error);
  }, []);

  const useCurrentModel = modelName => {
    setCurrentModel(modelName);
    scene.loadModel(modelName);
  };

  return (
    <section className="configurator">
      <Stage scene={scene}></Stage>
      <ModelGallery onModelChange={useCurrentModel} models={models} modelsPath={modelsPath} />
      <ModelDetails
        onTextureChange={scene.currentModel.applyTexture}
        model={models.find(model => model.ref === currentModel)}
      />
    </section>
  );
}

export default Configurator;

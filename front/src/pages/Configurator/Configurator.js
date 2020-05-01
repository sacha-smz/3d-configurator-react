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
const selector = new Selector(scene);

function Configurator() {
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState(null);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    httpClient
      .get(modelsPath)
      .then(res => {
        setModels(res.data);
      })
      .catch(error => error);
  }, []);

  const selectedMaterials = () =>
    scene.currentModel.selectedMaterials
      .map(material => material.name.replace("part_", ""))
      .sort()
      .reverse();

  const useCurrentModel = modelName => {
    setCurrentModel(modelName);
    scene.loadModel(modelName).then(() => {
      setSelection(selectedMaterials);
    });
  };

  const updateSelection = () => {
    selector.onMouseUp();
    setSelection(selectedMaterials);
  };

  return (
    <section className="configurator">
      <Stage scene={scene} selector={selector} updateSelection={updateSelection}></Stage>
      <ModelGallery onModelChange={useCurrentModel} models={models} modelsPath={modelsPath} />
      <ModelDetails
        onTextureChange={scene.currentModel.applyTexture}
        model={models.find(model => model.ref === currentModel)}
        selection={selection}
      />
    </section>
  );
}

export default Configurator;

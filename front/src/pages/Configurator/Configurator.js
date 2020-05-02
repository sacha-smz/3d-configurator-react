import React, { useState, useEffect } from "react";
import httpClient from "axios";

import Scene from "./utils/Scene";
import Selector from "./utils/Selector";

import { MODEL_PATH, PART_RANK } from "../../constants/SceneConstants";

import "./Configurator.css";

import Stage from "./Stage";
import ModelGallery from "./ModelGallery";
import ModelDetails from "./ModelDetails";

const scene = new Scene();
const selector = new Selector(scene);

function Configurator() {
  const [models, setModels] = useState([]);
  const [currentModel, setCurrentModel] = useState(null);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    httpClient
      .get(MODEL_PATH)
      .then(res => {
        setModels(res.data);
      })
      .catch(error => error);
  }, []);

  const selectedMaterials = () =>
    scene.currentModel.selectedMaterials
      .map(material => material.name.replace("part_", ""))
      .sort((a, b) => PART_RANK[a] - PART_RANK[b]);

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
      <ModelGallery onModelChange={useCurrentModel} models={models} />
      <ModelDetails
        onTextureChange={scene.currentModel.applyTexture}
        model={models.find(model => model.ref === currentModel)}
        selection={selection}
      />
    </section>
  );
}

export default Configurator;

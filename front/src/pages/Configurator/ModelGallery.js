import React, { useState, useEffect } from "react";
import httpClient from "axios";

const modelsPath = process.env.REACT_APP_API_URL + "models";

function ModelGallery() {
  const [modelList, setModelList] = useState([]);

  useEffect(() => {
    httpClient
      .get(modelsPath)
      .then(res => {
        setModelList(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="configurator__model-gallery">
      {modelList.map(modelName => (
        <button key={modelName}>
          <img src={`${modelsPath}/${modelName}/${modelName}.png`} alt={`Modèle ${modelName}`}></img>
        </button>
      ))}
    </div>
  );
}

export default ModelGallery;

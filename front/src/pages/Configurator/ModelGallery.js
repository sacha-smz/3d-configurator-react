import React, { useState, useEffect } from "react";
import httpClient from "axios";

import Round from "../../components/Round";

const modelsPath = process.env.REACT_APP_API_URL + "models";

function ModelGallery(props) {
  const [modelList, setModelList] = useState([]);

  useEffect(() => {
    httpClient
      .get(modelsPath)
      .then(res => {
        setModelList(res.data);
      })
      .catch(error => error);
  }, []);

  return (
    <div className="configurator__model-gallery">
      {modelList.map(modelName => {
        const modelRadio = (
          <input type="radio" name="model" id={`radio-${modelName}`} onChange={() => props.onButtonClick(modelName)} />
        );
        return (
          <Round key={modelName} type="label" htmlFor={`radio-${modelName}`} before={modelRadio}>
            <img src={`${modelsPath}/${modelName}/${modelName}.png`} alt={`Modèle ${modelName}`}></img>
          </Round>
        );
      })}
    </div>
  );
}

export default ModelGallery;

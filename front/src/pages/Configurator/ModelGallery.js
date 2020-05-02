import React from "react";

import Round from "../../components/Round";

import { MODEL_PATH } from "../../constants/SceneConstants";

import "./ModelGallery.css";

function ModelGallery(props) {
  const { models, onModelChange } = props;

  return (
    <div className="model-gallery">
      {models.map(model => {
        const modelRadio = (
          <input type="radio" name="model" id={`radio-${model.ref}`} onChange={() => onModelChange(model.ref)} />
        );
        return (
          <Round key={model._id} type="label" htmlFor={`radio-${model.ref}`} before={modelRadio}>
            <img src={`${MODEL_PATH}${model.ref}/${model.ref}.png`} alt={`Modèle ${model.name}`}></img>
          </Round>
        );
      })}
    </div>
  );
}

export default ModelGallery;

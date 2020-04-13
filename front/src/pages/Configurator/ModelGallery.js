import React from "react";

import Round from "../../components/Round";

function ModelGallery(props) {
  const { models, modelsPath } = props;

  return (
    <div className="configurator__model-gallery">
      {models.map(model => {
        const modelRadio = (
          <input type="radio" name="model" id={`radio-${model.ref}`} onChange={() => props.onButtonClick(model.ref)} />
        );
        return (
          <Round key={model._id} type="label" htmlFor={`radio-${model.ref}`} before={modelRadio}>
            <img src={`${modelsPath}/${model.ref}/${model.ref}.png`} alt={`Modèle ${model.name}`}></img>
          </Round>
        );
      })}
    </div>
  );
}

export default ModelGallery;

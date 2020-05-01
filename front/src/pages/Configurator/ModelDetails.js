import React from "react";

import "./ModelDetails.css";

function ModelDetails(props) {
  const { model, onTextureChange, selection } = props;

  return (
    <article className="model-details">
      {model && (
        <>
          <h2>{model.name}</h2>

          <div className="model-details__price">{model.price.toFixed(2)} €</div>

          <div className="model-details__parts">
            {selection.map(part => (
              <span key={part}>{part}</span>
            ))}
          </div>

          <div className="model-details__texture-thumbs">
            {model.textures.map(texture => (
              <React.Fragment key={texture._id}>
                <input
                  type="radio"
                  name="texture"
                  id={`texture-${texture.ref}`}
                  defaultValue={`texture-${texture.ref}`}
                  onChange={() => onTextureChange(texture.ref)}
                />
                <label htmlFor={`texture-${texture.ref}`} className="model-details__texture-thumb">
                  <img
                    src={process.env.REACT_APP_API_URL + `api/textures/${texture.ref}-thmb.png`}
                    alt={`Coloris ${texture.name}`}
                    title={texture.name}
                  />
                </label>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </article>
  );
}

export default ModelDetails;

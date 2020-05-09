import React from "react";

import "./ModelDetails.css";

function ModelDetails(props) {
  const { model, onTextureChange, onLensChange, selection, selectedLens } = props;

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
                <input type="radio" name="texture" id={`texture-${texture.ref}`} />
                <label htmlFor={`texture-${texture.ref}`} className="model-details__texture-thumb">
                  <img
                    src={process.env.REACT_APP_API_URL + `api/textures/${texture.ref}-thmb.png`}
                    alt={`Coloris ${texture.name}`}
                    title={texture.name}
                    onClick={() => onTextureChange(texture.ref)}
                  />
                </label>
              </React.Fragment>
            ))}
          </div>

          <div className="model-details__parts">
            <span>Verres</span>
          </div>

          <div className="model-details__texture-thumbs">
            <input type="radio" name="lens" id="lens-blanc" value="blanc" checked={selectedLens === "blanc"} readOnly />
            <label htmlFor="lens-blanc" className="model-details__texture-thumb">
              <img
                src={process.env.REACT_APP_API_URL + `api/lenses/blanc-thmb.png`}
                alt="Coloris Blanc"
                title="Blanc"
                onClick={() => onLensChange("blanc")}
              />
            </label>
            {model.lenses.map(lens => (
              <React.Fragment key={lens._id}>
                <input
                  type="radio"
                  name="lens"
                  id={`lens-${lens.ref}`}
                  value={lens.ref}
                  checked={selectedLens === lens.ref}
                  readOnly
                />
                <label htmlFor={`lens-${lens.ref}`} className="model-details__texture-thumb">
                  <img
                    src={process.env.REACT_APP_API_URL + `api/lenses/${lens.ref}-thmb.png`}
                    alt={`Coloris ${lens.name}`}
                    title={lens.name}
                    onClick={() => onLensChange(lens.ref)}
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

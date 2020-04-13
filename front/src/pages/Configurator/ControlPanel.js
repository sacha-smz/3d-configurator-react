import React from "react";

function ControlPanel(props) {
  const { model } = props;

  return (
    <div className="configurator__control-panel">
      {model && (
        <>
          <h2>Modèle : {model.name}</h2>
          <div>{model.price} €</div>
          {model.textures.map(texture => (
            <React.Fragment key={texture._id}>
              <label htmlFor={`texture-${texture.ref}`}>
                <img
                  src={process.env.REACT_APP_API_URL + `api/textures/${texture.ref}-thmb.png`}
                  alt={`Coloris ${texture.name}`}
                  title={texture.name}
                />
              </label>
              <input type="radio" name="texture" id={`texture-${texture.ref}`} />
            </React.Fragment>
          ))}

          <button onClick={props.onColorButtonClick}>
            <span>Couleur</span>
          </button>
        </>
      )}
    </div>
  );
}

export default ControlPanel;

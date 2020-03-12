import React from "react";

function ControlPanel(props) {
  return (
    <div className="configurator__control-panel">
      <button onClick={props.onChangeColor}>
        <span>Couleur</span>
      </button>
    </div>
  );
}

export default ControlPanel;

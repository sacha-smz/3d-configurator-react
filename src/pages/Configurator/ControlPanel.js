import React from "react";

function ControlPanel(props) {
  return (
    <div className="configurator__control-panel">
      <button onClick={props.onChangeColor}>Couleur</button>
    </div>
  );
}

export default ControlPanel;

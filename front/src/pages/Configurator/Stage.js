import React, { useState, useEffect, useRef } from "react";

import "./Stage.css";

function Stage(props) {
  const { scene, selector, updateSelection } = props;

  const [rendererSize, setRendererSize] = useState({
    width: 0,
    height: 0
  });

  const [additive, setAdditive] = useState(false);

  const stageContainer = useRef(null);
  const rendererDomElement = useRef(null);
  const additiveBtn = useRef(null);

  useEffect(() => {
    const container = stageContainer.current;

    const updateRendererSize = () => {
      const canvasWidth = 0.9 * container.clientWidth;
      const offset = container.clientWidth - canvasWidth;
      setRendererSize({
        width: canvasWidth,
        height: container.clientHeight - offset
      });
    };

    updateRendererSize();

    ["resize", "orientationchange"].forEach(event => {
      window.addEventListener(event, updateRendererSize);
    });

    return () => {
      ["resize", "orientationchange"].forEach(event => {
        window.removeEventListener(event, updateRendererSize);
      });
    };
  }, []);

  useEffect(() => {
    scene.init(rendererDomElement.current);
  }, [scene]);

  useEffect(() => {
    const onKeyEvent = evt => {
      if (evt.code === "ControlLeft" && !evt.repeat) {
        setAdditive(!additive);
        selector.toggleAdditive();
      }
    };

    ["keydown", "keyup"].forEach(event => {
      document.addEventListener(event, onKeyEvent);
    });

    return () => {
      ["keydown", "keyup"].forEach(event => {
        document.removeEventListener(event, onKeyEvent);
      });
    };
  }, [additive, selector]);

  useEffect(() => {
    scene.updateSize(rendererSize.width, rendererSize.height);
  }, [scene, rendererSize.width, rendererSize.height]);

  const toggleAdditive = () => {
    setAdditive(!additive);
    selector.toggleAdditive();
  };

  return (
    <div className="stage" ref={stageContainer}>
      <canvas
        ref={rendererDomElement}
        onMouseDown={selector.onMouseDown}
        onMouseMove={selector.onMouseMove}
        onMouseUp={updateSelection}
      ></canvas>
      <button
        type="button"
        className={`stage__additive-select${additive ? " stage__additive-select--active" : ""}`}
        onClick={toggleAdditive}
        ref={additiveBtn}
      >
        &#65291;
      </button>
    </div>
  );
}

export default Stage;

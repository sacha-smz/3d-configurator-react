import React, { useState, useEffect, useRef } from "react";

import "./Stage.css";

function Stage(props) {
  const { scene, toggleAdditive } = props;

  const [rendererSize, setRendererSize] = useState({
    width: 0,
    height: 0
  });

  const stageContainer = useRef(null);
  const additiveBtn = useRef(null);

  useEffect(() => {
    const container = stageContainer.current;
    scene.addToDom(container);

    const updateRendererSize = () => {
      const canvasWidth = 0.9 * container.clientWidth;
      const offset = container.clientWidth - canvasWidth;
      setRendererSize({
        width: canvasWidth,
        height: container.clientHeight - offset
      });
    };

    const onKeyEvent = evt => {
      if (evt.code === "ControlLeft" && !evt.repeat) {
        additiveBtn.current.classList.toggle("stage__additive-select--active");
        toggleAdditive();
      }
    };

    updateRendererSize();
    ["resize", "orientationchange"].forEach(event => {
      window.addEventListener(event, updateRendererSize);
    });

    ["keydown", "keyup"].forEach(event => {
      document.addEventListener(event, onKeyEvent);
    });

    return () => {
      ["resize", "orientationchange"].forEach(event => {
        window.removeEventListener(event, updateRendererSize);
      });

      ["keydown", "keyup"].forEach(event => {
        document.removeEventListener(event, onKeyEvent);
      });
    };
  }, [scene, toggleAdditive]);

  useEffect(() => {
    scene.updateSize(rendererSize.width, rendererSize.height);
  }, [scene, rendererSize.width, rendererSize.height]);

  const onAdditiveBtnClick = () => {
    additiveBtn.current.classList.toggle("stage__additive-select--active");
    toggleAdditive();
  };

  return (
    <div className="stage" ref={stageContainer}>
      <button type="button" className="stage__additive-select" onClick={onAdditiveBtnClick} ref={additiveBtn}>
        &#65291;
      </button>
    </div>
  );
}

export default Stage;

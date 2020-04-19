import React, { useState, useEffect, useRef } from "react";

function Stage(props) {
  const { scene } = props;

  const [rendererSize, setRendererSize] = useState({
    width: 0,
    height: 0
  });

  const stageContainer = useRef(null);

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

    updateRendererSize();
    ["resize", "orientationchange"].forEach(event => {
      window.addEventListener(event, updateRendererSize);
    });
    return () => {
      ["resize", "orientationchange"].forEach(event => {
        window.removeEventListener(event, updateRendererSize);
      });
    };
  }, [scene]);

  useEffect(() => {
    scene.updateSize(rendererSize.width, rendererSize.height);
  }, [scene, rendererSize.width, rendererSize.height]);

  return <div className="configurator__stage" ref={stageContainer}></div>;
}

export default Stage;

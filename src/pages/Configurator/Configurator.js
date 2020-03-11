import React, { useEffect, useLayoutEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import "./Configurator.css";

import Stage from "./Stage.js";
import ControlPanel from "./ControlPanel.js";

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const camera = new THREE.PerspectiveCamera(20, 1, 1, 8000);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhysicalMaterial({ color: 0xccd6ff });
const cube = new THREE.Mesh(geometry, material);

function Configurator() {
  const [rendererSize, setRendererSize] = useState({
    width: 0,
    height: 0
  });

  // tableau vide en second argument -> 1 seule exécution, au montage du composant
  useEffect(() => {
    const white = new THREE.Color(0xffffff);

    const scene = new THREE.Scene();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(renderer.width, renderer.height);
    renderer.setClearColor(white);

    const container = document.getElementById("3d-scene");
    container.appendChild(renderer.domElement);

    const spotIntensity = 0.4;
    const ambientIntensity = 0.35;
    const spotHeight = 0.6;
    const spots = [];

    const ambientLight = new THREE.AmbientLight(white, ambientIntensity);
    scene.add(ambientLight);

    const spot1 = new THREE.DirectionalLight(white, spotIntensity);
    spot1.position.set(1, spotHeight, 1);
    spots.push(spot1);

    const spot2 = new THREE.DirectionalLight(white, spotIntensity);
    spot2.position.set(-1, spotHeight, 1);
    spots.push(spot2);

    const spot3 = new THREE.DirectionalLight(white, spotIntensity);
    spot3.position.set(-1, spotHeight, -1);
    spots.push(spot3);

    const spot4 = new THREE.DirectionalLight(white, spotIntensity);
    spot4.position.set(1, spotHeight, -1);
    spots.push(spot4);

    const spotParent = new THREE.Object3D();
    spots.forEach(spot => {
      spotParent.add(spot);
    });

    const pointIntensity = 0.575;
    const pointLight = new THREE.PointLight(0xfff1e0, pointIntensity, 180, 2);
    pointLight.position.set(0, 33, 100);
    pointLight.shadow.mapSize.x = 1024;
    pointLight.shadow.mapSize.y = 1024;
    spotParent.add(pointLight);

    const startSpotRy = Math.PI / 5;
    spotParent.rotation.y = startSpotRy;
    scene.add(spotParent);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 200;
    controls.maxDistance = 1200;
    controls.rotateSpeed = 0.8;
    controls.autoRotateSpeed = 6;
    controls.enablePan = false;
    controls.target = new THREE.Vector3(0, 0, 0);

    cube.scale.set(20, 20, 20);
    scene.add(cube);

    camera.position.x = 0;
    camera.position.y = 10;
    camera.position.z = 500;

    const renderScene = () => {
      requestAnimationFrame(renderScene);
      controls.update();
      renderer.render(scene, camera);
    };

    renderScene();

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

  useLayoutEffect(() => {
    camera.aspect = rendererSize.width / rendererSize.height;
    camera.updateProjectionMatrix();
    renderer.setSize(rendererSize.width, rendererSize.height);
  }, [rendererSize.width, rendererSize.height]);

  const changeCubeColor = () => {
    const cubeColor = cube.material.color;
    let offset = 0;
    while (offset < 0.15) {
      offset = Math.random();
    }
    cube.material.color.set(cubeColor.offsetHSL(offset, 0, 0));
  };

  return (
    <section className="configurator">
      <Stage />
      <ControlPanel onChangeColor={changeCubeColor} />
    </section>
  );
}

export default Configurator;

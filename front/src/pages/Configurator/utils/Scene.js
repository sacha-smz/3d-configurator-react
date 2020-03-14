import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

const modelsPath = process.env.REACT_APP_API_URL + "models/";

export default class Scene {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.camera = new THREE.PerspectiveCamera(20, 1, 1, 8000);
    this.instance = new THREE.Scene();
    this.loader = new FBXLoader();
    this.models = new THREE.Object3D();
    this.spots = new THREE.Object3D();
    this.currentModelId = -1;
    this.add(this.models);

    this.setup();
  }

  add(object) {
    this.instance.add(object);
  }

  addToDom(container) {
    container.appendChild(this.renderer.domElement);
  }

  changeModelColor = () => {
    if (this.currentModelId === -1) {
      return;
    }

    const group = this.models.children[this.currentModelId];

    group.traverse(child => {
      if (child.isMesh) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];

        materials.forEach(material => {
          material.color.setHSL(Math.random(), 0.6, 0.8);
        });
      }
    });
  };

  loadModel = modelName => {
    const models = this.models.children;
    const modelsCount = models.length;

    let newModel = true;
    for (let i = 0; i < modelsCount; i++) {
      if (models[i].name === modelName) {
        models[i].visible = true;
        this.currentModelId = i;
        newModel = false;
      } else {
        models[i].visible = false;
      }
    }
    if (newModel) {
      this.loader.load(modelsPath + modelName + "/001.fbx", object => {
        object.name = modelName;
        this.currentModelId = modelsCount;
        this.models.add(object);
      });
    }
  };

  updateSize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  setup() {
    const white = new THREE.Color(0xffffff);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xf0efef);

    const spotIntensity = 0.1;
    const ambientIntensity = 0.6;
    const spotHeight = 0.8;
    const spots = [];

    const ambientLight = new THREE.AmbientLight(white, ambientIntensity);
    this.add(ambientLight);

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

    spots.forEach(spot => {
      this.spots.add(spot);
    });

    const pointIntensity = 0.575;
    const pointLight = new THREE.PointLight(0xfff1e0, pointIntensity, 180, 2);
    pointLight.position.set(0, 33, 100);
    pointLight.shadow.mapSize.x = 1024;
    pointLight.shadow.mapSize.y = 1024;
    this.spots.add(pointLight);

    const startSpotRy = Math.PI / 5;
    this.spots.rotation.y = startSpotRy;
    this.add(this.spots);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.minDistance = 200;
    controls.maxDistance = 1200;
    controls.rotateSpeed = 0.8;
    controls.autoRotateSpeed = 6;
    controls.enablePan = false;
    controls.target = new THREE.Vector3(0, 0, -50);

    this.camera.position.x = 0;
    this.camera.position.y = 10;
    this.camera.position.z = 500;

    const renderScene = () => {
      requestAnimationFrame(renderScene);
      controls.update();
      this.renderer.render(this.instance, this.camera);
    };

    renderScene();
  }
}

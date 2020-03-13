import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Scene {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.camera = new THREE.PerspectiveCamera(20, 1, 1, 8000);
    this.instance = new THREE.Scene();
    this.objects = new THREE.Object3D();
    this.add(this.objects);

    this.setup();
  }

  add(object) {
    this.instance.add(object);
  }

  addToDom(container) {
    container.appendChild(this.renderer.domElement);
  }

  changeObjectColor = () => {
    const object = this.objects.children[0];
    const objectColor = object.material.color;
    let offset = 0;
    while (offset < 0.2) {
      offset = Math.random();
    }
    objectColor.set(objectColor.offsetHSL(offset, 0, 0));
  };

  updateSize(width, height) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  setup() {
    const white = new THREE.Color(0xffffff);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(white);

    const spotIntensity = 0.4;
    const ambientIntensity = 0.35;
    const spotHeight = 0.6;
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
    this.add(spotParent);

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.minDistance = 200;
    controls.maxDistance = 1200;
    controls.rotateSpeed = 0.8;
    controls.autoRotateSpeed = 6;
    controls.enablePan = false;
    controls.target = new THREE.Vector3(0, 0, 0);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhysicalMaterial({ color: 0xccd6ff });
    const cube = new THREE.Mesh(geometry, material);
    cube.scale.set(20, 20, 20);
    this.objects.add(cube);

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

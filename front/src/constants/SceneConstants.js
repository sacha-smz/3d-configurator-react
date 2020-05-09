import * as THREE from "three";

export const DEFAULT_OPACITY = 1;
export const INTERSECT_OPACITY = 0.92;
export const SELECT_OPACITY = 0.8;

export const DEFAULT_EMISSIVE = new THREE.Color(0xcccccc);
export const DEFAULT_EMISSIVE_INTENSITY = 0;
export const INTERSECT_EMISSIVE_INTENSITY = 0.125;

export const DEFAULT_TEXTURE = "P629_1053";

export const PART_MATERIAL = new THREE.MeshPhysicalMaterial({
  transparent: true,
  opacity: DEFAULT_OPACITY,
  emissive: DEFAULT_EMISSIVE,
  emissiveIntensity: DEFAULT_EMISSIVE_INTENSITY,
  clearcoat: 1,
  reflectivity: 1,
  transparency: 0.02
});

export const VERRE_MATERIAL = new THREE.MeshPhysicalMaterial({
  transparent: true,
  opacity: DEFAULT_OPACITY,
  clearcoat: 1,
  reflectivity: 1,
  transparency: 0.7
});

export const METAL_MATERIAL = new THREE.MeshStandardMaterial({
  metalness: 0.95,
  roughness: 0.08,
  color: new THREE.Color(0xd6d6d6)
});

export const DISPLAY_MATERIAL = new THREE.MeshBasicMaterial({ transparent: true });

export const TEXTURE_PATH = process.env.REACT_APP_API_URL + "api/textures/";
export const LENS_PATH = process.env.REACT_APP_API_URL + "api/lenses/";
export const ENV_MAP_PATH = process.env.REACT_APP_API_URL + "api/envmap/";
export const MODEL_PATH = process.env.REACT_APP_API_URL + "api/models/";

export const PART_RANK = {
  face: 0,
  branches: 1
};

import * as THREE from "three";

import { DEFAULT_EMISSIVE, DEFAULT_OPACITY } from "../../../constants/SceneConstants";

const texturesPath = process.env.REACT_APP_API_URL + "api/textures/";

export default class Model {
  constructor() {
    this.object = null;
    this.textureLoader = new THREE.TextureLoader();
    this.textures = {};
    this.selectedMaterials = [];
  }

  setObject(object) {
    this.object = object;

    if (!this.object.hasOwnProperty("customizableParts")) {
      this.object.customizableParts = [];
      this.object.customizableMaterials = [];

      this.object.children.forEach(object => {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        const customizableMaterials = materials.filter(material => material.name.includes("part"));
        for (const material of customizableMaterials) {
          material.transparent = 1;
          material.opacity = DEFAULT_OPACITY;
          material.emissive = DEFAULT_EMISSIVE;
        }
        if (customizableMaterials.length) {
          this.object.customizableParts.push(object);
          this.object.customizableMaterials.push(...customizableMaterials);
        }
      });
    }

    this.selectedMaterials = [...this.object.customizableMaterials];
  }

  applyTexture = ref => {
    if (this.object === null) {
      return;
    }

    this.selectedMaterials.forEach(material => {
      this.getTexture(ref)
        .then(texture => {
          material.map = texture;
          material.needsUpdate = true;
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  getTexture(ref) {
    return new Promise((resolve, reject) => {
      if (ref in this.textures) {
        return resolve(this.textures[ref]);
      }

      this.textureLoader.load(
        texturesPath + ref + ".png",
        texture => {
          this.textures[ref] = texture;
          resolve(this.textures[ref]);
        },
        undefined,
        err => {
          reject(err);
        }
      );
    });
  }
}

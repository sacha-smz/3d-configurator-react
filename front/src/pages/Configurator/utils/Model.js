import * as THREE from "three";

import {
  TEXTURE_PATH,
  LENS_PATH,
  ENV_MAP_PATH,
  PART_MATERIAL,
  VERRE_MATERIAL,
  METAL_MATERIAL,
  DISPLAY_MATERIAL,
  DEFAULT_TEXTURE
} from "../../../constants/SceneConstants";
import { MODEL_PATH } from "./../../../constants/SceneConstants";

export default class Model {
  constructor() {
    this.object = null;
    this.textureLoader = new THREE.TextureLoader();
    this.envMap = new THREE.CubeTextureLoader()
      .setPath(ENV_MAP_PATH)
      .load(["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]);
    this.textures = new Map();
    this.selectedMaterials = [];

    [PART_MATERIAL, VERRE_MATERIAL, METAL_MATERIAL].forEach(mtl => {
      mtl.setValues({ envMap: this.envMap });
    });
  }

  setObject = object => {
    this.object = object;

    if (!this.object.hasOwnProperty("customizableParts")) {
      this.object.customizableParts = [];
      this.object.customizableMaterials = [];
      this.object.lensMaterials = [];

      this.object.children.forEach(child => {
        this.setEachMaterial(child, this.getRightMaterial);
      });
    }

    this.selectedMaterials = [...this.object.customizableMaterials];
  };

  applyTexture = ref => {
    if (this.object === null) {
      return;
    }

    this.selectedMaterials.forEach(material => {
      this.updateMaterialMap(material, TEXTURE_PATH + ref + ".png");
    });
  };

  applyLens = ref => {
    if (this.object === null) {
      return;
    }
    this.object.currentLens = ref;
    this.object.lensMaterials.forEach(material => {
      if (ref === "blanc") {
        material.transparency = VERRE_MATERIAL.transparency;
        material.map = null;
        material.needsUpdate = true;
      } else {
        material.transparency = 0.075;
        this.updateMaterialMap(material, LENS_PATH + ref + ".png");
      }
    });
  };

  updateMaterialMap = (mtl, path) => {
    this.getTexture(path)
      .then(texture => {
        mtl.map = texture;
        mtl.needsUpdate = true;
      })
      .catch(err => {
        console.log(err);
      });
  };

  getTexture = path => {
    return new Promise((resolve, reject) => {
      if (this.textures.has(path)) {
        return resolve(this.textures.get(path));
      }

      this.textureLoader.load(
        path,
        texture => {
          this.textures.set(path, texture);
          resolve(this.textures.get(path));
        },
        undefined,
        err => {
          reject(err);
        }
      );
    });
  };

  setEachMaterial(object, setter) {
    if (Array.isArray(object.material)) {
      object.material.forEach((material, i) => {
        setter(object, material).then(mtl => {
          object.material[i] = mtl ?? material;
        });
      });
    } else {
      setter(object, object.material).then(mtl => {
        object.material = mtl ?? object.material;
      });
    }
  }

  getRightMaterial = (obj, material) => {
    return new Promise(resolve => {
      if (material.name.includes("part_")) {
        const mtl = PART_MATERIAL.clone();
        mtl.name = material.name;
        this.object.customizableParts.push(obj);
        this.object.customizableMaterials.push(mtl);
        this.getTexture(TEXTURE_PATH + DEFAULT_TEXTURE + ".png").then(texture => {
          mtl.map = texture;
          mtl.needsUpdate = true;
          resolve(mtl);
        });
      } else if (material.name.includes("verre_")) {
        obj.renderOrder = 999;
        const mtl = VERRE_MATERIAL.clone();
        mtl.name = material.name;
        this.object.lensMaterials.push(mtl);
        resolve(mtl);
      } else if (material.name === "metal") {
        resolve(METAL_MATERIAL);
      } else if (material.name === "plateau") {
        const mtl = DISPLAY_MATERIAL.clone();
        this.getTexture(MODEL_PATH + this.object.name + "/plateau.png").then(texture => {
          mtl.map = texture;
          mtl.needsUpdate = true;
          resolve(mtl);
        });
      } else {
        obj.visible = false;
      }
    });
  };
}

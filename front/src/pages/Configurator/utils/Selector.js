import * as THREE from "three";

import {
  DEFAULT_OPACITY,
  INTERSECT_OPACITY,
  SELECT_OPACITY,
  DEFAULT_EMISSIVE_INTENSITY,
  INTERSECT_EMISSIVE_INTENSITY
} from "../../../constants/SceneConstants";

export default class Selector {
  constructor(scene) {
    this.scene = scene;
    this.raycaster = new THREE.Raycaster();
    this.mousePosition = new THREE.Vector2();
    this.intersectedMaterial = null;
    this.clickedMaterial = null;
    this.add = false;
  }

  onMouseDown = () => {
    this.clickedMaterial = this.intersectedMaterial;
  };

  onMouseMove = event => {
    if (this.scene.currentModel.object) {
      const canvas = this.scene.renderer.domElement;
      const offset = canvas.getBoundingClientRect();

      this.mousePosition.x = (2 * (event.clientX - offset.left)) / canvas.offsetWidth - 1;
      this.mousePosition.y = (-2 * (event.clientY - offset.top)) / canvas.offsetHeight + 1;

      this.raycaster.setFromCamera(this.mousePosition, this.scene.camera);

      const intersects = this.raycaster.intersectObjects(this.scene.currentModel.object.customizableParts);
      let newIntersectedMaterial = null;
      if (intersects.length) {
        const intersectedObject = intersects[0].object;

        const materialIndex = intersects[0].face.materialIndex;
        newIntersectedMaterial = Array.isArray(intersectedObject)
          ? intersectedObject.material[materialIndex]
          : intersectedObject.material;
      }

      if (newIntersectedMaterial !== this.intersectedMaterial) {
        canvas.style.cursor = newIntersectedMaterial ? "pointer" : "auto";
        this.toggleHighlight(this.intersectedMaterial);
        this.toggleHighlight(newIntersectedMaterial);
        this.intersectedMaterial = newIntersectedMaterial;
      }
    }
  };

  onMouseUp = () => {
    if (this.clickedMaterial && this.clickedMaterial === this.intersectedMaterial) {
      this.selectMaterial(this.clickedMaterial, this.add);
    }
  };

  toggleAdditive = () => {
    this.add = !this.add;
  };

  toggleHighlight(material) {
    if (material) {
      if (!material.blinking) {
        material.opacity = material.opacity < DEFAULT_OPACITY ? DEFAULT_OPACITY : INTERSECT_OPACITY;
      }
      material.emissiveIntensity =
        material.emissiveIntensity === INTERSECT_EMISSIVE_INTENSITY
          ? DEFAULT_EMISSIVE_INTENSITY
          : INTERSECT_EMISSIVE_INTENSITY;
    }
  }

  selectMaterial(material, add) {
    if (add) {
      const materialIndex = this.scene.currentModel.selectedMaterials.indexOf(material);
      if (materialIndex === -1) {
        this.scene.currentModel.selectedMaterials.push(material);
      } else if (this.scene.currentModel.selectedMaterials.length > 1) {
        this.scene.currentModel.selectedMaterials.splice(materialIndex, 1);
      }
    } else {
      this.scene.currentModel.selectedMaterials = [material];
    }

    let delta = -0.09;
    const blinking = setInterval(() => {
      material.blinking = true;
      material.opacity += delta;
      if (1 - material.opacity < 0.001 || material.opacity - SELECT_OPACITY < 0.001) {
        delta *= -1;
      }
    }, 40);

    setTimeout(() => {
      clearInterval(blinking);
      material.opacity = material === this.intersectedMaterial ? INTERSECT_OPACITY : 1;
      material.blinking = false;
    }, 900);
  }
}

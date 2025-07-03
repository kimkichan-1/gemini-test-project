import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/FBXLoader.js';

export const object = (() => {
  class NatureObject {
    constructor(scene, params = {}) {
      this.scene_ = scene;
      this.models_ = [];
      this.LoadModels_(params);
    }

    LoadModels_(params) {
      const {
        scale = 0.05
      } = params;

      const loader = new FBXLoader();
      loader.setPath('./resources/Buildings pack - Aug 2017/FBX/');

      loader.load('House.fbx', (fbx) => {
        const model = fbx;

        model.scale.setScalar(scale);
        model.position.set(7, 0, 7);

        // ✅ TextureLoader 사용해서 텍스처 불러오기
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(
          './resources/Buildings pack - Aug 2017/Textures/HouseTexture1.png'
        );

        // ✅ 모델 내부 Mesh 순회하며 텍스처 적용
        model.traverse((c) => {
          if (c.isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;

            // 기존 material 대신 새로 만들기
            c.material = new THREE.MeshStandardMaterial({
              map: texture,
            });
          }
        });

        this.scene_.add(model);
        this.models_.push(model);
      });
    }

    Update(timeElapsed) {
      // 애니메이션 없음
    }
  }

  return {
    NPC: NatureObject,
  };
})();

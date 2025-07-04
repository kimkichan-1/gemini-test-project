// object.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/GLTFLoader.js';

export const object = (() => {
  class NatureObject {
    constructor(scene, params = {}) {
      this.scene_ = scene;
      this.models_ = [];
      this.boundingBoxes_ = [];
      this.LoadModels_();
    }

    LoadModels_() {
      const fbxLoader = new FBXLoader();
      fbxLoader.setPath('./resources/Buildings pack - Aug 2017/FBX/');

      const gltfLoader = new GLTFLoader();
      gltfLoader.setPath('./resources/Nature kit (2.1)/Models/GLTF format/');

      const textureLoader = new THREE.TextureLoader();

      const modelsToLoad = [
        // ✅ FBX 예시
        {
          type: 'fbx',
          filename: 'House2.fbx',
          texture: 'HouseTexture1.png',
          position: new THREE.Vector3(-33, 0, -33),
          scale: 0.06,
          rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(0), 0),
        },
        {
          type: 'fbx',
          filename: 'Hospital.fbx',
          texture: 'HouseTexture3.png',
          position: new THREE.Vector3(32, 0, -34),
          scale: 0.03,
          rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(0), 0), // Y축 180도 회전
        },
        {
          type: 'fbx',
          filename: 'Shop.fbx',
          texture: 'HouseTexture4.png',
          position: new THREE.Vector3(20, 0, -34),
          scale: 0.05,
          rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(0), 0), // Y축 -90도 회전
        },
        {
          type: 'fbx',
          filename: 'House3.fbx',
          texture: 'HouseTexture2.png',
          position: new THREE.Vector3(33, 0, 32.5),
          scale: 0.06,
          rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(-90), 0),
        },
        {
        type: 'glb',
        filename: 'path_stone.glb',
        position: new THREE.Vector3(-28.1, 0.1, 0.8),
        scale: 1.5,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(100), 0),
        },
        {
        type: 'glb',
        filename: 'path_stone.glb',
        position: new THREE.Vector3(-29.3, 0.1, -0.8),
        scale: 1.5,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(80), 0),
        },
        {
        type: 'glb',
        filename: 'path_stone.glb',
        position: new THREE.Vector3(-30.5, 0.1, 0.8),
        scale: 1.5,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(100), 0),
        },
        {
        type: 'glb',
        filename: 'path_stone.glb',
        position: new THREE.Vector3(-31.7, 0.1, -0.8),
        scale: 1.5,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(80), 0),
        },
        {
        type: 'glb',
        filename: 'path_stone.glb',
        position: new THREE.Vector3(-32.9, 0.1, 0.8),
        scale: 1.5,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(100), 0),
        },
        {
        type: 'glb',
        filename: 'path_stone.glb',
        position: new THREE.Vector3(-34.1, 0.1, -0.8),
        scale: 1.5,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(80), 0),
        },
        {
        type: 'glb',
        filename: 'path_stone.glb',
        position: new THREE.Vector3(-35.3, 0.1, 0.8),
        scale: 1.5,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(100), 0),
        },
        {
        type: 'glb',
        filename: 'path_stone.glb',
        position: new THREE.Vector3(-36.5, 0.1, -0.8),
        scale: 1.5,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(80), 0),
        },
        {
        type: 'glb',
        filename: 'tent_detailedOpen.glb',
        position: new THREE.Vector3(-31.8, 0.1, -8.5),
        scale: 8,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(150), 0),
        },
        {
        type: 'glb',
        filename: 'campfire_planks.glb',
        position: new THREE.Vector3(-34.5, 0.2, -4),
        scale: 4,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(100), 0),
        },
        {
        type: 'glb',
        filename: 'campfire_stones.glb',
        position: new THREE.Vector3(-34.4, 0.13, -3.9),
        scale: 4.8,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(100), 0),
        },
        {
        type: 'glb',
        filename: 'stump_roundDetailed.glb',
        position: new THREE.Vector3(-35, 0.13, 3.5),
        scale: 4.8,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(0), 0),
        },
        {
        type: 'glb',
        filename: 'log.glb',
        position: new THREE.Vector3(-30, 0.13, 6),
        scale: 6,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(-20), 0),
        },
        {
        type: 'glb',
        filename: 'log_stackLarge.glb',
        position: new THREE.Vector3(-34, 0.13, 11),
        scale: 5,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(90), 0),
        },
        {
        type: 'glb',
        filename: 'sign.glb',
        position: new THREE.Vector3(-29, 0.13, 11),
        scale: 5,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(40), 0),
        },
        {
        type: 'glb',
        filename: 'flower_redC.glb',
        position: new THREE.Vector3(-35, 0.13, 5.5),
        scale: 2,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(40), 0),
        },
        {
        type: 'glb',
        filename: 'flower_yellowC.glb',
        position: new THREE.Vector3(-35, 0.13, 6.5),
        scale: 2,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(40), 0),
        },
        {
        type: 'glb',
        filename: 'flower_purpleC.glb',
        position: new THREE.Vector3(-35, 0.13, 7.5),
        scale: 2,
        rotation: new THREE.Euler(0, THREE.MathUtils.degToRad(40), 0),
        },
      ];


      // Fence A: X축으로
      const fenceStartXA = -10.5;
      const fenceCountA = 14;
      const fenceSpacingA = 3.7;
      const fenceZ_A = -37.7;

      for (let i = 0; i < fenceCountA; i++) {
        modelsToLoad.push({
          type: 'glb',
          filename: 'fence_simple.glb',
          position: new THREE.Vector3(fenceStartXA + i * fenceSpacingA, 0, fenceZ_A),
          scale: 4.0,
          rotation: new THREE.Euler(0, 0, 0),
        });
      }

      // Fence B: Z축으로 수직 설치 (회전 포함)
      const fenceStartXB = -6.7;
      const fenceStartZB = -37.7;
      const fenceCountB = 3;
      const fenceSpacingB = 3.7;
      const fenceX_B = fenceStartXB + (fenceCountA - 1) * fenceSpacingA; // 끝점에 맞추기

      for (let i = 0; i < fenceCountB; i++) {
        modelsToLoad.push({
          type: 'glb',
          filename: 'fence_simple.glb',
          position: new THREE.Vector3(fenceX_B, 0, fenceStartZB + i * fenceSpacingB),
          scale: 4.0,
          rotation: new THREE.Euler(0, Math.PI / 2, 0), // Y축 90도 회전
        });
      }

      // Fence C: Z축으로 수직 설치 (회전 포함)
      const fenceStartXC = 34;
      const fenceStartZC = -11;
      const fenceCountC = 7;
      const fenceSpacingC = 3.7;
      const fenceX_C = fenceStartXC + (fenceCountB - 1) * fenceSpacingC; // 끝점에 맞추기

      for (let i = 0; i < fenceCountC; i++) {
        modelsToLoad.push({
          type: 'glb',
          filename: 'fence_simple.glb',
          position: new THREE.Vector3(fenceX_C, 0, fenceStartZC + i * fenceSpacingC),
          scale: 4.0,
          rotation: new THREE.Euler(0, Math.PI / 2, 0), // Y축 90도 회전
        });
      }

      // Fence D: Z축으로 수직 설치 (회전 포함)
      const fenceStartXD = 19.2;
      const fenceStartZD = 30.3;
      const fenceCountD = 3;
      const fenceSpacingD = 3.7;
      const fenceX_D = fenceStartXD + (fenceCountC - 1) * fenceSpacingD; // 끝점에 맞추기

      for (let i = 0; i < fenceCountD; i++) {
        modelsToLoad.push({
          type: 'glb',
          filename: 'fence_simple.glb',
          position: new THREE.Vector3(fenceX_D, 0, fenceStartZD + i * fenceSpacingD),
          scale: 4.0,
          rotation: new THREE.Euler(0, Math.PI / 2, 0), // Y축 90도 회전
        });
      }

      // Fence E: X축으로
      const fenceStartXE = 30;
      const fenceCountE = 3;
      const fenceSpacingE = 3.7;
      const fenceZ_E = 41.42;

      for (let i = 0; i < fenceCountE; i++) {
        modelsToLoad.push({
          type: 'glb',
          filename: 'fence_simple.glb',
          position: new THREE.Vector3(fenceStartXE + i * fenceSpacingE, 0, fenceZ_E),
          scale: 4.0,
          rotation: new THREE.Euler(0, 0, 0),
        });
      }

      // Fence F: X축으로
      const fenceStartXF = -11;
      const fenceCountF = 7;
      const fenceSpacingF = 3.7;
      const fenceZ_F = 41.42;

      for (let i = 0; i < fenceCountF; i++) {
        modelsToLoad.push({
          type: 'glb',
          filename: 'fence_simple.glb',
          position: new THREE.Vector3(fenceStartXF + i * fenceSpacingF, 0, fenceZ_F),
          scale: 4.0,
          rotation: new THREE.Euler(0, 0, 0),
        });
      }

      // Fence G: X축으로
      const fenceStartXG = -37.5;
      const fenceCountG = 3;
      const fenceSpacingG = 3.7;
      const fenceZ_G = 41.42;

      for (let i = 0; i < fenceCountG; i++) {
        modelsToLoad.push({
          type: 'glb',
          filename: 'fence_simple.glb',
          position: new THREE.Vector3(fenceStartXG + i * fenceSpacingG, 0, fenceZ_G),
          scale: 4.0,
          rotation: new THREE.Euler(0, 0, 0),
        });
      }

      // Fence H: Z축으로 수직 설치 (회전 포함)
      const fenceStartXH = -45;
      const fenceStartZH = 30.3;
      const fenceCountH = 3;
      const fenceSpacingH = 3.7;
      const fenceX_H = fenceStartXH + (fenceCountG - 1) * fenceSpacingH; // 끝점에 맞추기

      for (let i = 0; i < fenceCountH; i++) {
        modelsToLoad.push({
          type: 'glb',
          filename: 'fence_simple.glb',
          position: new THREE.Vector3(fenceX_H, 0, fenceStartZH + i * fenceSpacingH),
          scale: 4.0,
          rotation: new THREE.Euler(0, Math.PI / 2, 0), // Y축 90도 회전
        });
      }

      // Fence I: Z축으로 수직 설치 (회전 포함)
      const fenceStartXI = -45;
      const fenceStartZI = -11;
      const fenceCountI = 7;
      const fenceSpacingI = 3.7;
      const fenceX_I = fenceStartXI + (fenceCountH - 1) * fenceSpacingI; // 끝점에 맞추기

      for (let i = 0; i < fenceCountI; i++) {
        modelsToLoad.push({
          type: 'glb',
          filename: 'fence_simple.glb',
          position: new THREE.Vector3(fenceX_I, 0, fenceStartZI + i * fenceSpacingI),
          scale: 4.0,
          rotation: new THREE.Euler(0, Math.PI / 2, 0), // Y축 90도 회전
        });
      }

      // Fence J: Z축으로 수직 설치 (회전 포함)
      const fenceStartXJ = -60;
      const fenceStartZJ = -37.7;
      const fenceCountJ = 3;
      const fenceSpacingJ = 3.7;
      const fenceX_J = fenceStartXJ + (fenceCountI - 1) * fenceSpacingJ; // 끝점에 맞추기

      for (let i = 0; i < fenceCountJ; i++) {
        modelsToLoad.push({
          type: 'glb',
          filename: 'fence_simple.glb',
          position: new THREE.Vector3(fenceX_J, 0, fenceStartZJ + i * fenceSpacingJ),
          scale: 4.0,
          rotation: new THREE.Euler(0, Math.PI / 2, 0), // Y축 90도 회전
        });
      }

      // Fence K: X축으로
      const fenceStartXK = -37.9;
      const fenceCountK = 3;
      const fenceSpacingK = 3.7;
      const fenceZ_K = -37.7;

      for (let i = 0; i < fenceCountK; i++) {
        modelsToLoad.push({
          type: 'glb',
          filename: 'fence_simple.glb',
          position: new THREE.Vector3(fenceStartXK + i * fenceSpacingK, 0, fenceZ_K),
          scale: 4.0,
          rotation: new THREE.Euler(0, 0, 0),
        });
      }





      modelsToLoad.forEach((modelInfo) => {
        if (modelInfo.type === 'fbx') {
          fbxLoader.load(modelInfo.filename, (fbx) => {
            this.OnModelLoaded_(fbx, modelInfo, textureLoader);
          });
        } else if (modelInfo.type === 'glb') {
          gltfLoader.load(modelInfo.filename, (gltf) => {
            this.OnModelLoaded_(gltf.scene, modelInfo, textureLoader);
          });
        }
      });
    }

    OnModelLoaded_(model, modelInfo, textureLoader) {
      model.scale.setScalar(modelInfo.scale);
      model.position.copy(modelInfo.position);
      if (modelInfo.rotation) {
        model.rotation.copy(modelInfo.rotation);
      }

      if (modelInfo.texture) {
        const texture = textureLoader.load(
          `./resources/Buildings pack - Aug 2017/Textures/${modelInfo.texture}`
        );
        model.traverse((c) => {
          if (c.isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
            c.material = new THREE.MeshStandardMaterial({ map: texture });
          }
        });
      } else {
        // GLTF는 보통 머티리얼이 포함되어 있으므로 그림자만 설정
        model.traverse((c) => {
          if (c.isMesh) {
            c.castShadow = true;
            c.receiveShadow = true;
          }
        });
      }

      this.scene_.add(model);
      this.models_.push(model);

      const box = new THREE.Box3().setFromObject(model);
      this.boundingBoxes_.push(box);
    }

    Update(timeElapsed) {
      this.models_.forEach((model, i) => {
        this.boundingBoxes_[i].setFromObject(model);
      });
    }
  }

  return {
    NPC: NatureObject,
  };
})();

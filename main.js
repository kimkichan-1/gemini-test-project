import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js';
import { player } from './player.js';
import { object } from './object.js';
import { math } from './math.js';

// GameStage3 클래스: 게임의 주요 로직과 렌더링을 관리
class GameStage3 {
    // 생성자: 게임 초기화 및 렌더링 루프 시작
    constructor() {
        // 초기화 메서드 호출
        this.Initialize();
        // 렌더링 루프 시작
        this.RAF();
    }

    // 게임 초기 설정을 수행하는 메서드
    Initialize() {
        // WebGL 렌더러 생성 및 설정
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        // 디바이스 픽셀 비율 설정
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // 렌더러 크기를 창 크기에 맞춤
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // 그림자 맵 활성화
        this.renderer.shadowMap.enabled = true;
        // 부드러운 그림자를 위한 PCFSoftShadowMap 사용
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        // 색상 인코딩을 sRGB로 설정
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        // 감마 보정값 설정
        this.renderer.gammaFactor = 2.2;
        // 렌더러의 캔버스를 DOM에 추가
        document.getElementById('container').appendChild(this.renderer.domElement);

        // 카메라 설정: 시야각, 종횡비, 근거리, 원거리 클리핑 평면
        const fov = 60;
        const aspect = window.innerWidth / window.innerHeight;
        const near = 1.0;
        const far = 2000.0;
        this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        // 카메라 초기 위치 설정
        this.camera.position.set(-8, 6, 12);
        // 카메라가 (0, 2, 0)을 바라보도록 설정
        this.camera.lookAt(0, 2, 0);

        // 씬 객체 생성
        this.scene = new THREE.Scene();

        // 조명 설정
        this.SetupLighting();
        // 하늘과 안개 효과 설정
        this.SetupSkyAndFog();
        // 바닥 생성
        this.CreateGround();
        // 플레이어 및 NPC 생성
        this.CreatePlayer();

        // 창 크기 변경 이벤트 리스너 추가
        window.addEventListener('resize', () => this.OnWindowResize(), false);
    }

    // 조명을 설정하는 메서드
    SetupLighting() {
        // 방향성 조명 생성 (흰색, 강도 1.2)
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);
        // 조명 위치 설정
        directionalLight.position.set(60, 100, 10);
        // 조명 타겟 위치 설정
        directionalLight.target.position.set(0, 0, 0);
        // 그림자 생성 활성화
        directionalLight.castShadow = true;
        // 그림자 편향 설정 (아티팩트 방지)
        directionalLight.shadow.bias = -0.001;
        // 그림자 맵 크기 설정
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        // 그림자 카메라 설정
        directionalLight.shadow.camera.near = 1.0;
        directionalLight.shadow.camera.far = 200.0;
        directionalLight.shadow.camera.left = -50;
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 50;
        directionalLight.shadow.camera.bottom = -50;
        // 씬에 조명 추가
        this.scene.add(directionalLight);
        // 조명 타겟 추가
        this.scene.add(directionalLight.target);

        // 반구 조명 생성 (하늘색과 지면색, 강도 0.6)
        const hemisphereLight = new THREE.HemisphereLight(0x87CEEB, 0xF6F47F, 0.6);
        // 씬에 반구 조명 추가
        this.scene.add(hemisphereLight);
    }

    // 하늘과 안개 효과를 설정하는 메서드
    SetupSkyAndFog() {
        // 하늘 셰이더를 위한 유니폼 설정
        const skyUniforms = {
            topColor: { value: new THREE.Color(0x0077FF) }, // 하늘 상단 색상
            bottomColor: { value: new THREE.Color(0x89b2eb) }, // 하늘 하단 색상
            offset: { value: 33 }, // 색상 전환 오프셋
            exponent: { value: 0.6 } // 색상 전환 강도
        };

        // 하늘을 위한 구형 지오메트리 생성
        const skyGeometry = new THREE.SphereGeometry(1000, 32, 15);
        // 하늘 셰이더 재질 생성
        const skyMaterial = new THREE.ShaderMaterial({
            uniforms: skyUniforms,
            vertexShader: `
                varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }`, // 버텍스 셰이더: 월드 위치 계산
            fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 bottomColor;
                uniform float offset;
                uniform float exponent;
                varying vec3 vWorldPosition;
                void main() {
                    float h = normalize( vWorldPosition + offset ).y;
                    gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0), exponent ), 0.0 ) ), 1.0 );
                }`, // 프래그먼트 셰이더: 상단/하단 색상 혼합
            side: THREE.BackSide, // 뒷면 렌더링
        });

        // 하늘 메쉬 생성 및 씬에 추가
        const skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
        this.scene.add(skyMesh);
        // 안개 효과 추가 (지수 안개)
        this.scene.fog = new THREE.FogExp2(0x89b2eb, 0.002);
    }

    CreateGround() {
        // 텍스처 로더 생성
        const textureLoader = new THREE.TextureLoader();
        // 잔디 텍스처 로드
        const grassTexture = textureLoader.load('resources/Map.png'); // 잔디 텍스처 파일 경로

        // 텍스처 반복 설정 (타일링)
        grassTexture.wrapS = THREE.RepeatWrapping;
        grassTexture.wrapT = THREE.RepeatWrapping;
        grassTexture.repeat.set(2, 2); // 텍스처 반복 횟수 (필요에 따라 조정)

        // 평면 지오메트리 생성 (크기 200x200)
        const groundGeometry = new THREE.PlaneGeometry(80, 80, 10, 10);
        // 램버트 재질 생성 (텍스처 적용)
        const groundMaterial = new THREE.MeshLambertMaterial({
            map: grassTexture, // 텍스처 맵 적용
        });
        // 바닥 메쉬 생성
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        // 바닥을 X축으로 -90도 회전 (수평 배치)
        this.ground.rotation.x = -Math.PI / 2;
        // 바닥 Y 위치 설정
        this.ground.position.y = 0;
        // 그림자 수신 활성화
        this.ground.receiveShadow = true;
        // 씬에 바닥 추가
        this.scene.add(this.ground);
    }

    // 플레이어와 NPC를 생성하는 메서드
    CreatePlayer() {
        // 플레이어 생성 및 씬에 연결
        this.player_ = new player.Player({ scene: this.scene });

        // NPC 생성 (위치: 0, 0, -4)
        const npcPos = new THREE.Vector3(0, 0, -4);
        this.npc_ = new object.NPC(this.scene, npcPos);

        // 카메라 오프셋 설정 (플레이어 기준 상대 위치)
        this.cameraTargetOffset = new THREE.Vector3(0, 15, 10);
        // 초기 회전 각도 설정
        this.rotationAngle = 4.715;
    }

    // 카메라 위치와 방향을 업데이트하는 메서드
    UpdateCamera() {
        // 플레이어 또는 플레이어 메쉬가 없으면 종료
        if (!this.player_ || !this.player_.mesh_) return;

        // 플레이어 위치 복사
        const target = this.player_.mesh_.position.clone();
        // 카메라 오프셋 복사
        const offset = this.cameraTargetOffset.clone();
        // 회전 각도 적용
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotationAngle);
        // 카메라 목표 위치 계산
        const cameraPos = target.clone().add(offset);
        // 카메라 위치를 즉시 설정 (lerp 제거)
        this.camera.position.copy(cameraPos);
        // 머리 위치 계산 (y축 오프셋 추가)
        const headOffset = new THREE.Vector3(0, 2, 0); // 머리 높이 오프셋
        const headPosition = target.clone().add(headOffset);
        // 카메라가 플레이어의 머리 위를 바라보도록 설정
        this.camera.lookAt(headPosition);
    }

    // 창 크기 변경 이벤트를 처리하는 메서드
    OnWindowResize() {
        // 카메라 종횡비 업데이트
        this.camera.aspect = window.innerWidth / window.innerHeight;
        // 카메라 투영 행렬 업데이트
        this.camera.updateProjectionMatrix();
        // 렌더러 크기 업데이트
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // 렌더링 루프를 실행하는 메서드
    RAF(time) {
        // 다음 프레임 요청
        requestAnimationFrame((t) => this.RAF(t));
        // 이전 시간 초기화 또는 현재 시간 사용
        if (!this.prevTime) this.prevTime = time || performance.now();
        // 델타 시간 계산 (초 단위)
        const delta = ((time || performance.now()) - this.prevTime) * 0.001;
        // 이전 시간 업데이트
        this.prevTime = time || performance.now();

        // 플레이어 업데이트
        if (this.player_) {
            this.player_.Update(delta, this.rotationAngle);
            // 카메라 업데이트
            this.UpdateCamera();
        }

        // NPC 업데이트
        if (this.npc_) {
            this.npc_.Update(delta);
        }

        // 씬과 카메라로 렌더링
        this.renderer.render(this.scene, this.camera);
    }
}

// 게임 인스턴스 변수
let game = null;
// DOM 로드 완료 시 게임 시작
window.addEventListener('DOMContentLoaded', () => {
    game = new GameStage3();
});
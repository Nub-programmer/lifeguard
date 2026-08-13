import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SimulationState, ZoneId } from '../../types';
import { ZONE_LIST, NODE_A_POS, NODE_B_POS, ZONES } from '../../lib/zoneMath';

interface BuildingSceneProps {
  state: SimulationState;
  onSelectZone: (zoneId: ZoneId) => void;
  onSelectCoords?: (x: number, z: number) => void;
}

export const BuildingScene: React.FC<BuildingSceneProps> = ({
  state,
  onSelectZone,
  onSelectCoords
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  // Mesh refs for dynamic updates
  const targetMeshRef = useRef<THREE.Group | null>(null);
  const zoneMeshesRef = useRef<Record<string, THREE.Mesh>>({});
  const waveLinesRef = useRef<THREE.Line[]>([]);
  const waveGroupRef = useRef<THREE.Group | null>(null);
  const pulseRingsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a0e0c');
    scene.fog = new THREE.FogExp2('#0a0e0c', 0.025);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 16, 18);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // don't go below floor
    controls.minDistance = 5;
    controls.maxDistance = 40;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 5. Lights
    const ambientLight = new THREE.AmbientLight('#263d2e', 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight('#b8ff3d', 1.2);
    dirLight.position.set(10, 20, 15);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const bluePointLight = new THREE.PointLight('#5ce1e6', 2, 20);
    bluePointLight.position.set(-6, 4, -6);
    scene.add(bluePointLight);

    const greenPointLight = new THREE.PointLight('#66ff99', 2, 20);
    greenPointLight.position.set(6, 4, 6);
    scene.add(greenPointLight);

    // 6. Base Building Floor & Blueprint Grid
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.MeshStandardMaterial({
      color: '#0e1410',
      roughness: 0.8,
      metalness: 0.2,
      side: THREE.DoubleSide
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.01;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Blueprint grid
    const gridHelper = new THREE.GridHelper(16, 16, '#283c2e', '#19261d');
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Outer Building Foundation Walls
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#1a261f',
      transparent: true,
      opacity: 0.65,
      roughness: 0.4
    });

    // Create 3x3 Zone Floor Tiles & Interior Walls
    const zoneMeshes: Record<string, THREE.Mesh> = {};

    ZONE_LIST.forEach(zone => {
      const tileGeo = new THREE.PlaneGeometry(4.8, 4.8);
      const tileMat = new THREE.MeshStandardMaterial({
        color: '#121a14',
        emissive: '#08120a',
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide
      });
      const tileMesh = new THREE.Mesh(tileGeo, tileMat);
      tileMesh.rotation.x = -Math.PI / 2;
      tileMesh.position.set(zone.worldPos3D[0], 0.02, zone.worldPos3D[2]);
      tileMesh.userData = { zoneId: zone.id };
      scene.add(tileMesh);
      zoneMeshes[zone.id] = tileMesh;

      // Zone Boundary Line Frame
      const edges = new THREE.EdgesGeometry(tileGeo);
      const lineMat = new THREE.LineBasicMaterial({ color: '#273a2d' });
      const line = new THREE.LineSegments(edges, lineMat);
      line.rotation.x = -Math.PI / 2;
      line.position.set(zone.worldPos3D[0], 0.03, zone.worldPos3D[2]);
      scene.add(line);
    });
    zoneMeshesRef.current = zoneMeshes;

    // Room Divider Walls (Stylized Glass / Cyber partition blocks)
    const wallGeoH = new THREE.BoxGeometry(15.2, 1.2, 0.15);
    const wallGeoV = new THREE.BoxGeometry(0.15, 1.2, 15.2);
    
    // Internal Dividers
    [-2.4, 2.4].forEach(coord => {
      const hWall = new THREE.Mesh(new THREE.BoxGeometry(14.8, 0.8, 0.1), wallMat);
      hWall.position.set(0, 0.4, coord);
      scene.add(hWall);

      const vWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.8, 14.8), wallMat);
      vWall.position.set(coord, 0.4, 0);
      scene.add(vWall);
    });

    // 7. Create ESP32 Node Towers (Node A & Node B)
    const createNodeTower = (pos: [number, number, number], labelStr: string, colorHex: string) => {
      const group = new THREE.Group();
      group.position.set(...pos);

      // Base Pedestal
      const baseMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.6, 0.4, 16),
        new THREE.MeshStandardMaterial({ color: '#1a241d', metalness: 0.8, roughness: 0.2 })
      );
      baseMesh.position.y = 0.2;
      group.add(baseMesh);

      // Antenna Pole
      const poleMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 1.6, 12),
        new THREE.MeshStandardMaterial({ color: '#4d6353', metalness: 0.9 })
      );
      poleMesh.position.y = 1.0;
      group.add(poleMesh);

      // Glowing Antenna Tip
      const tipMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 16, 16),
        new THREE.MeshStandardMaterial({ color: colorHex, emissive: colorHex, emissiveIntensity: 1.5 })
      );
      tipMesh.position.y = 1.8;
      group.add(tipMesh);

      // Pulse Ring
      const ringGeo = new THREE.RingGeometry(0.3, 0.8, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.05;
      group.add(ringMesh);

      scene.add(group);
      return group;
    };

    createNodeTower(NODE_A_POS, 'ESP32 NODE A (TX)', '#b8ff3d');
    createNodeTower(NODE_B_POS, 'ESP32 NODE B (RX)', '#66ff99');

    // 8. Create Target Avatar (Person / Object Marker)
    const targetGroup = new THREE.Group();

    // Body Cylinder / Humanoid Avatar
    const bodyGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.4, 16);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: '#ffd54a',
      emissive: '#ffd54a',
      emissiveIntensity: 0.4,
      metalness: 0.5,
      roughness: 0.3
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.y = 0.7;
    targetGroup.add(bodyMesh);

    // Head Sphere
    const headGeo = new THREE.SphereGeometry(0.28, 16, 16);
    const headMesh = new THREE.Mesh(headGeo, bodyMat);
    headMesh.position.y = 1.6;
    targetGroup.add(headMesh);

    // Holographic Aura Cylinder
    const auraGeo = new THREE.CylinderGeometry(0.8, 0.8, 1.8, 24, 1, true);
    const auraMat = new THREE.MeshBasicMaterial({
      color: '#ffd54a',
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    });
    const auraMesh = new THREE.Mesh(auraGeo, auraMat);
    auraMesh.position.y = 0.9;
    targetGroup.add(auraMesh);

    scene.add(targetGroup);
    targetMeshRef.current = targetGroup;

    // 9. Wi-Fi Propagation Wave Rays between Node A & Node B
    const waveGroup = new THREE.Group();
    scene.add(waveGroup);
    waveGroupRef.current = waveGroup;

    const waveLines: THREE.Line[] = [];
    const numRays = 7;

    for (let i = 0; i < numRays; i++) {
      const points: THREE.Vector3[] = [];
      const steps = 40;
      const arcHeight = (i - 3) * 0.8;

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const x = NODE_A_POS[0] + (NODE_B_POS[0] - NODE_A_POS[0]) * t;
        const z = NODE_A_POS[2] + (NODE_B_POS[2] - NODE_A_POS[2]) * t;
        const y = NODE_A_POS[1] + (NODE_B_POS[1] - NODE_A_POS[1]) * t + Math.sin(t * Math.PI) * (2.5 + arcHeight);
        points.push(new THREE.Vector3(x, y, z));
      }

      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: '#b8ff3d',
        transparent: true,
        opacity: 0.45
      });
      const line = new THREE.Line(lineGeo, lineMat);
      waveGroup.add(line);
      waveLines.push(line);
    }
    waveLinesRef.current = waveLines;

    // 10. Raycasting for Clicking on 3D Floor Tiles
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      if (!mountRef.current || !cameraRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, cameraRef.current);
      const intersects = raycaster.intersectObjects(scene.children, true);

      for (let hit of intersects) {
        if (hit.object.userData && hit.object.userData.zoneId) {
          onSelectZone(hit.object.userData.zoneId as ZoneId);
          break;
        } else if (hit.point) {
          // Clicked somewhere on floor
          if (onSelectCoords) {
            onSelectCoords(hit.point.x, hit.point.z);
          }
        }
      }
    };

    container.addEventListener('pointerdown', handlePointerDown);

    // 11. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update Controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }

      // Smoothly update target mesh position
      if (targetMeshRef.current && stateRef.current.targetPos) {
        const { x, z, type } = stateRef.current.targetPos;
        targetMeshRef.current.position.x += (x - targetMeshRef.current.position.x) * 0.15;
        targetMeshRef.current.position.z += (z - targetMeshRef.current.position.z) * 0.15;

        // Visibility
        targetMeshRef.current.visible = type !== 'NONE';

        // Hover bobbing
        targetMeshRef.current.position.y = Math.sin(elapsedTime * 3) * 0.1;
      }

      // Update Zone Tile Colors based on Probabilities
      if (zoneMeshesRef.current) {
        ZONE_LIST.forEach(z => {
          const mesh = zoneMeshesRef.current[z.id];
          if (mesh && mesh.material) {
            const prob = stateRef.current.probabilities[z.id] || 0;
            const mat = mesh.material as THREE.MeshStandardMaterial;

            if (z.id === stateRef.current.likelyZone && prob > 25) {
              mat.color.set('#b8ff3d');
              mat.emissive.set('#b8ff3d');
              mat.emissiveIntensity = 0.6 + Math.sin(elapsedTime * 6) * 0.3;
              mat.opacity = 0.9;
            } else if (prob > 20) {
              mat.color.set('#66ff99');
              mat.emissive.set('#1a4d2b');
              mat.emissiveIntensity = 0.3;
              mat.opacity = 0.7;
            } else {
              mat.color.set('#121a14');
              mat.emissive.set('#08120a');
              mat.emissiveIntensity = 0.05;
              mat.opacity = 0.5;
            }
          }
        });
      }

      // Animate Wi-Fi wave lines opacity pulse
      if (waveLinesRef.current && waveGroupRef.current) {
        waveGroupRef.current.visible = stateRef.current.showSignalWaves;
        waveLinesRef.current.forEach((line, idx) => {
          const mat = line.material as THREE.LineBasicMaterial;
          mat.opacity = 0.2 + Math.sin(elapsedTime * 4 + idx) * 0.2;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 12. Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Sync Camera View Presets
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const view = state.cameraView;

    if (view === 'top') {
      cameraRef.current.position.set(0, 24, 0.1);
      controlsRef.current.target.set(0, 0, 0);
    } else if (view === 'perspective') {
      cameraRef.current.position.set(-12, 10, 16);
      controlsRef.current.target.set(0, 0, 0);
    } else {
      // Isometric
      cameraRef.current.position.set(0, 16, 18);
      controlsRef.current.target.set(0, 0, 0);
    }
  }, [state.cameraView]);

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden border border-[#222e26] shadow-2xl bg-[#0a0e0c]">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* 3D Scene Overlay Badge */}
      <div className="absolute top-3 left-3 bg-[#0f1511]/90 backdrop-blur border border-[#222f25] px-3 py-1.5 rounded-lg text-xs font-mono text-[#f2f5ef] pointer-events-none flex items-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-[#b8ff3d] animate-pulse" />
        <span className="font-bold">3D BUILDING SIMULATION CANVAS</span>
        <span className="text-[#627568] text-[10px]">(CLICK ZONE TO MOVE TARGET)</span>
      </div>
    </div>
  );
};

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { useLayoutEffect, useRef } from "react";
import ImprovedNoise from "../helpers/improvedNoise";
import lerp from "../helpers/lerp";

function MainCanvas() {
  return (
    <div className="w-100vw h-100vh -z-50 fixed">
      <Canvas>
        <Camera />
        <ParticleSystem />
        {/* <mesh>
          <boxGeometry args={[1,1,1]} />
          <meshBasicMaterial color={0x424242}/>
        </mesh> */}
        <ambientLight />
      </Canvas>   
    </div>
  );
}

function Camera() {
  const ref = useRef();
  const { set, size} = useThree(state => state);
  useLayoutEffect(() => {
    set({camera: ref.current});
    ref.current.lookAt(new THREE.Vector3(0, 0.8, 0));
  }, []);
  return <perspectiveCamera ref={ref} args={[65, size.width / size.height]} position={[0, -1.5, 2]} />
}

function ParticleSystem() {
  const mesh = useRef(null);
  const Noise = useRef(new ImprovedNoise());
  const dummy = useRef(new THREE.Object3D());
  const time = useRef(0);
  useFrame((state, delta) => {
    time.current += delta;
    // set noise and initial coordinates
    const xOffset = -14;
    const yOffset = -1.5;
    const noisegap = 0.15;
    const gap = 0.15;

    const startColor = 0x424242;
    const endColor = 0x00E591;

    const widthDivisions = 200;
    const heightDivisions = 100;
    for (let j = 0; j < heightDivisions; j++) {
      for (let i = 0; i < widthDivisions; i++) {
        const x = i * gap + xOffset;
        const y = j * gap + yOffset;
        const ns = Noise.current.noise(i * noisegap / 3, j * noisegap / 3, time.current / 6);
        const z = ns;
        // const r = lerp(0x42, 0x00, ns);
        // const g = lerp(0x42, 0xE5, ns);
        // const b = lerp(0x42, 0x91, ns);
        
        const color = lerp(startColor, endColor, (z + 0.6) / 1.2);
        // const color = (r << 16) + (g << 8) + b;
        dummy.current.position.set(x, y, z);
        dummy.current.updateMatrix();
        mesh.current.setMatrixAt(j * widthDivisions + i, dummy.current.matrix);
        mesh.current.setColorAt(j * widthDivisions + i, new THREE.Color(color));
      }
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, 200 * 100]}>
      <sphereGeometry args={[0.005]}/>
      <meshStandardMaterial opacity={0.6} transparent={true} />
    </instancedMesh>
  )
}

export default MainCanvas;
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { useEffect, useLayoutEffect, useRef } from "react";
import ImprovedNoise from "../helpers/improvedNoise";
import lerp from "../helpers/lerp";

function AboutCanvas() {
  return (
    <div className="w-100vw h-100vh -z-50 fixed">
      <Canvas>
        <Camera />
        {/* <ParticleSystem /> */}
        {/* <mesh>
          <boxGeometry args={[1,1,1]} />
          <meshBasicMaterial color={0x424242}/>
        </mesh> */}
        <IsolinePlane />
        <ambientLight />
      </Canvas>   
    </div>
  );
}

function Camera() {
  const ref = useRef(null);
  const { set, size} = useThree(state => state);
  useLayoutEffect(() => {
    set({camera: ref.current});
    // ref.current.lookAt(new THREE.Vector3(0, 0.8, 0));
  }, []);
  return <perspectiveCamera ref={ref} args={[65, size.width / size.height]} position={[0, 0, 25]} />
}

function IsolinePlane() {
  const planeGeometryRef = useRef();
  const shaderMaterialRef = useRef();
  const meshRef = useRef();
  const Noise = useRef(ImprovedNoise())

  let positions = undefined;
  let vertexCount = undefined;

  useLayoutEffect(() => {
    positions = planeGeometryRef.current.attributes.position;
    vertexCount = positions.count;
    console.log(positions);
    console.log(vertexCount);
  })

  const uniforms = {
    u_color: { value: new THREE.Color(THREE.Color.NAMES.black) }
  }

  const noiseData = new Float32Array(vertexCount);
  for (let i = 0; i < vertexCount; i++) {
    const noise = Noise.noise(positions.getX(i), positions.getY(i), 0);
    noiseData[i] = noise;
  }
  const noiseAttribute = new THREE.BufferAttribute(noiseData, 1);
  planeGeometryRef.current.setAttribute("a_noise_data", noiseAttribute);

  return (
    <mesh ref={meshRef}>
      <planeGeometry ref={planeGeometryRef} args={[25, 25, 250, 250]}>
      </planeGeometry>
      <shaderMaterial 
        ref={shaderMaterialRef} 
        uniforms={uniforms}
        vertexShader={`
          varying vec3 v_pos;
          varying float v_noise_data;
          attribute float a_noise_data;

          void main() {
            v_pos = position;
            v_noise_data = a_noise_data;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }
        `}
        fragmentShader={`
          uniform float u_time;
          uniform vec3 u_color;
          varying vec3 v_pos;
          varying float v_noise_data;

          void main() {
            float lineThickness = 1.0;
            float scaled_noise = v_noise_data / 2.;
            float grid = abs(fract(scaled_noise - 0.5) - 0.5) / fwidth(scaled_noise) / lineThickness;
            float line = min(grid, 1.0);
            vec3 lineCol = mix(vec3(1, 1, 0), vec3(0, 1, 1), grid);
            vec3 col = mix(lineCol, u_color, line);
            gl_FragColor = vec4(col, 1);
          }
        `}
        onBeforeCompile={(shader, renderer) => {
          console.log(shader.vertexShader);
          console.log(shader.fragmentShader);
        }}
      >
      </shaderMaterial>
    </mesh>
  )
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

export default AboutCanvas;
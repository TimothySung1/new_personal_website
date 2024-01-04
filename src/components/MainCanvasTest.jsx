import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MainCanvas() {
  /*
  return (
    <div className='w-100vw h-100vh'>
      <Canvas onCreated={(state) => {
        // state.camera.fov = 1;
      }}>
        <pointLight position={[0, 0, 5]} decay={.2} intensity={10}/>
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </div>
    
  )*/

  const count = 64;

  return (
    <div className='w-100vw h-100vh'>
      <Canvas onCreated={(state) => {
        const camera = state.camera;
        camera.position.set(0, 0, 500);
      }}>
        <pointLight color={0xffffff} intensity={120} decay={0.1} />
      </Canvas>
    </div>
  )
}

/*
function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // delta is the difference in time
  useFrame((state, delta) => {meshRef.current.rotation.x += delta})
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
*/

export default MainCanvas;
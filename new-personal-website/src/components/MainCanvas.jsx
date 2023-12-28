import { Canvas } from "@react-three/fiber";


function MainCanvas() {
  return (
    <div className="w-100vw h-100vh -z-50 fixed">
      <Canvas>
        <mesh
          position={[0, 0, 0]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={'orange'} />
        </mesh>
      </Canvas>   
    </div>
  );
}

export default MainCanvas;
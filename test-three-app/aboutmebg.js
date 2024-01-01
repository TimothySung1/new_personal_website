import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

// default setup
const canvas = document.querySelector('#welcome-canvas');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
);

camera.position.z = 20;
camera.position.y = 5;
camera.lookAt(new THREE.Vector3(0, 0, 0));

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  
  // canvas.width and canvas.height are the drawing buffer size (rendering resolution)
  // client is css size on the page
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

// when hover over certain text, show that text (Timothy Sung -> 3D initials, Georgia Tech -> GT)
// frontend -> react, backend -> ???
// algorithms -> 3d sorting, AI -> neural network?

const loader = new FontLoader();
const font = await loader.loadAsync('/src/fonts/typefacejsons/Play_Regular.json');
const geometry = new TextGeometry('Hello', {
  font,
  size: 2,
  height: 1,
  depth: 16,
});
const material = new THREE.MeshBasicMaterial({color: 0xffffff});
const mesh = new THREE.Mesh(geometry, material);

function animate(time) {
  if (resizeRendererToDisplaySize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

scene.add(mesh);
animate();
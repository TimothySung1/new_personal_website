import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { lerp } from 'three/src/math/MathUtils';

// default setup
const canvas = document.querySelector('#welcome-canvas');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
);

camera.position.z = 20;
camera.position.y = 0;
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
const font = await loader.loadAsync('/src/fonts/typefacejsons/roboto_slab_med.json');
const fontSize = 2;
const fontHeight = 1;
const fontDepth = 4;
const geometryG = new TextGeometry('G', {
  font,
  size: fontSize,
  height: fontHeight,
  depth: fontDepth,
});
const geometryT = new TextGeometry('T', {
  font,
  size: fontSize,
  height: fontHeight,
  depth: fontDepth,
})
const geometrye = new TextGeometry('e', {
  font,
  size: fontSize,
  height: fontHeight,
  depth: fontDepth,
});
const geometryo = new TextGeometry('o', {
  font,
  size: fontSize,
  height: fontHeight,
  depth: fontDepth,
});
const geometryr = new TextGeometry('r', {
  font,
  size: fontSize,
  height: fontHeight,
  depth: fontDepth,
});
const geometryg = new TextGeometry('g', {
  font,
  size: fontSize,
  height: fontHeight,
  depth: fontDepth,
});
const geometryi = new TextGeometry('i', {
  font,
  size: fontSize,
  height: fontHeight,
  depth: fontDepth,
});
const geometrya = new TextGeometry('a', {
  font,
  size: fontSize,
  height: fontHeight,
  depth: fontDepth,
});
const geometryc = new TextGeometry('c', {
  font,
  size: fontSize,
  height: fontHeight,
  depth: fontDepth,
});
const geometryh = new TextGeometry('h', {
  font,
  size: fontSize,
  height: fontHeight,
  depth: fontDepth,
});

const navyBlue = 0x003057;
const techGold = 0xB3A369;

const light = new THREE.PointLight(0xffffff, 10, 0, 0.2);
light.position.set(0, 0, 20);
scene.add(light);

const navyMaterial = new THREE.MeshPhongMaterial({color: navyBlue});
const goldMaterial = new THREE.MeshPhongMaterial({color: techGold});

const material = new THREE.MeshBasicMaterial({color: 0xffffff});
const meshG = new THREE.Mesh(geometryG, goldMaterial);
const meshe1 = new THREE.Mesh(geometrye, goldMaterial);
const mesho = new THREE.Mesh(geometryo, goldMaterial);
const meshr = new THREE.Mesh(geometryr, goldMaterial);
const meshg = new THREE.Mesh(geometryg, goldMaterial);
const meshi = new THREE.Mesh(geometryi, goldMaterial);
const mesha = new THREE.Mesh(geometrya, goldMaterial);
const meshT = new THREE.Mesh(geometryT, goldMaterial);
const meshe = new THREE.Mesh(geometrye, goldMaterial);
const meshc = new THREE.Mesh(geometryc, goldMaterial);
const meshh = new THREE.Mesh(geometryh, goldMaterial);

meshG.position.x = -1;

meshT.position.x = 1;
meshT.position.y = -0.75;

const meshes = Array();
meshes.push(meshG, meshe1, mesho, meshr, meshg, meshi, mesha, meshT, meshe, meshc, meshh);
const defaultPosition = {
  x: 0,
  y: 0,
  z: 25,
}
const initialPositions = Array(11).fill().map(e => ({ ...defaultPosition }));
initialPositions[0].x = -1;
initialPositions[0].z = 0;
initialPositions[7].x = 1;
initialPositions[7].y = -0.75;
initialPositions[7].z = 0;
const targetPositions = Array(11).fill().map(e => ({ ...defaultPosition }));
targetPositions[0].x = -1;
targetPositions[0].z = 0;
targetPositions[7].x = 1;
targetPositions[7].y = -0.75;
targetPositions[7].z = 0;

for (let i = 1; i <= 6; i++) {
  meshes[i].position.z = 25;
}
for (let i = 8; i <= 10; i++) {
  meshes[i].position.z = 25;
}

for (const mesh of meshes) {
  scene.add(mesh);
}

function animate(time) {
  if (resizeRendererToDisplaySize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  // if condition or something, start the animation to display full text
  updatePositions();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function updatePositions() {
  for (let i = 0; i < targetPositions.length; i++) {
    const letterMesh = meshes[i];
    x = lerp(letterMesh.position.x, targetPositions[i].x, 0.01);
    y = lerp(letterMesh.position.y, targetPositions[i].y, 0.01);
    z = lerp(letterMesh.position.z, targetPositions[i].z, 0.01);
    letterMesh.position.set(x, y, z);
  }
}

animate();
import * as THREE from 'three';
import ImprovedNoise from './improvedNoise';

// default setup
const canvas = document.querySelector('#welcome-canvas');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  65,
  canvas.clientWidth / canvas.clientHeight,
);

camera.position.z = 2;
camera.position.y = -1.5;
camera.lookAt(new THREE.Vector3(0, 0.8, 0));

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

// initialize points
const widthDivisions = 200;
const heightDivisions = 100;
const numPoints = widthDivisions * heightDivisions;

const particleGeometry = new THREE.SphereGeometry(0.005);
const particleMaterial = new THREE.MeshBasicMaterial();
const particleMesh = new THREE.InstancedMesh(particleGeometry, particleMaterial, widthDivisions * heightDivisions);
const dummy = new THREE.Object3D();

// set noise and initial coordinates
const Noise = new ImprovedNoise();

const xOffset = -14;
const yOffset = -1.5;
const noisegap = 0.15;
const gap = 0.15;

const startColor = 0x424242;
const endColor = 0x00E591;

function lerp(xi, xf, alpha) {
  return (1 - alpha) * xi + alpha * xf;
}

for (let j = 0; j < heightDivisions; j++) {
  for (let i = 0; i < widthDivisions; i++) {
    const x = i * gap + xOffset;
    const y = j * gap + yOffset;
    const ns = Noise.noise(i * noisegap / 3, j * noisegap / 3, 0);
    const z = ns;
    const color = lerp(startColor, endColor, (z + 0.6) / 1.2);
    dummy.position.set(x, y, z);
    dummy.updateMatrix();
    particleMesh.setMatrixAt(j * widthDivisions + i, dummy.matrix);
    particleMesh.setColorAt(j * widthDivisions + i, new THREE.Color(color));
  }
}

function animate(time) {
  if (resizeRendererToDisplaySize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  for (let j = 0; j < heightDivisions; j++) {
    for (let i = 0; i < widthDivisions; i++) {
      const ns = Noise.noise(i * noisegap / 3, j * noisegap / 3, time * 0.00005);
      const x = i * gap + xOffset;
      const y = j * gap + yOffset;
      dummy.position.x = x;
      dummy.position.y = y;
      dummy.position.z = ns;
      dummy.updateMatrix();
      const color = lerp(startColor, endColor, ns + 0.5);
      particleMesh.setMatrixAt(j * widthDivisions + i, dummy.matrix);
      particleMesh.setColorAt(j * widthDivisions + i, new THREE.Color(color));
    }
  }
  particleMesh.instanceColor.needsUpdate = true;
  particleMesh.instanceMatrix.needsUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// scene.add(mesh);
scene.add(particleMesh);
resizeRendererToDisplaySize(renderer);
// renderer.render(scene, camera);
requestAnimationFrame(animate);
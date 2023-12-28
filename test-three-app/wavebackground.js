import * as THREE from 'three';
import ImprovedNoise from './improvedNoise';

// default setup
const canvas = document.querySelector('#welcome-canvas');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
// renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
);

camera.position.z = 5;
camera.position.y = -3;
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

// initialize points
const widthDivisions = 20;
const heightDivisions = 20;
const numPoints = widthDivisions * heightDivisions;
// const geometry = new THREE.PlaneGeometry(10, 10, widthDivisions, heightDivisions);
const geometry = new THREE.BufferGeometry();
const material = new THREE.PointsMaterial({size: 0.25, vertexColors: true});
const mesh = new THREE.Points(geometry, material);


// set noise and initial coordinates
const Noise = new ImprovedNoise();

const xOffset = -2;
const yOffset = -2;
const gap = 0.3;
let coords = [];
let colors = [];
for (let i = 0; i < widthDivisions; i++) {
  let x = i * gap + xOffset;
  for (let j = 0; j < heightDivisions; j++) {
    let y = j * gap + yOffset;
    let ns = Noise.noise(x + 200, y - 100, 0);
    let z = ns;
    coords.push(x, y, z);
    colors.push(.1, ns, .8);
  }
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(coords, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

function animate(time) {
  coords = [];
  colors = [];
  for (let i = 0; i < widthDivisions; i++) {
    let x = i * gap + xOffset;
    for (let j = 0; j < heightDivisions; j++) {
      let y = j * gap + yOffset;
      let ns = Noise.noise(x + 200, y - 100, time * 0.0005);
      let z = ns;
      coords.push(x, y, z);
      colors.push(.1, ns, .8);
    }
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(coords, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


scene.add(mesh);
resizeRendererToDisplaySize(renderer);
animate();
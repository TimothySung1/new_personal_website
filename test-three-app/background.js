import * as THREE from 'three';
import QuadTree from './tree.js'

// idea: make the whole background a sparse space of particles
// when mouse is over a certain area, disperse particles slowly, have return when not near

// default setup
const canvas = document.querySelector('#welcome-canvas');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
);
camera.position.set(0, 0, 250);

// create lighting
const light = new THREE.PointLight(0xffffff, 8, 0, 0.01);
light.position.set(0, 0, 0);
scene.add(light);

// create particles
const count = 1000;
const material = new THREE.MeshPhongMaterial({color: 0xffffff});
const geometry = new THREE.DodecahedronGeometry(1, 0);
const mesh = new THREE.InstancedMesh(geometry, material, count);
const dummy = new THREE.Object3D();

// determine range
const length = 512;
const startX = -256;
const startY = -256;
const depth = 400;
const startZ = -250;

// place particles
const particles = [];

const particleTree = new QuadTree(startX, startY, length);
const color = new THREE.Color();
// make y range 512, make x 1024?
for (let i = 0; i < count; i++) {
  const particleObj = {
    x: Math.random() * length + startX,
    y: Math.random() * length + startY,
    z: Math.random() * depth + startZ,
  };
  particleTree.add(Math.floor(particleObj.x), Math.floor(particleObj.y), i);
  dummy.position.set(particleObj.x, particleObj.y, particleObj.z);
  dummy.updateMatrix();
  // console.log(dummy.matrix);
  mesh.setMatrixAt(i, dummy.matrix);
  particles.push(particleObj);
}
// mesh.instanceMatrix.needsUpdate = true;
// mesh.setColorAt(0, new THREE.Color());
// mesh.instanceColor.needsUpdate = true;

scene.add(mesh);

// add event listener to canvas
canvas.addEventListener('mousemove', (event) => {
  const rect = event.target.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  // console.log(x, y);

  x = x / canvas.clientWidth * length + startX;
  y = y / canvas.clientHeight * length + startY;
  y = -y;
  // console.log(x, y);

  // light up particles within range of mouse
  const targetParticles = particleTree.getParticles(Math.floor(x), Math.floor(y));
  console.log(targetParticles);
  for (let i = 0; i < count; i++) {
    if (targetParticles.includes(i)) {
      mesh.setColorAt(i, color.set(0xff0000));
    } else {
      mesh.setColorAt(i, color.set(0xffffff));
    }
  }
  // for (const index of targetParticles) {
  //   console.log(index);
  //   mesh.setColorAt(index, color.set(0xff0000));
  // }
  mesh.instanceColor.needsUpdate = true;
  renderer.render(scene, camera);
});

renderer.render(scene, camera);
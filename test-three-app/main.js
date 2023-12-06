// import './style.css'
import * as THREE from 'three';

document.querySelector('#app').innerHTML = `
  <div>
    <p>Hello</p>
  </div>
`

function welcome() {
  const canvas = document.querySelector("#welcome-canvas");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
  
  // renderer.render(scene, camera);
};


// welcome();

function particleSystem() {
  const canvas = document.querySelector("#welcome-canvas");
  const scene = new THREE.Scene();
  const count = 300;
  const renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(window.innerWidth, window.innerHeight)
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
  camera.position.z = 100;
  // use memo for expensive calculations and caching
  const particles = [];
  for (let i = 0; i < count; i++) {
    const time = Math.random() * 100;
    const factor = Math.random() * 100 + 20;
    const speed = (Math.random() * .005 + 0.01) / 2;
    const x = Math.random() * 100 - 50;
    const y = Math.random() * 100 - 50;
    const z = Math.random() * 100 - 50;

    particles.push({ time, factor, speed, x, y, z });
  }

  const light = new THREE.PointLight(0xffffff, 200, 0, 1);
  light.position.y = 0;
  light.position.x = 0;
  light.position.z = 0;
  const geometry = new THREE.DodecahedronGeometry(1, 0);
  const material = new THREE.MeshPhongMaterial({color: '#ffffff'});
  const particlesMesh = new THREE.InstancedMesh(geometry, material, count);

  /*
  const dummy = new THREE.Object3D();
  dummy.position.x = 1;
  dummy.position.y = 2;
  dummy.position.z = 3;
  dummy.updateMatrix();

  console.log(dummy.matrix);
  */

  for (let i = 0; i < count; i++) {
    const matrix = new THREE.Matrix4();
    matrix.setPosition(new THREE.Vector3(particles[i].x, particles[i].y, particles[i].z));
    particlesMesh.setMatrixAt(i, matrix)
  }

  // const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  // makeInstance(cubeGeometry, '#050505', 0, scene);
  scene.add(particlesMesh);
  //scene.add(new THREE.Mesh(geometry, material));
  scene.add(light);
  renderer.render(scene, camera);
}
particleSystem();

function makeInstance(geometry, color, x, scene) {
  const material = new THREE.MeshBasicMaterial({color});
 
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
 
  cube.position.x = x;
 
  return cube;
}


/*
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.body.appendChild(renderer.domElement);

// create cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

const ambientLight = new THREE.AmbientLight('#ffffff', 8);

const instanceGeometry = new THREE.DodecahedronGeometry(1, 0);
const g2 = new THREE.ConeGeometry();
const instanceMaterial = new THREE.MeshBasicMaterial({color: "#ffffff"});
const instanceMesh = new THREE.InstancedMesh(instanceGeometry, instanceMaterial, 50);
// instanceMesh.frustumCulled = false;
console.log(instanceMesh);
// const mesh = new THREE.Mesh(instanceGeometry, material);

const dummy = new THREE.Object3D();
for (let i = 0; i < 100; i++) {
  dummy.position.x = Math.random() * 40 - 20;
  dummy.position.y = Math.random() * 40 - 20;
  dummy.position.z = Math.random() * 40 - 20;

  dummy.updateMatrix();
  instanceMesh.setMatrixAt(i, dummy.matrix);
}

instanceMesh.position.x = 0;
scene.add(instanceMesh);
// scene.add(mesh);
renderer.render(scene, camera);

// animate();
*/
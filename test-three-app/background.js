import * as THREE from 'three';

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
const light = new THREE.PointLight(0xffffff, 2, 0, 0.1);
light.position.set(camera.position.x, camera.position.y, camera.position.z);
scene.add(light);

// create particles
const count = 100;
const material = new THREE.MeshPhongMaterial({color: 0xffffff});
const particleSize = 3;
const geometry = new THREE.DodecahedronGeometry(particleSize, 0);
const mesh = new THREE.InstancedMesh(geometry, material, count);
const dummy = new THREE.Object3D();
const mat4 = new THREE.Matrix4();

// create duplicate mesh with larger elements to incorporate range
const largeGeometry = new THREE.DodecahedronGeometry(particleSize * 2, 0);
const largeMesh = new THREE.InstancedMesh(largeGeometry, material, count);

// determine range
const length = 512;
const startX = -256;
const startY = -256;
const depth = 400;
const startZ = -250;

// place particles
const particles = [];
const targetPositions = [];
const color = new THREE.Color();
color.setHex(0xffffff);
// make y range 512, make x 1024?
for (let i = 0; i < count; i++) {
  const particleObj = {
    x: Math.random() * length + startX,
    y: Math.random() * length + startY,
    z: Math.random() * depth + startZ,
    rotationSpeed: 1 + Math.random(),
    rotX: Math.random() < 0.5,
    rotY: Math.random() < 0.5,
    rotZ: Math.random() < 0.5,
  };

  dummy.position.set(particleObj.x, particleObj.y, particleObj.z);
  dummy.updateMatrix();
  // console.log(dummy.matrix);
  mesh.setMatrixAt(i, dummy.matrix);
  mesh.setColorAt(i, color);
  largeMesh.setMatrixAt(i, dummy.matrix);
  largeMesh.setColorAt(i, color);
  targetPositions.push({x: particleObj.x, y: particleObj.y, z: particleObj.z});
  particles.push(particleObj);
}

scene.add(mesh);

// raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let prevId = -1;
let largePrevIds = new Set();
let largeIds = new Set();
// raycaster.setFromCamera(pointer, camera);
const largeRaycaster = new THREE.Raycaster();

// add event listener to canvas
canvas.addEventListener('mousemove', (event) => {
  const rect = event.target.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  // console.log(x, y);

  x = x / canvas.clientWidth * 2 - 1
  y = -(y / canvas.clientHeight) * 2 + 1;
  // console.log(x, y);
  pointer.x = x;
  pointer.y = y;

  raycaster.setFromCamera(pointer, camera);
  largeRaycaster.setFromCamera(pointer, camera);
  const intersection = raycaster.intersectObject(mesh);
  // if multiple objects, get object from intersection[i].object

  if (intersection.length > 0) {
    const id = intersection[0].instanceId;

    if (prevId != id) {
      mesh.setColorAt(id, color.setHex(Math.random() * 0xffffff));
      mesh.setColorAt(prevId, color.setHex(0xffffff));
      // update previous objects target position to original
      // if (prevId != -1) {
      //   const {x, y, z, ...others} = particles[prevId];
      //   targetPositions[prevId] = {x, y, z};
      // }
      
      mesh.instanceColor.needsUpdate = true;
      prevId = id;
    }
  } else {
    mesh.setColorAt(prevId, color.setHex(0xffffff));
    // if (prevId != -1) {
    //   const {x, y, z, ...others} = particles[prevId];
    //   targetPositions[prevId] = {x, y, z};
    // }
    mesh.instanceColor.needsUpdate = true;
    prevId = -1;
  }

  const largeIntersection = largeRaycaster.intersectObject(largeMesh);
  for (const obj of largeIntersection) {
    
    const id = obj.instanceId;
    largeIds.add(id);
    mesh.getMatrixAt(id, mat4);

    mat4.decompose(dummy.position, dummy.quaternion, dummy.scale);
    const intersectionPoint = obj.point;
    const dx = (dummy.position.x - intersectionPoint.x) / 20;
    const dy = (dummy.position.y - intersectionPoint.y) / 20;
    targetPositions[id].x += dx;
    targetPositions[id].y += dy;
    dummy.position.add(new THREE.Vector3(dx, dy, 0))
    // dummy.updateMatrix();
    // mesh.setMatrixAt(id, dummy.matrix);
    // largeMesh.setMatrixAt(id, dummy.matrix);
  }

  for (const prevId of largePrevIds) {
    if (!largeIds.has(prevId)) {
      const {x, y, z, ...others} = particles[prevId];
      targetPositions[prevId] = {x, y, z};
    }
  }
  const temp = largePrevIds;
  largePrevIds = largeIds;
  largeIds = temp;
  largeIds.clear();

  // mesh.instanceMatrix.needsUpdate = true;
  
  // renderer.render(scene, camera);
});

const lerpDummy = new THREE.Object3D();

function animate(time) {
  for (let i = 0; i < count; i++) {
    mesh.getMatrixAt(i, mat4);
    mat4.decompose(dummy.position, dummy.quaternion, dummy.scale);

    const particle = particles[i];
    if (particle.rotX) {
      // console.log('yes')
      dummy.rotation.x += particle.rotationSpeed;
      // console.log(particle.rotationSpeed * time);
    }
    if (particle.rotY) {
      dummy.rotation.y += particle.rotationSpeed;
    }
    if (particle.rotZ) {
      dummy.rotation.z += particle.rotationSpeed;
    }

    // lerp
    const target = targetPositions[i];
    lerpDummy.position.set(target.x, target.y, target.z);
    dummy.position.lerp(lerpDummy.position, 0.05);

    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    largeMesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
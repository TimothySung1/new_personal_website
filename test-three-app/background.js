import * as THREE from 'three';

// idea: make the whole background a sparse space of particles
// when mouse is over a certain area, disperse particles slowly, have return when not near

/*
TODO: make particles uniform distance
change camera position and view based on mouse position (do it little to keep interactivity)
make particle large range larger, modify dx and dy to be inverse
scrolling down changes camera perspective
add rotating object or something new
*/

// default setup
const canvas = document.querySelector('#welcome-canvas');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
// renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
);
// camera.position.set(0, 0, 250);
camera.position.set(0, 0, 500);

// create lighting
const light = new THREE.PointLight(0xffffff, 120, 0, 0.1);
light.position.set(camera.position.x, camera.position.y, camera.position.z);
scene.add(light);

// create particles
let count = 64;
const material = new THREE.MeshPhongMaterial({color: 0xffffff});
const particleSize = 3;
const geometry = new THREE.DodecahedronGeometry(particleSize, 0);
const mesh = new THREE.InstancedMesh(geometry, material, count);
const dummy = new THREE.Object3D();
const mat4 = new THREE.Matrix4();

// create duplicate mesh with larger elements to incorporate range
const scale = 2;
const largeGeometry = new THREE.DodecahedronGeometry(particleSize * scale, 0);
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

// initParticlesRandom();
initParticles();

scene.add(mesh);

// raycaster
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let prevId = -1;
let largePrevIds = new Set();
let largeIds = new Set();

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

  mesh.updateMatrixWorld();
  raycaster.setFromCamera(pointer, camera);
  // console.log(mesh);
  const intersection = raycaster.intersectObject(mesh);
  // if multiple objects, get object from intersection[i].object

  if (intersection.length > 0) {
    // console.log('intersection');
    const id = intersection[0].instanceId;

    if (prevId != id) {
      mesh.setColorAt(id, color.setHex(0xff0000));
      if (prevId > -1) {
        mesh.setColorAt(prevId, color.setHex(0xffffff));
      }
      
      // update previous objects target position to original
      // if (prevId != -1) {
      //   const {x, y, z, ...others} = particles[prevId];
      //   targetPositions[prevId] = {x, y, z};
      // }
      
      mesh.instanceColor.needsUpdate = true;
      prevId = id;
    }
  } else if (prevId !== -1) {
    mesh.setColorAt(prevId, color.setHex(0xffffff));
    // if (prevId != -1) {
    //   const {x, y, z, ...others} = particles[prevId];
    //   targetPositions[prevId] = {x, y, z};
    // }
    mesh.instanceColor.needsUpdate = true;
    prevId = -1;
  }

  largeMesh.updateMatrixWorld();
  const largeIntersection = raycaster.intersectObject(largeMesh);
  // if (largeIntersection.length > 0) console.log('large intersection');
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
});

const lerpDummy = new THREE.Object3D();

function animate(time) {
  // console.log('animate');
  if (resizeRendererToDisplaySize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
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
    dummy.scale.set(scale, scale, scale);
    dummy.updateMatrix();
    largeMesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
  largeMesh.instanceMatrix.needsUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// track scrolling
document.addEventListener('scroll', (event) => {
  // document.documentElement.scrollTop - same as window.scrollY if root element (html)
  const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight)) * 100;
  // console.log(scrollPercent);
});

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

function initParticlesRandom() {
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
}

function initParticles() {
  count = (length / 64) ** 2;
  const distance = 64;
  const offsetX = startX + distance / 2;
  const offsetY = startY + distance / 2;
  
  for (let i = 0; i < length / distance; i++) {
    for (let j = 0; j < length / distance; j++) {
      const particleObj = {
        x: offsetX + j * distance,
        y: offsetY + i * distance,
        z: 0,
        rotationSpeed: 1 + Math.random(),
        rotX: Math.random() < 0.5,
        rotY: Math.random() < 0.5,
        rotZ: Math.random() < 0.5,
      };
      dummy.scale.set(1, 1, 1);
      dummy.position.set(camera.position.x, camera.position.y, 0); //
      dummy.updateMatrix(); //
      // console.log(dummy.matrix);
      mesh.setMatrixAt(i * (length / distance) + j, dummy.matrix); //
      color.setHex(0xffffff);
      mesh.setColorAt(i * (length / distance) + j, color);

      // dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      largeMesh.setMatrixAt(i * (length / distance) + j, dummy.matrix); //
      color.setHex(0x00ff00);
      largeMesh.setColorAt(i * (length / distance) + j, color);
      targetPositions.push({x: particleObj.x, y: particleObj.y, z: particleObj.z});
      particles.push(particleObj);
    }
  }

  /*
  let cur = 27;
  let next = 1;
  let layer = 1;
  let i = 0;
  let prev = 0;
  function initAnimation() {
    if (resizeRendererToDisplaySize(renderer)) {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    // 27 28 36 35 (bl br tr tl) -> 34 26 18 19 20 21 29 37 45 44 43 42
    const position = targetPositions[cur];
    dummy.position.set(position.x, position.y, position.z);
    dummy.updateMatrix();
    mesh.setMatrixAt(cur, dummy.matrix);
    largeMesh.setMatrixAt(cur, dummy.matrix);
  }
  */
}

requestAnimationFrame(animate);
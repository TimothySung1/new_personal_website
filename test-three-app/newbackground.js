import * as THREE from 'three';


// default setup
const canvas = document.querySelector('#welcome-canvas');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
// renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
);

camera.position.z = 75;

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

// create lights and other objects besides particles
const light = new THREE.PointLight(0xffffff, 1, 0, 0.01);
light.position.set(camera.position.x, camera.position.y, camera.position.z);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);

// start as 2d plane of particles, then on scroll, change to 3d cube (or some other shape)
// make wave effect around mouse

const particlesPerSide = 10;
const numParticles = particlesPerSide * particlesPerSide * particlesPerSide;
const particles = new Array(numParticles).fill(null);
const originalPositions = new Array(numParticles).fill(null);
const targetPositions = new Array(numParticles).fill(null);

const particleGeometry = new THREE.BoxGeometry(1, 1, 1);
const particleMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
const particlesMesh = new THREE.InstancedMesh(particleGeometry, particleMaterial, numParticles);

const distance = 10;
const startX = -45;
const startY = startX;

// dummy object
const dummy = new THREE.Object3D();
const mat4 = new THREE.Matrix4();
const vec3 = new THREE.Vector3();

// initialize 2d particles
for (let i = 0; i < particlesPerSide; i++) {
  const y = startY + i * distance;
  for (let j = 0; j < particlesPerSide; j++) {
    const x = startX + j * distance;
    const z = 0;
    const position = {
      x,
      y,
      z,
    };
    
    const index = i * particlesPerSide + j;
    dummy.position.set(0, 0, 0);
    dummy.updateMatrix();
    particlesMesh.setMatrixAt(index, dummy.matrix);

    particles[index] = {
      position,
    };
    originalPositions[index] = position;
    targetPositions[index] = position;
  }
}

for (let i = particlesPerSide ** 2; i < numParticles; i++) {
  dummy.position.set(0, 200, 0);
  dummy.updateMatrix();
  particlesMesh.setMatrixAt(i, dummy.matrix);
  const position = {
    x: 0,
    y: 200,
    z: 0,
  }
  originalPositions[i] = position;
  particles[i] = {
    position,
  };
}

// initialize big objects on the side, have big objects track mouse position
// bigObjects contains two arrays: 1 for the bigger objects in the center, 1 for the smaller but big objects on the top and bottom
const bigObjects = [];
bigObjects.push([]);
bigObjects.push([]);
const biggerCount = 6;
const smallerCount = 8;

const biggerGeometry = new THREE.OctahedronGeometry(40);
const biggerMaterial = new THREE.MeshPhongMaterial({color: 0x242424});

const smallerGeometry = new THREE.TetrahedronGeometry(18);
const smallerMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});

// left
buildBiggerObjects(startX - 255); // starts at -300 
// right
buildBiggerObjects(startX + 145); // start at 100

// handle mouse movement with bigger objects (larger "follows" mouse), smaller rotates but follows mouse a little
// x rotations are the same, y rotations differ based on x position of mouse (farther away, less rotation)
let moved = false;
let mouseDown = false;
const pointer = new THREE.Vector2();
const Direction = Object.freeze({
  UP: Symbol('up'),
  DOWN: Symbol('down'),
  RIGHT: Symbol('right'),
  LEFT: Symbol('left'),
});
const minMovement = 0.5;

canvas.addEventListener('mousedown', (event) => {
  pointer.set(event.clientX, event.clientY);
  mouseDown = true;
});

canvas.addEventListener('mouseup', () => {
  mouseDown = false;
});

window.addEventListener('mousemove', (event) => {
  if (!mouseDown) return;

  const dx = event.clientX - pointer.x;
  const dy = event.clientY - pointer.y;
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  rotateLargeObjects(dx, -dy, event);
});

function rotateLargeObjects(dx, dy, event) {
  
  if (Math.abs(dx) > minMovement) {
    moved = true;
    for (const largeObj of bigObjects[0]) {
      const x = event.clientX - window.innerWidth / 2;
      const distance = Math.max(Math.abs(x - largeObj.position.x), 50);
      const factor = 0.001 * x / (distance + 0.1);
      largeObj.rotation.x += dx * factor;
    }
  }
  if (Math.abs(dy) > minMovement) {
    moved = true;
    for (const largeObj of bigObjects[0]) {
      const x = event.clientX - window.innerWidth / 2;
      const distance = Math.max(Math.abs(x - largeObj.position.x), 50);
      const factor = 0.001 * x / (distance + 0.1);
      largeObj.rotation.y += dy * factor;
    }
  }
}

addObjectsToScene();

// initialize starting animation variables
let startAnimationIndex = 0;
let dl = 10;
let dr = 9;
let ul = 90;
let ur = 99;
let change = 1;


function animate(time) {
  if (resizeRendererToDisplaySize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  // time elapsed in seconds
  const t = time / 1000;
  // starting animation
  if (startAnimationIndex < particlesPerSide ** 2) {
    startingAnimation();
  } else {
    animationScripts.forEach((animation) => {
      if (scrollPercent >= animation.start && scrollPercent < animation.end) {
        animation.execute();
      }
    })
  }
  
  // large rotations
  for (let i = 0; i < biggerCount; i++) {
    const largeObj = bigObjects[0][i];
    largeObj.rotation.x += i < 3 ? 0.001 : -0.001;
    largeObj.rotation.y += i < 3 ? 0.001 : -0.001;
    largeObj.rotation.z += i < 3 ? 0.001 : -0.001;
    largeObj.ref.rotation.y = largeObj.rotation.y;
    largeObj.ref.rotation.x = largeObj.rotation.x;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// handle scroll animations
let scrollPercent = 0;
window.addEventListener('scroll', (event) => {
  scrollPercent = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
  console.log(scrollPercent);
});

const animationScripts = [];

// linear interpolation for a single start and end value
function lerp(xi, xf, a) {
  return (1 - a) * xi + a * xf;
}

// transforms the scroll percent into the percent that a phase is proceeded with
function percentPhase(start, end) {
  return (scrollPercent - start) / (end - start);
}

// put the camera such that the 3d cube is now on the middle left, not obstructing text
// also make the 3d cube with potentially another object in the center
function firstTransition() {
  const phase = percentPhase(5, 20);
  const x = lerp(0, 200, phase);
  const y = lerp(0, 75, phase);
  const z = lerp(75, 125, phase);

  const lookx = lerp(0, 150, phase);
  const looky = lerp(0, 0, phase);
  camera.position.set(x, y, z);
  vec3.set(lookx, looky, 0);
  camera.lookAt(vec3);

  // raise large objects out of view
  const destY = 300;
  const destZ = 100;
  for (let i = 0; i < biggerCount; i++) {
    if (i < 3) {
      bigObjects[0][i].ref.position.y = lerp(0, -destY - i * 50, phase);
      bigObjects[0][i].ref.position.z = lerp(0, destZ + (2 - i) * 50, phase);
    } else {
      bigObjects[0][i].ref.position.y = lerp(0, destY + 100 - (i - 3) * 50, phase);
      bigObjects[0][i].ref.position.z = lerp(0, -destZ - (i - 3) * 50, phase);
    }
  }

  for (let i = 0; i < smallerCount; i += 2) {
    const small1 = bigObjects[1][i];
    const small2 = bigObjects[1][i + 1];
    if (i < 4) {
      small1.ref.position.y = lerp(0, -destY - i * 25 - 25, phase) + small1.position.y;
      small1.ref.position.z = lerp(0, destZ + (2 - i) * 25 + 25, phase);
      small2.ref.position.y = lerp(0, -destY - i * 25 - 25, phase) + small2.position.y;
      small2.ref.position.z = lerp(0, destZ + (2 - i) * 25 + 25, phase);
    } else {
      small1.ref.position.y = lerp(0, destY + 75 - (i - 4) * 25, phase) + small1.position.y;
      small1.ref.position.z = lerp(0, -destZ - (i - 4) * 25 - 25, phase);
      small2.ref.position.y = lerp(0, destY + 75 - (i - 4) * 25, phase) + small2.position.y;
      small2.ref.position.z = lerp(0, -destZ - (i - 4) * 25 - 25, phase);
    }
  }
}

animationScripts.push({
  start: 5,
  end: 20,
  execute: firstTransition,
})

function firstAnimation() {

}

// change to go next when the particle finishes, not on time
function startingAnimation() {
  let i = startAnimationIndex;
  const targetPosition = targetPositions[i];
  particlesMesh.getMatrixAt(i, mat4);
  mat4.decompose(dummy.position, dummy.rotation, dummy.scale);
  // ...Object.values(targetPosition)
  vec3.set(targetPosition.x, targetPosition.y, targetPosition.z);

  // if distance to target is less than threshold, then put target to position, go next
  if (dummy.position.distanceTo(vec3) < 10) {
    dummy.position.set(vec3.x, vec3.y, vec3.z);
    startAnimationIndex = next(startAnimationIndex);
  } else {
    dummy.position.lerp(vec3, 0.3);
  }

  dummy.updateMatrix();

  particlesMesh.setMatrixAt(i, dummy.matrix);
  particlesMesh.instanceMatrix.needsUpdate = true;

  // returns next index, spiral from bottom left
  function next(i) {
    // last particle
    if (i === 54) {
      return Number.MAX_VALUE;
    }
    if (i === dl) {
      change = 1;
      dl += 11;
    } else if (i === dr) {
      change = 10;
      dr += 9;
    } else if (i === ul) {
      change = -10;
      ul -= 9;
    } else if (i === ur) { 
      change = -1
      ur -= 11;
    }
    i += change;
    return i;
  }
}

function buildBiggerObjects(startX) {
  const startingY = 0;
  for (let i = 0; i < biggerCount / 2; i++) {
    const biggerPosition = {
      x: startX + i * 100,
      y: 0,
      z: 0,
    };
    const biggerMesh = new THREE.Mesh(biggerGeometry, biggerMaterial);
    biggerMesh.position.set(biggerPosition.x, startingY, 0);
    bigObjects[0].push({
      ref: biggerMesh,
      position: biggerPosition,
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      }
    });
    if (i === biggerCount / 2 - 1) break;
    const topSmallerPosition = {
      x: biggerPosition.x + 50,
      y: 35,
      z: 0,
    };
    const bottomSmallerPosition = {
      x: topSmallerPosition.x,
      y: -topSmallerPosition.y,
      z: 0,
    };
  
    const tsMesh = new THREE.Mesh(smallerGeometry, smallerMaterial);
    tsMesh.position.set(topSmallerPosition.x, topSmallerPosition.y, 0);
    const bsMesh = new THREE.Mesh(smallerGeometry, smallerMaterial);
    bsMesh.position.set(bottomSmallerPosition.x, bottomSmallerPosition.y, 0);
    bigObjects[1].push({
      ref: tsMesh,
      position: topSmallerPosition,
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      }
    });
    bigObjects[1].push({
      ref: bsMesh,
      position: bottomSmallerPosition,
      rotation: {
        x: 0,
        y: 0,
        z: 0,
      }
    });
  }
}

function addObjectsToScene() {
  scene.add(light);
  scene.add(ambientLight);
  scene.add(particlesMesh);
  for (const arr of bigObjects) {
    for (const obj of arr) {
      scene.add(obj.ref);
    }
  }
}

requestAnimationFrame(animate);
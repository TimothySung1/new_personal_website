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

  // 4x4 transformation matrix:
  /*
  [
    [3x3 scale * rotation matrix], x
    ""                           , y
    ""                           , z
    0       , 0       , 0      , 1
  ]
  */

  for (let i = 0; i < count; i++) {
    const matrix = new THREE.Matrix4();
    matrix.setPosition(new THREE.Vector3(particles[i].x, particles[i].y, particles[i].z));
    particlesMesh.setMatrixAt(i, matrix)
  }

  scene.add(particlesMesh);
  scene.add(light);
  // renderer.render(scene, camera);

  const dummy = new THREE.Object3D();
  function animate() {
    particles.forEach((particle, index) => {
      let { factor, speed, x, y, z } = particle;

      // Update the particle time
      const t = (particle.time += speed);

      // Update the particle position based on the time
      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      // Derive an oscillating value for size and rotation
      const s = Math.cos(t);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      particlesMesh.setMatrixAt(index, dummy.matrix);
    });
    particlesMesh.instanceMatrix.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}
// particleSystem();

function waveSystem() {
  const canvas = document.querySelector('#welcome-canvas');
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
  // resizeRendererToDisplaySize(renderer);
  renderer.setSize(window.innerWidth, window.innerHeight);
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight
  );
  camera.position.set(-10, -15, 20);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  const scene = new THREE.Scene();
  const light = new THREE.PointLight(0xffffff, 50, 0, 0.5);
  light.position.set(0, 0, 20);

  // particles
  const count = 1000;
  const geometry = new THREE.DodecahedronGeometry(.2, 0);
  const material = new THREE.MeshPhongMaterial({color: 0x00e591})
  const mesh = new THREE.InstancedMesh(geometry, material, count);

  const particles = new Array(count);
  const dummy = new THREE.Object3D();
  // -10 to 10
  const length = 20;
  const area = length * length;
  const distance = area / count;
  for (let i = 0; i < count; i++) {
    const row = i * distance / length;
    const col = (i * distance) % length;
    // console.log(row + " " + col);
    particles[i] = {
      x: -10 + row,
      y: -10 + col,
      z: 0,
      t: 0,
    };
    dummy.position.set(particles[i].x, particles[i].y, particles[i].z);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;

  function animate(time) {
    particles.forEach((particle, i) => {
      const {x, y, z, t} = particle;
      dummy.position.set(x, y, Math.sin(y + t / 100));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      particles[i] = {x, y, z: dummy.position.z, t: t + 1};
    });
    mesh.instanceMatrix.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  scene.add(light);
  scene.add(mesh);
  addAxes(scene);
  addDirection(scene);
  // renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

waveSystem();

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  // consider pixel ratio of different monitors, multiply height and width by pixelRation | 0
  const pixelRatio = window.devicePixelRatio;
  // canvas.width and canvas.height are the drawing buffer size (rendering resolution)
  // client is css size on the page
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function addAxes(scene) {
  const xmaterial = new THREE.LineBasicMaterial({color: 0xff0000});
  const ymaterial = new THREE.LineBasicMaterial({color: 0x00ff00});
  const zmaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
  const xaxis = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-100, 0, 0), new THREE.Vector3(100, 0, 0)]);
  const yaxis = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -100, 0), new THREE.Vector3(0, 100, 0)]);
  const zaxis = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -100), new THREE.Vector3(0, 0, 100)]);
  scene.add(new THREE.Line(xaxis, xmaterial));
  scene.add(new THREE.Line(yaxis, ymaterial));
  scene.add(new THREE.Line(zaxis, zmaterial));
}

function addDirection(scene) {
  const pos = new THREE.MeshBasicMaterial({color: 0xffffff});
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const x = new THREE.Mesh(geometry, pos);
  const y = new THREE.Mesh(geometry, pos);
  const z = new THREE.Mesh(geometry, pos);
  x.position.set(12, 0, 0);
  y.position.set(0, 12, 0);
  z.position.set(0, 0, 12);
  scene.add(x);
  scene.add(y);
  scene.add(z);
}

function dashedLines() {
  const canvas = document.querySelector('#welcome-canvas');
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
  // resizeRendererToDisplaySize(renderer);
  renderer.setSize(window.innerWidth, window.innerHeight);
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight
  );
  camera.position.z = 20;
  const scene = new THREE.Scene();
  const material = new THREE.LineDashedMaterial({
    color: 0xff0000,
    linewidth: 1,
    scale: 1,
    dashSize: 0.1,
    gapSize: 4,
  });

  const lines = getLines();
  const line = lines[0];
  const geometry = new THREE.BufferGeometry().setFromPoints(line.curve);

  const mesh = new THREE.Line(geometry, material);
  mesh.computeLineDistances();
  scene.add(mesh);
  console.log(material);
  console.log(mesh);
  function animate(time) {
    // console.log(time);
    // mesh.rotateOnAxis(new THREE.Vector3(0, 0, 1), 0.01);
    // console.log(material.uniforms);
    mesh.computeLineDistances();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

// dashedLines();

function getLines() {
  const lineCount = 1;
  return new Array(lineCount).fill().map((_, index) => {
    // starting position
    const radius = 2;
    const radiusVariance = () => Math.random() / 10 + .95;
    const pos = new THREE.Vector3(
      Math.sin(0) * radius * radiusVariance(),
      Math.cos(0) * radius * radiusVariance(),
      0
    );
    // Increment the angle to create the points
    const points = new Array(21).fill().map((_, index) => {
      const angle = (index / 20) * Math.PI * 2;
      return pos
        .add(
          new THREE.Vector3(
            Math.sin(angle) * radius * radiusVariance(),
            Math.cos(angle) * radius * radiusVariance(),
            Math.sin(angle) * Math.cos(angle) * radius * radiusVariance()
          )
        )
        .clone();
    });
    // convert points into a curve
    const curve = new THREE.CatmullRomCurve3(points).getPoints(1000);

    return {
      color: 0xff0000,
      width: Math.max(0.1, (0.2 * index) / 10),
      speed: Math.max(0.001, 0.004 * Math.random()),
      curve,
    };
  });
}
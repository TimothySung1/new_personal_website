import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.body.appendChild(renderer.domElement);

// create cube
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
// animate();

// draw lines
// create renderer for lines
const lineRenderer = new THREE.WebGLRenderer();
lineRenderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
// add line renderer to dom
document.body.appendChild(lineRenderer.domElement);

// create camera
//                                            fov   aspect ratio                   near limit far limit
const lineCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
lineCamera.position.set(0, 0, 100);
lineCamera.lookAt(0, 0, 0);

// create scene
const lineScene = new THREE.Scene();

// create line material
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

// create points for the line(s)
const linePoints = [];
linePoints.push(new THREE.Vector3(-10, 0, 0)); // lines drawn from 1 to 2, 2 to 3, not 1 to 3
linePoints.push(new THREE.Vector3(0, 10, 0));
linePoints.push(new THREE.Vector3(10, 0, 0));

const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);
const line = new THREE.Line(lineGeometry, lineMaterial);
lineScene.add(line);
lineRenderer.render(lineScene, lineCamera);

animate();
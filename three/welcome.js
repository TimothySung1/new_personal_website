import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import fs from 'fs';

function main() {
  const canvas = document.querySelector("#c");

  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
  // font, size, height, curveSegments, bevelEnabled, bevelThickness, bevelSize, bevelOffset, bevelSegments
  const geometry = new TextGeometry( 'Welcome to my website!', {
    font: JSON.parse(fs.readFileSync('./fonts/typefacejsons/Play_Regular.json')),
  });

  const material = new THREE.MeshPhongMaterial({color: 0x123456});
  const mesh = new THREE.Mesh(geometry, material);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 2, .1, 5);
  renderer.render(scene, camera);
}

main();
// https://threejs.org/manual/#en/fundamentals
import * as THREE from 'three';

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera defaults to looking down -z axis with +y up
  camera.position.z = 2;

  // scene is the root of a scene graph
  const scene = new THREE.Scene();
  const boxLength = 1;
  // geometry is shape of object
  const geometry = new THREE.BoxGeometry(boxLength, boxLength, boxLength);
  /*
  // material is color and "texture" (different from THREE texture)
  const material = new THREE.MeshPhongMaterial({color: 0x44aa88});
  // mesh takes geometry and material to create model/object, sets position
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  */
 
  // add cubes
  const cubes = [
    makeInstance(geometry, 0x44aa88, 0),
    makeInstance(geometry, 0x8844aa, -2),
    makeInstance(geometry, 0xaa8844, 2),
  ]

  // render the scene with camera
  renderer.render(scene, camera);
  
  // add light source
  const color = 0xFFFFFF;
  const intensity = 3;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  // requestAnimationFrame requests the browser to animate something.
  // if display of page changes, then browser rerenders the page.
  // requestAnimationFrame passes the time since page loaded. time is in milliseconds
  requestAnimationFrame(render);

  function render(time) {
    // console.log(time);
    time *= 0.001; // convert time to seconds
    
    /*
    cube.rotation.x = time; // rotate 1 radian per second
    cube.rotation.y = time;
    */

    cubes.forEach((cube, i) => {
      const speed = 1 + i * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});
   
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
   
    cube.position.x = x;
   
    return cube;
  }
}

main();
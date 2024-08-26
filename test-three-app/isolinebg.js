import * as THREE from 'three';
import ImprovedNoise from './improvedNoise';

/* refs:
  https://threejs.org/docs/#api/en/materials/ShaderMaterial
  https://jsfiddle.net/prisoner849/ag09r4pL/
  https://discourse.threejs.org/t/how-to-add-contour-lines-to-terrain/58484/4
  https://www.shadertoy.com/view/dt2SRD
  https://threejs.org/examples/webgl_lines_fat.html
  https://github.com/VincentGarreau/particles.js/
  https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html
  https://stackoverflow.com/questions/59548828/how-to-give-vertex-shader-to-a-geometry-without-changing-the-material-in-threejs
*/

const canvas = document.querySelector('#welcome-canvas');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
// renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  canvas.clientWidth / canvas.clientHeight,
);
// camera.position.set(0, 0, 250);
camera.position.set(0, 0, 50);

// create lighting
const light = new THREE.PointLight(0xffffff, 120, 0, 0.1);
light.position.set(camera.position.x, camera.position.y, camera.position.z);
scene.add(light);

// define plane shaders and colors
const planeGeometry = new THREE.PlaneGeometry(25, 25, 250, 250);
const defaultColor = new THREE.Color(THREE.Color.NAMES.black);
const uniforms = {
  u_time: { value: 1.0 },
  u_color: { value: defaultColor }
}
const positions = planeGeometry.attributes.position;
const vertexCount = positions.count;
const noiseData = new Float32Array(vertexCount);

// populate noise based on vertex x and y
const Noise = new ImprovedNoise();
for (let i = 0; i < vertexCount; i++) {
  const noise = Noise.noise(positions.getX(i), positions.getY(i), 0);
  noiseData[i] = noise;
}
const noiseAttribute = new THREE.BufferAttribute(noiseData, 1);
planeGeometry.setAttribute("a_noise_data", noiseAttribute);

const shaderMaterial = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: `
    varying vec3 v_pos;
    varying float v_noise_data;
    attribute float a_noise_data;

    void main() {
      v_pos = position;
      v_noise_data = a_noise_data;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    uniform float u_time;
    uniform vec3 u_color;
    varying vec3 v_pos;
    varying float v_noise_data;

    void main() {
      float lineThickness = 1.0;
      float scaled_noise = v_noise_data / 2.;
      float grid = abs(fract(scaled_noise - 0.5) - 0.5) / fwidth(scaled_noise) / lineThickness;
      float line = min(grid, 1.0);
      vec3 lineCol = mix(vec3(1, 1, 0), vec3(0, 1, 1), grid);
      vec3 col = mix(lineCol, u_color, line);
      gl_FragColor = vec4(col, 1);
    }
  `,
  onBeforeCompile: (shader, renderer) => {
    console.log(shader.vertexShader);
    console.log(shader.fragmentShader);
  }
});

const planeMesh = new THREE.Mesh(planeGeometry, shaderMaterial);
scene.add(planeMesh);

function animate(time) {
  // console.log('animate');
  if (resizeRendererToDisplaySize(renderer)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  for (let i = 0; i < noiseAttribute.count; i++) {
    noiseAttribute.setX(i, Noise.noise(positions.getX(i), positions.getY(i), time / 5000));
  }
  noiseAttribute.needsUpdate = true;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

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

requestAnimationFrame(animate);
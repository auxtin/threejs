import * as THREE from 'three';
import { DoubleSide, TetrahedronGeometry } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);


// HELPERS
const orbit = new OrbitControls(camera,renderer.domElement);
// helper function to show the x,y,z
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10,30,30);
orbit.update();

// create + add box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color:0x00FF00});
const box = new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(box);

// create + add plane
const planeGeometry = new THREE.PlaneGeometry(30,30);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    side: DoubleSide
});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);
plane.rotation.x = Math.PI * -0.5;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// create + add sphere
const sphereGeometry = new THREE.SphereGeometry(4,100,100);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000FF,
    wireframe: true
    }
);
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);

// create + add sus
// let sus;
// const glftLoader = new GLTFLoader();

// glftLoader.load('./assets/among-us-character.glb', (gltfScene) => {
//     loadedModel = gltfScene;
//     animate();
// };
// rotation
function animate (time) {
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);

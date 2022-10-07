import * as THREE from 'three';
import { AmbientLight, DoubleSide, TetrahedronGeometry } from 'three';
import * as dat from 'dat.gui';
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
const planeMaterial = new THREE.MeshStandardMaterial({
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
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000FF,
    wireframe: false
    }
);
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);

sphere.position.set(-10,10,0)

// lighting
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xFFFFFF,0.8);
scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);
// light helpers
const dLightHelper = new THREE.DirectionalLightHelper(directionalLight,5);
scene.add(dLightHelper);
// GUI
// slider for adjusting sphere color
const gui = new dat.GUI();
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01
}
gui.addColor(options,'sphereColor').onChange(function(e) {
    sphere.material.color.set(e)
})

gui.add(options,'wireframe').onChange(function(e) {
    sphere.material.wireframe = e;
})
gui.add(options,'speed',0, 0.1);


let step = 0;
// create + add sus
// let sus;
// const glftLoader = new GLTFLoader();

// glftLoader.load('./assets/among-us-character.glb', (gltfScene) => {
//     loadedModel = gltfScene;
//     animate();
// };
// rotation
function animate (time) {
    // rotation
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;
    // bouncing
    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);

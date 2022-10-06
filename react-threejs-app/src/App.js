import * as THREE from 'three';



function App() {
  // return (
  //   // <div className="App">
  //   //  Hello world
  //   // </div>
  // );
  const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
			// Create a cube
			// const geometry  =new THREE.BoxGeometry( 1, 1, 1 );
			// const material  =new THREE.MeshBasicMaterial( { color: 0xFFC0CB} );
			// const cube  =new THREE.Mesh( geometry, material );
			// scene.add( cube );

			// create a dodecahedron
			const geometry = new THREE.DodecahedronGeometry(7,10);
			// const material = new THREE.MeshBasicMaterial({color: 0xFFC0CB});
			const doda = new THREE.Mesh(geometry);
			scene.add(doda);

			camera.position.z = 5;
			// anime and render the scene
			function animate() {
				requestAnimationFrame( animate );
				// cube.rotation.x += 0.01;
				// cube.rotation.y += 0.01;
				// doda.rotation.x += 0.01;
				// doda.rotation.y += 0.01;
				renderer.render( scene, camera );
			}
			animate();
}

export default App;

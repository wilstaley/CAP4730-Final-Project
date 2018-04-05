//setup
let width = window.innerWidth;
let height = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, width/height, 1, 1000 );
                                              //fov,aspect,near,far

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//Add objects to the scene
var geometry = new THREE.TorusKnotBufferGeometry( 10, 3, 200, 16, 20, 3);
var material = new THREE.MeshNormalMaterial();
var knot = new THREE.Mesh( geometry, material );
scene.add( knot );


knot.position.z = -50;
camera.position.z = 5;

var animate = function () {
	requestAnimationFrame( animate );
  knot.rotation.x += .03;
  knot.rotation.y += .01;
	renderer.render(scene, camera);
};

animate();

//Adjust aspect ratio for window resize
window.addEventListener('resize', onWindowResize, false);
function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight);
}



var fovSlider = document.getElementById("fovRange");
var fovOutput = document.getElementById("fovNum");
fovOutput.innerHTML = fovSlider.value; // Display the default slider value

//On slider change
fovSlider.oninput = function() {
    //change slider's display value
    fovOutput.innerHTML = this.value;
    //change the camera's fov
    camera.fov = parseInt(this.value);
    camera.updateProjectionMatrix();
}



var nearSlider = document.getElementById("nearRange");
var nearOutput = document.getElementById("nearNum");
nearOutput.innerHTML = nearSlider.value; // Display the default slider value

//On slider change
nearSlider.oninput = function() {
    //change slider's display value
    nearOutput.innerHTML = this.value;
    //change the camera's near clipping plane
		camera.near = parseInt(this.value);
    camera.updateProjectionMatrix();
}



var farSlider = document.getElementById("farRange");
var farOutput = document.getElementById("farNum");
farOutput.innerHTML = farSlider.value; // Display the default slider value

//On slider change
farSlider.oninput = function() {
    //change slider's display value
    farOutput.innerHTML = this.value;
    //change the camera's near clipping plane
		camera.far = parseInt(this.value);
    camera.updateProjectionMatrix();
}

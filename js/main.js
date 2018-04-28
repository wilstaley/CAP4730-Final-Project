//Setup
let width = window.innerWidth;
let height = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, width/height, 1, 1000 );
                                              //fov,aspect,near,far
camera.position.z = 5;
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//Add torus to the scene
var geometry = new THREE.TorusKnotBufferGeometry( 10, 3, 200, 16, 20, 3);
var material = new THREE.MeshNormalMaterial();
var knot = new THREE.Mesh( geometry, material );
knot.castShadow = true;
scene.add( knot );
knot.position.z = -50;


//Load texture for cube
var texture = new THREE.TextureLoader().load( "textures/metalbox_full.png" );

//Add cube to the scene
var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
var material = new THREE.MeshLambertMaterial( {
	map: texture
} );
// material.lights = true;
var cube = new THREE.Mesh( geometry, material );
cube.position.z = -50;
cube.visible = false;
scene.add( cube );


var loader = new THREE.TGALoader();
var plant_texture = loader.load(
	'textures/plant_texture.tga',
	//called when loading is completed
	function ( texture ) {
		console.log( 'Texture is loaded' );
	},
	//called when the loading is in progresses
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	//called when the loading fails
	function ( error ) {
		console.log( 'An error happened' );
	}
);

var id;
var toggle = document.getElementById("toggle");
function showPlant(display){
	var objLoader = new THREE.OBJLoader();
	objLoader.load('plant.obj',
		//called when loading is completed
		function (obj) {
			if(display){
		    obj.traverse(function (child) {
		        if (child instanceof THREE.Mesh) {
		            child.material = new THREE.MeshLambertMaterial(
									{map: plant_texture, wireframe: toggle.checked});
		        }
		    });
				obj.position.z = -50;
				obj.position.y = -20;
				id = obj.id;
				var animate = function () {
					requestAnimationFrame( animate );
				  obj.rotation.y += .01;
					renderer.render(scene, camera);
				};
				animate();
		    scene.add(obj);
			}
			else{
		    var object = scene.getObjectById(id, true);
				scene.remove(object);
			}
		},
		//called when loading is in progresses
		function ( xhr ) {
			console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		//called when loading has errors
		function ( error ) {
			console.log( 'An error happened' );
		}
	);
}


//Animate the meshes
var animate = function () {
	requestAnimationFrame( animate );
  knot.rotation.x += .03;
  knot.rotation.y += .01;
	// cube.rotation.x += .01;
	cube.rotation.y += .01;
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


//Update camera's projection matrix on FOV slider change
var fovSlider = document.getElementById("fovRange");
var fovOutput = document.getElementById("fovNum");
fovOutput.innerHTML = fovSlider.value; // Display the default slider value
fovSlider.oninput = function() {
    //change slider's display value
    fovOutput.innerHTML = this.value;
    //change the camera's fov
    camera.fov = parseInt(this.value);
    camera.updateProjectionMatrix();
}


//Update camera's projection matrix on Near slider change
var nearSlider = document.getElementById("nearRange");
var nearOutput = document.getElementById("nearNum");
nearOutput.innerHTML = nearSlider.value; // Display the default slider value
nearSlider.oninput = function() {
    //change slider's display value
    nearOutput.innerHTML = this.value;
    //change the camera's near clipping plane
		camera.near = parseInt(this.value);
    camera.updateProjectionMatrix();
}


//Update camera's projection matrix on Far slider change
var farSlider = document.getElementById("farRange");
var farOutput = document.getElementById("farNum");
farOutput.innerHTML = farSlider.value; // Display the default slider value
farSlider.oninput = function() {
    //change slider's display value
    farOutput.innerHTML = this.value;
    //change the camera's near clipping plane
		camera.far = parseInt(this.value);
    camera.updateProjectionMatrix();
}


//Changing between models
var select = document.getElementById("model-select");
select.addEventListener("change", ()=>{
	var selectedModel = select.options[select.selectedIndex].value;
	if(selectedModel === "torus"){
		cube.visible = false;
		showPlant(false);
		knot.visible = true;
		toggleWireframe();
	}
	else if(selectedModel === "box"){
		knot.visible = false;
		showPlant(false);
		cube.visible = true;
		toggleWireframe();
	}
	else if(selectedModel === "plant"){
		knot.visible = false;
		cube.visible = false;
		showPlant(true);
		toggleWireframe();
	}
})


//Toggle wireframe on/off
toggle.addEventListener('click', toggleWireframe);

function toggleWireframe(){
	if(knot.visible){
		knot.material.setValues({wireframe: toggle.checked});
	}
	else if(cube.visible){
		cube.material.setValues({wireframe: toggle.checked});
	}
	else if(!knot.visible && !cube.visible){
		showPlant(false);
		showPlant(true);
	}
}

var light = new THREE.AmbientLight( 0xaaaaaa ); // soft white light
scene.add( light );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );
directionalLight.position.set(0,0,1);

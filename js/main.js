//setup
let width = window.innerWidth;
let height = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, width/height, 1, 1000 );
                                              //fov,aspect,near,far

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );




//Add light to the scene
var light = new THREE.AmbientLight( 0xf0f0f0 ); // soft white light
scene.add( light );
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position = (0,0,1);
scene.add( directionalLight );


//Add torus to the scene
var geometry = new THREE.TorusKnotBufferGeometry( 10, 3, 200, 16, 20, 3);
var material = new THREE.MeshNormalMaterial();
var knot = new THREE.Mesh( geometry, material );
scene.add( knot );

knot.position.z = -50;
camera.position.z = 5;

var text1 = new THREE.Mesh();
var text2 = new THREE.Mesh();

//Add text to the scene
var loader = new THREE.FontLoader();

loader.load( 'font.json', function ( font ) {

	var U = new THREE.TextGeometry( 'U', {
		font: font,
		size: 8,
		height: 20,
		curveSegments: 2,
	} );

	var F = new THREE.TextGeometry( 'F', {
		font: font,
		size: 8,
		height: 20,
		curveSegments: 2,
	} );

	var textMaterial1 = new THREE.MeshLambertMaterial({
		wireframe: false,
		color: 0xff963a
	});
	textMaterial1.needsUpdate = true;
	var textMaterial2 = new THREE.MeshLambertMaterial({
		wireframe: false,
		color: 0x3657f9
	});

	text1 = new THREE.Mesh( U, textMaterial1 );
	text1.visible = false;
	scene.add(text1);
	text2 = new THREE.Mesh( F, textMaterial2 );
	text2.visible = false;
	scene.add(text2);
	// var pos = new THREE.Vector3(0,0,0);
	// text.position = pos;
	text1.position.z = -50;
	text1.position.x = -4;
	text1.position.y = -2;
	text2.position.z = -50;
	text2.position.x = 1;
	text2.position.y = -2;
});

// // instantiate a loader
// var loader = new THREE.OBJLoader();
//
// // load a resource
// loader.load(
// 	// resource URL
// 	'plant.obj',
// 	// called when resource is loaded
// 	function ( object ) {
//
// 		scene.add( object );
//
// 	},
// 	// called when loading is in progresses
// 	function ( xhr ) {
//
// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
//
// 	},
// 	// called when loading has errors
// 	function ( error ) {
//
// 		console.log( 'An error happened' );
//
// 	}
// );
//
// // Alternatively, to parse a previously loaded JSON structure
// var object = loader.parse( a_json_object );
//
// scene.add( object );


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


//Changing between models
var select = document.getElementById("model-select");
select.addEventListener("change", ()=>{
	var selectedModel = select.options[select.selectedIndex].value;
	if(selectedModel === "torus"){
		text1.visible = false;
		text2.visible = false;
		knot.visible = true;
		toggleWireframe();
	}
	else if(selectedModel === "text"){
		knot.visible = false;
		text1.visible = true;
		text2.visible = true;
		toggleWireframe();
	}
})


//Toggle wireframe on/off
var toggle = document.getElementById("toggle");
toggle.addEventListener('click', toggleWireframe);

function toggleWireframe(){
	if(text1.visible){
		text1.material.setValues({wireframe: toggle.checked});
		text2.material.setValues({wireframe: toggle.checked});
	}
	else if(knot.visible){
		knot.material.setValues({wireframe: toggle.checked});
	}
}

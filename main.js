import * as THREE from '/node_modules/three/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import { load_audience_kanye } from '/js/load_audience_kanye.js';

///////////// Page Loading /////////
var loadingPage = function () {
  var loading = document.getElementById( 'loading' );

  setInterval(function() {
        if (loading) {
          loading.remove()
        }
  }, 10000);
};
loadingPage();
/////////////////////////////////////

/// Landing Page Button Animation ///
var changeButtonText = function () {
  var text = ["Click to Relive", "Click to Rejoice", "Click to Reincarnate", "Click to Recreate", "Click to Resurrect"];

  const startButtonText = document.getElementById("startButton");

  let i = 0;
  setInterval(function() {
        if (startButtonText) {
          startButtonText.innerText = text[i];
          i = i + 1;
          if (i == text.length) {
            i =  0;
          }
        }
  }, 1000);
};
changeButtonText();
/////////////////////////////////////

////////// Global Variables ////////
var camera = null;
var listener = null;
var worldScene = null;
var stage = null;
////////////////////////////////////

/////////// Build World ////////////
load_audience_kanye();



var camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set( 120, 80, 15 );

var listener = new THREE.AudioListener();
camera.add( listener );

var worldScene = new THREE.Scene();


// STAGE // 
var geometry = new THREE.BoxGeometry( 60, 6, 90 );
var cubeMaterials = 
[
  new THREE.MeshBasicMaterial( { color: 0x2c2c2c, wireframe: true, side: THREE.DoubleSide } ), // RIGHT SIDE
  new THREE.MeshBasicMaterial( { color: 0x2c2c2c, wireframe: true, side: THREE.DoubleSide } ), // LEFT SIDE
  new THREE.MeshPhongMaterial( { color: 0x000000, side: THREE.FrontSide } ), // TOP SIDE
  new THREE.MeshBasicMaterial( { color: 0x2c2c2c, wireframe: true, side: THREE.DoubleSide } ), // BOTTOM SIDE
  new THREE.MeshBasicMaterial( { color: 0x2c2c2c, wireframe: true, side: THREE.DoubleSide } ), // FRONT SIDE
  new THREE.MeshBasicMaterial( { color: 0x2c2c2c, wireframe: true, side: THREE.DoubleSide } ), // BACK SIDE
]
var material = new THREE.MeshFaceMaterial( cubeMaterials );
var stage = new THREE.Mesh( geometry, material );
stage.position.set( -80, 15, -100 );
stage.receiveShadow = true;
worldScene.add( stage );
// STAGE //

// GENERAL ADMISSION FLOOR // 
var gaFloor = new THREE.Mesh(
  new THREE.PlaneGeometry( 720, 720, 30, 24 ),
  new THREE.MeshPhongMaterial( { color: 0x323330, wireframe: true, side: THREE.DoubleSide } )
)
gaFloor.position.set( 0, -20, 0 );
gaFloor.rotation.x = Math.PI / 2;
worldScene.add(gaFloor);
// GENERAL ADMISSION FLOOR // 

// LIGHTING // 
var directionalLight = new THREE.DirectionalLight( 0x655e66 );
worldScene.add( directionalLight );

var stageLight = new THREE.SpotLight( 0xf98125, 2 );
stageLight.position.set( 0, 150, 0 );
stageLight.angle = 0.47;
stageLight.penumbra = 0.6;

stageLight.target.position.set(stage.position.x, -150, stage.position.y );

worldScene.add( stageLight );
worldScene.add( stageLight.target );

// var spotLightHelper1 = new THREE.SpotLightHelper( stageLight );
// worldScene.add( spotLightHelper1 );
// LIGHTING // 

// MUSIC // 
var sound = new THREE.PositionalAudio( listener );
let yzy = 0;
var pabloSong = []
var changeAudioLoader = function () {
  pabloSong = 
  [
  'audio/0 Father Stretch.ogg',
  'audio/1 Pt. 2.ogg',
  'audio/2 Famous.ogg',
  'audio/3 Pop.ogg',
  'audio/4 That Part.ogg',
  'audio/5 Facts.ogg',
  'audio/6 Mercy.ogg',
  'audio/7 Dont Like.ogg',
  'audio/8 All Day.ogg',
  'audio/9 Black Skinhead.ogg',
  'audio/10 Niggas.ogg',
  'audio/11 Cant Tell.ogg',
  'audio/12 Power.ogg',
  'audio/13 Blood.ogg',
  'audio/14 Freestyle.ogg',
  'audio/15 Jesus Walks.ogg',
  'audio/16 Flashing.ogg',
  'audio/17 Highlights.ogg',
  'audio/18 Feedback.ogg',
  'audio/19 Wolves.ogg',
  'audio/20 Heartless.ogg',
  'audio/21 Runaway.ogg',
  'audio/22 Only One.ogg',
  'audio/23 I Love.ogg',
  'audio/24 Waves.ogg',
  'audio/25 All Lights.ogg',
  'audio/26 Good Life.ogg',
  'audio/27 Stronger.ogg',
  'audio/28 Touch Sky.ogg',
  'audio/29 Fade.ogg',
  'audio/30 Ultralight.ogg',
  ]

  var audioLoader = new THREE.AudioLoader();
  audioLoader.load( pabloSong[yzy], function( buffer ) {
    console.log(pabloSong[yzy]);
    sound.setBuffer( buffer );
    sound.setLoop(false);
    sound.setRefDistance(140);
    sound.play(); 
  });
};

if (sound) {
  sound.onEnded = function() {
    console.log('song ended');
    this.isPlaying = false; 
    yzy += 1;
    changeAudioLoader();
  };
};

worldScene.add( sound );

// Menu Song Selection // 
if (sound) {
  var setlistDropdown = document.getElementsByClassName("song-item");
  Array.from(setlistDropdown).forEach(function(song, index){
    song.addEventListener( 'click', function(e) {
      e.preventDefault();
      yzy = index;
      sound.stop();
      changeAudioLoader();
    });
  });
};
// MUSIC // 

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// CONTROLS // 
var controls = new OrbitControls( camera, renderer.domElement );
controls.maxPolarAngle = Math.PI/2; 
controls.autoRotate = true; 
controls.maxDistance = 300;
controls.keys = {
  LEFT: 76, //"L" key
  UP: 70, // "F" key
  RIGHT: 76, // "K" key
  BOTTOM: 66 // "B" key
};

var skipSong = document.addEventListener( 'keydown', function (e)
{
  if(e.keyCode == 32) {
    yzy += 1;
    if (yzy == pabloSong.length) {
      yzy = 0;
    } 
    sound.stop(); 
    changeAudioLoader();
  }
});

var stageRight = document.addEventListener( 'keydown', function (e)
{
  if(e.keyCode == 39) { // right arrow
    stage.position.x += 1;
    stageLight.target.position.x = stage.position.x;
  }
});
var stageLeft = document.addEventListener( 'keydown', function (e)
{
  if(e.keyCode == 37) { // left arrow
    stage.position.x -= 1;
    stageLight.target.position.x = stage.position.x;
  }
});
var stageForward = document.addEventListener( 'keydown', function (e)
{
  if(e.keyCode == 40) { // up arrow
    stage.position.z += 1;
    stageLight.target.position.z = stage.position.z;
  }
});
var stageBack = document.addEventListener( 'keydown', function (e)
{
  if(e.keyCode == 38) { // down arrow
    stage.position.z -= 1;
    stageLight.target.position.z = stage.position.z;
  }
});
// CONTROLS // 

// RESPONSIVE WINDOW // 
window.addEventListener( 'resize', function ( )
{
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize( width, height );
  camera.aspect = width / height;
  camera.updateProjectionMatrix( );
});

// ANIMATION //
var animate = function () {
  renderer.render( worldScene, camera );

  var targetPosition = 1;
  var originalPositionX = -80;
  var originalPositionZ = -100;

  if (stage.position.x >= originalPositionX && stage.position.y >= originalPositionZ) {
    if (stage.position.x <= targetPosition) {
      stage.position.x += 0.09;
      stage.position.z += 0.09;
      stageLight.target.position.x = stage.position.x;
      stageLight.target.position.z = stage.position.z;
      if (stage.position.x <= -59) {
        controls.update(); 
      }
    }
  }

  requestAnimationFrame( animate );
};
// ANIMATION //

///////////////// START MODEL LOADING FUNCTIONS ///////////////////////

/////////////////////////////////////////////////////////

var startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', function () {
  var overlay = document.getElementById( 'overlay' );
  overlay.remove()
  animate();
  changeAudioLoader(); 
});

var aboutLink = document.getElementById( 'aboutLink' );
var overlayAbout = document.getElementById( 'overlayAbout' );

aboutLink.addEventListener( 'click', function(e) {
  e.preventDefault();
  overlayAbout.style.zIndex = "1";
});

var exitOverlayAbout = document.getElementById( 'exitOverlayAbout' );
exitOverlayAbout.addEventListener( 'click', function(e) {
  e.preventDefault();
  overlayAbout.style.zIndex = "-1";
});

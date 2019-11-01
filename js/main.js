import * as THREE from '/node_modules/three/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import { loadAudience } from '/js/load_audience.js';
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { enableInlineVideo } from '/node_modules/iphone-inline-video';
///////////// Loading Page  /////////
var loadingPage = document.getElementById( 'loading' );

if(loadingPage) {
  setInterval(function() {
    if (loadingPage) {
      loadingPage.remove()
    }
  }, 15000);
}
/////////////////////////////////////

/// Landing Page Button Animation ///
var changeButtonText = function () {
  var text = ["Click to Relive", "Click to Rejoice", "Click to Reincarnate", "Click to Recreate", "Click to Resurrect"];

  var startButtonText = document.getElementById("startButton");

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
var worldScene, renderer, camera, listener, clock
var stage, stageLight, controls, mixer, actions
////////////////////////////////////

/////////// Build World ////////////
initScene();
initRenderer();
///////////////////////////////////

function initScene() { 
  
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.set( 120, 80, 15 );
  
  worldScene = new THREE.Scene();
  clock = new THREE.Clock(true);

  var auditoriumGeo = new THREE.BoxGeometry( 1, 1, 1 ); 
  var loader  = new THREE.TextureLoader();
  var texture = loader.load( "img_video/all-of-the-lights-w-blk.jpeg" );
  var material = new THREE.MeshBasicMaterial( {map: texture} );
  var auditorium = new THREE.Mesh(auditoriumGeo, material);
  auditorium.position.set( 0, 15, 0 );
  auditorium.scale.set( 800, 800, 800 );
  auditorium.material.side = THREE.BackSide;
  worldScene.add(auditorium);
  // texture.minFilter = THREE.LinearFilter;
  // worldScene.background = texture;
  
  var stageGeometry = new THREE.BoxGeometry( 60, 6, 90 );
  var stageMaterials = 
  [
    new THREE.MeshBasicMaterial( { color: 0x2c2c2c, wireframe: true, side: THREE.DoubleSide } ), // RIGHT SIDE
    new THREE.MeshBasicMaterial( { color: 0x2c2c2c, wireframe: true, side: THREE.DoubleSide } ), // LEFT SIDE
    new THREE.MeshPhongMaterial( { color: 0x000000, side: THREE.FrontSide } ), // TOP SIDE
    new THREE.MeshBasicMaterial( { color: 0x2c2c2c, wireframe: true, side: THREE.DoubleSide } ), // BOTTOM SIDE
    new THREE.MeshBasicMaterial( { color: 0x2c2c2c, wireframe: true, side: THREE.DoubleSide } ), // FRONT SIDE
    new THREE.MeshBasicMaterial( { color: 0x2c2c2c, wireframe: true, side: THREE.DoubleSide } ), // BACK SIDE
  ]
  
  stage = new THREE.Mesh( stageGeometry, stageMaterials );
  stage.position.set( -80, 15, -100 );
  stage.receiveShadow = true;
  worldScene.add( stage );

  
  /// Load Kanye Model + Animation ///
  var kanyeLoader = new GLTFLoader();
  kanyeLoader.load( 'js/models/kanyerapping.glb', function ( gltf ) {
    var model = gltf.scene;
    model.scale.set( 7, 7, 7 );
    model.position.y = 3.3;
    stage.add( model );
    console.log( "Done loading kanye model" );
    model.traverse( function ( object ) {
      if ( object.isMesh ) object.castShadow = true;
    } );
    //
    var animations = gltf.animations;
    mixer = new THREE.AnimationMixer( model );
    var rappingAction = mixer.clipAction( animations[ 0 ] );
    rappingAction.play();
  } );
  /////////////////////////////////////

  /// Audience Models ///
  loadAudience( worldScene, stage );
  /////////////////////////////////////
  
  var gaFloor = new THREE.Mesh(
    new THREE.PlaneGeometry( 720, 720, 30, 24 ),
    new THREE.MeshPhongMaterial( { color: 0x323330, wireframe: true, side: THREE.DoubleSide } )
    )
  gaFloor.position.set( 0, -20, 0 );
  gaFloor.rotation.x = Math.PI / 2;
  worldScene.add(gaFloor);

  var directionalLight = new THREE.DirectionalLight( 0x343234 );
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.top = 40;
  // directionalLight.shadow.camera.bottom = - 10;
  // directionalLight.shadow.camera.left = - 10;
  // directionalLight.shadow.camera.right = 10;
  // directionalLight.shadow.camera.near = 0.1;
  // directionalLight.shadow.camera.far = 40;
  worldScene.add( directionalLight );
  
  stageLight = new THREE.SpotLight( 0xf98125, 2 );
  stageLight.position.set( 0, 150, 0 );
  stageLight.angle = 0.47;
  stageLight.penumbra = 0.6;
  stageLight.castShadow = true;
  // stageLight.shadow.camera.top = 40;
  stageLight.target.position.set(stage.position.x, -150, stage.position.y );
  worldScene.add( stageLight );
  worldScene.add( stageLight.target );
  // var spotLightHelper1 = new THREE.SpotLightHelper( stageLight );
  // worldScene.add( spotLightHelper1 );
    
  window.addEventListener( 'resize', onWindowResize );

}
  
function initRenderer() {

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.gammaOutput = true;
  renderer.gammaFactor = 1.2;
  document.body.appendChild( renderer.domElement );
  
  controls = new OrbitControls( camera, renderer.domElement );
  controls.maxPolarAngle = Math.PI/2; 
  controls.autoRotate = true; 
  controls.maxDistance = 300;
  controls.keys = {
    LEFT: 76, //"L" key
    UP: 70, // "F" key
    RIGHT: 76, // "K" key
    BOTTOM: 66 // "B" key
  };
}

function initConcert() {

  listener = new THREE.AudioListener();
  camera.add( listener );

  var video = document.getElementById( 'video' );
  enableInlineVideo( video );
  video.play();
  var videoTexture = new THREE.VideoTexture( video );
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;
  videoTexture.format = THREE.RGBFormat;
  var videoMaterial = new THREE.MeshBasicMaterial( { color: 0xee9205, map: videoTexture, side: THREE.DoubleSide } );
  var videoBoxGeo = new THREE.PlaneGeometry( 30, 20, 32 );
  // var videoBoxGeo = new THREE.BoxGeometry( 1, 1, 1 ); 
  var videoBox = new THREE.Mesh( videoBoxGeo, videoMaterial );
  videoBox.position.set( 0, 100, 0 );
  videoBox.scale.set( 2, 2, 2 );
  worldScene.add( videoBox );
  console.log( "Done loading video" );

  var sound = new THREE.PositionalAudio( listener );
  let yzy = 0;
  var pabloSong = []
  function changeAudioLoader() {
    pabloSong = 
    [
      'audio/0 Father Stretch.mp3',
      'audio/1 Pt. 2.mp3',
      'audio/2 Famous.m4a',
      'audio/3 Pop.m4a',
      'audio/4 That Part.m4a',
      'audio/5 Facts.m4a',
      'audio/6 Mercy.m4a',
      'audio/7 Dont Like.m4a',
      'audio/8 All Day.m4a',
      'audio/9 Black Skinhead.m4a',
      'audio/10 Niggas.m4a',
      'audio/11 Cant Tell.m4a',
      'audio/12 Power.m4a',
      'audio/13 Blood.m4a',
      'audio/14 Freestyle.m4a',
      'audio/15 Jesus Walks.m4a',
      'audio/16 Flashing.m4a',
      'audio/17 Highlights.m4a',
      'audio/18 Feedback.m4a',
      'audio/19 Wolves.m4a',
      'audio/20 Heartless.m4a',
      'audio/21 Runaway.m4a',
      'audio/22 Only One.m4a',
      'audio/23 I Love.mp3',
      'audio/24 Waves.m4a',
      'audio/25 All Lights.m4a',
      'audio/26 Good Life.m4a',
      'audio/27 Stronger.m4a',
      'audio/28 Touch Sky.m4a',
      'audio/29 Fade.m4a',
      'audio/30 Ultralight.m4a'
    ]
  
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( pabloSong[yzy], function( buffer ) {
      console.log(pabloSong[yzy]);
      sound.setBuffer( buffer );
      sound.setLoop(false);
      sound.play(); 
      sound.setRefDistance(140);
    });
  };
  changeAudioLoader();
  worldScene.add( sound );
  
  
  ///////////////////////////////////
  /// MUSIC & STAGE CONTROLS
  //////////////////////////////////
  
  // Play next song on end // 
  if (sound) {
    sound.onEnded = function() {
      console.log('song ended');
      this.isPlaying = false; 
      yzy += 1;
      changeAudioLoader();
    };
  };
  
  // Choose song from menu // 
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
  
  // Skip Song -- Spacebar // 
  document.addEventListener( 'keydown', function (e)
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
  
  // Stage Right -- right arrow // 
  document.addEventListener( 'keydown', function (e)
  {
    if(e.keyCode == 39) { // right arrow
      stage.position.x += 1;
      stageLight.target.position.x = stage.position.x;
    }
  });
  
  // Stage Left -- left arrow // 
  document.addEventListener( 'keydown', function (e)
  {
    if(e.keyCode == 37) { // left arrow
      stage.position.x -= 1;
      stageLight.target.position.x = stage.position.x;
    }
  });
  
  // Stage Forward -- down arrow // 
  document.addEventListener( 'keydown', function (e)
  {
    if(e.keyCode == 40) { // up arrow
      stage.position.z += 1;
      stageLight.target.position.z = stage.position.z;
    }
  });
  
  // Stage Back -- up arrow // 
  document.addEventListener( 'keydown', function (e)
  {
    if(e.keyCode == 38) { // down arrow
      stage.position.z -= 1;
      stageLight.target.position.z = stage.position.z;
    }
  });

}

function onWindowResize() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize( width, height );
  camera.aspect = width / height;
  camera.updateProjectionMatrix( );
}

function animate() {
  requestAnimationFrame( animate );

  var mixerUpdateDelta = clock.getDelta();
  mixer.update( mixerUpdateDelta );

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

  renderer.render( worldScene, camera );
};

/// Remove Landing Page + Start Animation & Concert  ///
var startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', function () {
  initConcert(); 
  animate();
  var overlay = document.getElementById( 'overlay' );
  overlay.remove()
});

var startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'touchstart', function () {
  initConcert(); 
  animate();
  var overlay = document.getElementById( 'overlay' );
  overlay.remove()
});
/////////////////////////////////////////////////////////

//// About Page  ////
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
///////////////////

import * as THREE from '/node_modules/three/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import { loadAudienceKanye } from '/js/load_audience_kanye.js';

///////////// Loading Page  /////////
var loadingPage = document.getElementById( 'loading' );

setInterval(function() {
  if (loadingPage) {
    loadingPage.remove()
  }
}, 15000);
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
var worldScene, renderer, camera, listener
var stage, stageLight, controls
////////////////////////////////////

/////////// Build World ////////////
initScene();
initRenderer();
///////////////////////////////////

function initScene() { 
  
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.set( 120, 80, 15 );
  listener = new THREE.AudioListener();
  camera.add( listener );
  
  worldScene = new THREE.Scene();
  
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
  var material = new THREE.MeshFaceMaterial( stageMaterials );
  stage = new THREE.Mesh( stageGeometry, material );
  stage.position.set( -80, 15, -100 );
  stage.receiveShadow = true;
  worldScene.add( stage );

  loadAudienceKanye( worldScene, stage );
  
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

  var sound = new THREE.PositionalAudio( listener );
  let yzy = 0;
  var pabloSong = []
  function changeAudioLoader() {
    pabloSong = 
    [
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/0+Father+Stretch.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/media.io_1+Pt.+2.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/2+Famous.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/3+Pop.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/4+That+Part.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/5+Facts.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/6+Mercy.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/7+Dont+Like.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/8+All+Day.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/9+Black+Skinhead.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/10+Niggas.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/11+Cant+Tell.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/12+Power.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/13+Blood.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/14+Freestyle.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/15+Jesus+Walks.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/16+Flashing.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/17+Highlights.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/18+Feedback.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/19+Wolves.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/20+Heartless.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/21+Runaway.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/22+Only+One.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/23+I+Love.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/24+Waves.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/25+All+Lights.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/26+Good+Life.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/27+Stronger.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/28+Touch+Sky.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/29+Fade.ogg',
    'https://relifeofpablo.s3-us-west-1.amazonaws.com/30+Ultralight.ogg',
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

/// Remove Landing Page + Start Animation & Concert  ///
var startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', function () {
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

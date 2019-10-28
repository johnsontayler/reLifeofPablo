import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { SkeletonUtils } from '/node_modules/three/examples/jsm/utils/SkeletonUtils.js';
import { FBXLoader } from '/node_modules/three/examples/jsm/loaders/FBXLoader.js';

function loadAudienceKanye( worldScene, stage ) {

  var worldScene = worldScene;
  var stage = stage;

  var array30 = new Array(30);

  var MODELS = [ { name: "audience" } ];

  var UNITS = [
    {
      modelName: "audience", // Will use the 3D model from file models/audience.gltf
      position: { x: 0, y: -20, z: 0 }, // Where to put the unit in the scene
      scale: 0.2 // Scaling of the unit. 1.0 means: use original size, 0.1 means "10 times smaller", etc.
    }
  ];

  var numLoadedModels = 0;

  createUnits();
  loadModels();

  function createUnits() {
    create30UnitsPositive();
    create30UnitsNegative();
    create30UnitsXNegative();
    create30UnitsYNegative();
  } 

  function create30UnitsPositive() {
    Array.from(array30).forEach(function() {
      var createdUnit = {
        modelName: "audience", // Will use the 3D model from file models/audience.gltf
        position: randomUnitPositionPositive(), // Where to put the unit in the scene
        scale: 0.2 // Scaling of the unit. 1.0 means: use original size, 0.1 means "10 times smaller", etc.
      }
      UNITS.push(createdUnit);
    });
  }

  function create30UnitsNegative() {
    Array.from(array30).forEach(function() {
      var createdUnit = {
        modelName: "audience", // Will use the 3D model from file models/audience.gltf
        position: randomUnitPositionNegative(), // Where to put the unit in the scene
        scale: 0.2 // Scaling of the unit. 1.0 means: use original size, 0.1 means "10 times smaller", etc.
      }
      UNITS.push(createdUnit);
    });
  }

  function create30UnitsXNegative() {
    Array.from(array30).forEach(function() {
      var createdUnit = {
        modelName: "audience", // Will use the 3D model from file models/audience.gltf
        position: randomUnitPositionXNeg(), // Where to put the unit in the scene
        scale: 0.2 // Scaling of the unit. 1.0 means: use original size, 0.1 means "10 times smaller", etc.
      }
      UNITS.push(createdUnit);
    });
  }

  function create30UnitsYNegative() {
    Array.from(array30).forEach(function() {
      var createdUnit = {
        modelName: "audience", // Will use the 3D model from file models/audience.gltf
        position: randomUnitPositionYNeg(), // Where to put the unit in the scene
        scale: 0.2 // Scaling of the unit. 1.0 means: use original size, 0.1 means "10 times smaller", etc.
      }
      UNITS.push(createdUnit);
    });
  }

  function randomUnitPositionPositive() {
    var position = {
      x: ( Math.random() * 200 ),
      y: -20,
      z: ( Math.random() * 200 )
    };
    return position;
  }

  function randomUnitPositionNegative() {
    var position = {
      x: -( Math.random() * 200 ),
      y: -20,
      z: -( Math.random() * 200 )
    };
    return position;
  }

  function randomUnitPositionXNeg() {
    var position = {
      x: -( Math.random() * 200 ),
      y: -20,
      z: ( Math.random() * 200 )
    };
    return position;
  }

  function randomUnitPositionYNeg() {
    var position = {
      x: ( Math.random() * 200 ),
      y: -20,
      z: -( Math.random() * 200 )
    };
    return position;
  }

  function loadModels() {
    for ( var i = 0; i < MODELS.length; ++ i ) {
      var m = MODELS[ i ];
      loadGltfModel( m, function () {
        ++ numLoadedModels;
        if ( numLoadedModels === MODELS.length ) {
          console.log( "All models loaded, time to instantiate units..." );
          instantiateUnits();
        }
      } );
    }
  }

  //// Look at UNITS configuration, clone necessary 3D model scenes //////
  function instantiateUnits() {
    var numSuccess = 0;
    for ( var i = 0; i < UNITS.length; ++ i ) {
      var u = UNITS[ i ];
      var model = getModelByName( u.modelName );
      if ( model ) {
        var clonedScene = SkeletonUtils.clone( model.scene );
        if ( clonedScene ) {
          numSuccess ++;
          worldScene.add( clonedScene );
          if ( u.position ) {
            clonedScene.position.set( u.position.x, u.position.y, u.position.z );
          }
          if ( u.scale ) {
            clonedScene.scale.set( u.scale, u.scale, u.scale );
          }
              }
      } else {
        console.error( "Can not find model", u.modelName );
      }
    }
    console.log( `Successfully instantiated ${numSuccess} units` );
  }

  function getModelByName( name ) {
    for ( var i = 0; i < MODELS.length; ++ i ) {
      if ( MODELS[ i ].name === name ) {
        return MODELS[ i ];
      }
    }
    return null;
  }

  //// Load a 3D model from a GLTF file using GLTFLoader //// 
  ///////////////+++ Kanye FBXLoader! //////////////////////
  function loadGltfModel( model, onLoaded ) {
    var loader = new GLTFLoader();
    var modelName = "js/models/" + model.name + ".gltf";
    loader.load( modelName, function ( gltf ) {
      var scene = gltf.scene;
      model.scene = scene;
      console.log( "Done loading model", model.name );
      onLoaded();
    } );

    var kanyeLoader = new FBXLoader();
    kanyeLoader.load( 'js/models/liam.fbx', function ( object ) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.scale.set( 0.08, 0.08, 0.08 )
        object.position.y = 3.3;
        stage.add( object );
    } );
  }
  
}

export { loadAudienceKanye };
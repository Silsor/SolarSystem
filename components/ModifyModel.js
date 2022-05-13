  //----------------------------------------------------------------------------------
  //--- Prevent showing only part of model / adding enviroment map
  //----------------------------------------------------------------------------------
  var envTexture;

  function loadMap(object)
        {
        //console.log("mapka wczytana ");
        var targetCube = new THREE.WebGLCubeRenderTarget(512);
        var renderer = object.el.sceneEl.renderer;
          const obj = object.el.object3D;
          let customIntensity = object.data.intensityVal;
            texture = new THREE.TextureLoader().load(object.data.envMapImg.currentSrc, 
            function() {
              var cubeTex = targetCube.fromEquirectangularTexture(renderer, texture);
              obj.traverse(function(child) {
                  if (child.material && !child.name.match("excluded")) {
                    child.material.roughness  = 0.5;
                    child.material.envMap = cubeTex.texture;
                    child.material.envMapIntensity = customIntensity;
                    child.material.needsUpdate = true;
                    envTexture = texture;
                  }
                if ( child.isMesh )
                  child.frustumCulled=false;
                  //if(child.name.match("hidden"))
                    //child.visible = false;      
              });
  
              renderer.toneMapping = THREE.ACESFilmicToneMapping;
              renderer.outputEncoding = THREE.sRGBEncoding;
              renderer.shadowMap.needsUpdate = true;
            });
        }

  AFRAME.registerComponent('modify-model', {
    schema: {
      envMapImg:  { type: 'map' },
      intensityVal: { type: 'number', default: 0.5}
    },
        
      init: function () {
      //console.log("modify init");
        // Wait for model to load.
        this.el.addEventListener('model-loaded', () => {     
          // Grab the mesh / scene.
          loadMap(this);
        })
    },    

    update: function(oldData)
    {
        var data = this.data;  // Component property values.
        var el = this.el;  // Reference to the component's entity.
        
          if (oldData.envMapImg !== data.envMapImg)
          {
                loadMap(this);
          }
    }
  });
  
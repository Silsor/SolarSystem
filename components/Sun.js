//----------------------------------------------------------------------------------
  //--- Sun
  //----------------------------------------------------------------------------------
  
  AFRAME.registerComponent('sun', {
      schema:
        {
            clock: {}
        },

      init: function () 
      {
        this.data.clock = new THREE.Clock();
        //console.log("modify init");
        // Wait for model to load.
        this.el.addEventListener('model-loaded', () => 
        {   
            let obj = this.el.object3D;
            obj.traverse(function(child){
            if (child.material)
                {
                    /*let standard = THREE.ShaderLib['standard'];
                    let customMaterial = new THREE.ShaderMaterial('sun-shader','');
                    customMaterial.uniforms.diffuse = new THREE.Color('white');
                    customMaterial.uniforms.roughness = 0;
                    customMaterial.uniforms.metalness = 0;
                    customMaterial.needsUpdate = true;
                    child.material = customMaterial;*/
                    //console.log(child.material);
                    child.material.emissiveIntensity = 3;
                    child.material.roughness = 1;
                    child.material.needsUpdate = true;
                }
            });
        });
      },
      
      tick: function () {
        let delta = this.data.clock.getDelta();
        this.data.t += delta;
        
		this.el.object3D.rotation.y += earthYear * 100 * delta / (25 * 24); //okres obrotu slonca wynosi 25 ziemskich dni
    }
  });
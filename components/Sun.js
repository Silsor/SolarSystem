//----------------------------------------------------------------------------------
  //--- Sun
  //----------------------------------------------------------------------------------
  
  AFRAME.registerComponent('sun', {
      init: function () 
      {
        //console.log("modify init");
        // Wait for model to load.
        this.el.addEventListener('model-loaded', () => 
        {   
            let obj = this.el.object3D;
            obj.traverse(function(child){
            if (child.material)
                {
                    console.log(child.material);
                    /*let standard = THREE.ShaderLib['standard'];
                    let customMaterial = new THREE.ShaderMaterial('sun-shader','');
                    customMaterial.uniforms.diffuse = new THREE.Color('white');
                    customMaterial.uniforms.roughness = 0;
                    customMaterial.uniforms.metalness = 0;
                    customMaterial.needsUpdate = true;
                    child.material = customMaterial;*/
                    console.log(child.material);
                    child.material.emissiveIntensity = 3;
                    child.material.roughness = 0;
                    child.material.needsUpdate = true;
                }
            });
        });
      }   
  });
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
                    child.material.emissiveIntensity = 3;
                    child.material.roughness = 1;
                    child.material.needsUpdate = true;
                }
            });
        });

        this.el.addEventListener('click', () => 
        {   
            this.el.setAttribute("description", 'name', this.el.id);
        });
      },
      
      tick: function () {
      if (!animationPlaying) 
        {
            if (this.data.clock.running) this.data.clock.stop();
            return;
        }   if (!this.data.clock.running) this.data.clock.start();
        let delta = this.data.clock.getDelta();
        this.data.t += delta;
        
		this.el.object3D.rotation.y += earthYear * 100 * delta / (25 * 24); //okres obrotu slonca wynosi 25 ziemskich dni
    }
  });
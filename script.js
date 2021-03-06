//----------------------------------------------------------------------------------
//--- Hide/show entity in different mode
//----------------------------------------------------------------------------------
AFRAME.registerComponent("hide-in-ar-mode", {
  // Set this object invisible while in AR mode.
    init: function() {
      this.el.sceneEl.addEventListener("enter-vr", ev => {
        this.wasVisible = this.el.getAttribute("visible");
        if (this.el.sceneEl.is("ar-mode")) {
          this.el.setAttribute("visible", false);
        }
      });
      
      this.el.sceneEl.addEventListener("exit-vr", ev => {
                if (this.wasVisible) this.el.setAttribute("visible", true);
              });
    }
  });
  
  //----------------------------------------------------------------------------------
  //--- 
  //----------------------------------------------------------------------------------
  AFRAME.registerComponent("ar-shadows", {
  // Swap an object's material to a transparent shadows-only material while
  // in AR mode. Intended for use with a ground plane. The object is also
  // set visible while in AR mode, this is useful if it's hidden in other
  // modes due to them using a 3D environment.
    schema: {
      opacity: { default: 0.3 }
    },
    init: function() {
      this.el.sceneEl.addEventListener("enter-vr", ev => {
        this.wasVisible = this.el.getAttribute("visible");
        if (this.el.sceneEl.is("ar-mode")) {
          this.savedMaterial = this.el.object3D.children[0].material;
          this.el.object3D.children[0].material = new THREE.ShadowMaterial();
          this.el.object3D.children[0].material.opacity = this.data.opacity;
          this.el.setAttribute("visible", true);
        }
      });
      
      this.el.sceneEl.addEventListener("exit-vr", ev => {
        if (this.savedMaterial) {
          this.el.object3D.children[0].material = this.savedMaterial;
          this.savedMaterial = null;
        }
        
        if (!this.wasVisible) this.el.setAttribute("visible", false);
      });
    }
  });
  //----------------------------------------------------------------------------------
  //--- Setup scene elements in AR/VR mode
  //----------------------------------------------------------------------------------
  AFRAME.registerComponent('ar-mode-setup', {
  // Set camera position while in AR mode.
    init: function (){
 
      let solarSystem = document.getElementById("solar_system");
      let cursor = document.getElementById("cursor");
      let camera = document.getElementById("camera");
        
      this.el.sceneEl.addEventListener('enter-vr', (ev) => {
        
        //if (this.el.sceneEl.is('ar-mode')) {}
            solarSystem.setAttribute('scale', '0.05 0.05 0.05');
            solarSystem.object3D.position.set( 0, 1.2, -0.5);
            camera.removeAttribute('cursor');
            camera.setAttribute('raycaster','enabled: false');
            cursor.setAttribute('cursor', 'fuse: true');
            cursor.setAttribute('cursor','rayOrigin: entity');
            cursor.setAttribute('raycaster','enabled: true');
            cursor.object3D.visible = true;
      });
              
      
      this.el.sceneEl.addEventListener('exit-vr', (ev) => {
        solarSystem.setAttribute('scale', '1 1 1');
        solarSystem.object3D.position.set( 0, 0, 0);
        camera.object3D.position.set(0, 7.1, 7.5);
        cursor.removeAttribute('cursor');
        cursor.setAttribute('raycaster','enabled: false');
        camera.setAttribute('cursor', 'fuse: false');
        camera.setAttribute('cursor','rayOrigin: mouse');
        camera.setAttribute('raycaster','enabled: true');
        cursor.object3D.visible = false;
      });
    }
  });
  
  //----------------------------------------------------------------------------------
  //--- Make overlay object
  //----------------------------------------------------------------------------------
  AFRAME.registerComponent("overlay", {
    dependencies: ['material'],
    init: function () {
      this.el.sceneEl.renderer.sortObjects = true;
      this.el.object3D.renderOrder = 100;
      this.el.components.material.material.depthTest = false;
    }
  });
  
  //----------------------------------------------------------------------------------
  //--- Events for 2D elements
  //----------------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggle');
    const scene = document.querySelector('a-scene');
    const slider = document.getElementById("myRange");
    const checkboxSwitch = document.getElementById('checkboxSwitch');
    var output = document.getElementById("sliderValue");
    slider.value = animationSpeed;
    output.innerHTML = slider.value;

    toggle.addEventListener('click', () =>
      document.getElementById("info").classList.toggle('show-info')
    ); 
    
    slider.oninput = function() {
        animationSpeed = this.value;
        earthYear = 2 * Math.PI / animationSpeed;
        output.innerHTML = this.value;
    };

    checkboxSwitch.oninput = function() {
        animationPlaying = checkboxSwitch.checked;
    };
  });
  
  
AFRAME.registerComponent('light-map', {
  schema: {
    lightMapImg:  { type: 'map' },
    lightMapImg2:  { type: 'map' },

},
  init: function () {
    console.log("Light comp "+this.data.lightMapImg.currentSrc);
    var lightMap = new THREE.TextureLoader().load(this.data.lightMapImg.currentSrc);
    lightMap.flipY = false;
    var lightMap2 = new THREE.TextureLoader().load(this.data.lightMapImg2.currentSrc);
    lightMap2.flipY = false;

    this.el.addEventListener('model-loaded', function(e) {
      e.detail.model.traverse((o) => {
        if (o.isMesh) {
          if(o.material.name.match("02 - Default")){
            o.material.lightMap = lightMap2;
            if (o.geometry.attributes.uv2 === undefined &&  
                o.geometry.attributes.uv !== undefined) {
              o.geometry.setAttribute( 'uv2', new THREE.BufferAttribute( o.geometry.attributes.uv.array, 2 ) );
            }
          }
          else{
            o.material.lightMap = lightMap;
            if (o.geometry.attributes.uv2 === undefined &&  
                o.geometry.attributes.uv !== undefined) {
              o.geometry.setAttribute( 'uv2', new THREE.BufferAttribute( o.geometry.attributes.uv.array, 2 ) );
            }
          }
        }
      });
    });
  }
});

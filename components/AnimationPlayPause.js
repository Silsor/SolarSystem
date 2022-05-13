//----------------------------------------------------------------------------------
//------- MENU ANIMATION PLAY PAUSE - CONTROL MODEL ANIMATIONS
//----------------------------------------------------------------------------------

const menuAssets = [
    { id: 0, animation: "", loop: "once", menuImg: "#menu" },
    { id: 1, animation: "", loop: "once", menuImg: "#menu1"},

  ];
  
  AFRAME.registerComponent('animation-play-pause', {
    schema: {    
      srcImgArray: {type: 'array'},
      isPlaying: {type: 'boolean', default: false},
      restart: {type: 'boolean', default: false}
    },
    init() {
      const model = document.querySelector('#model-interactive');
      let timeScale = 1;

      function startAnimation(object)
      {
        timeScale = 1;
        object.el.setAttribute('material', 'src: '+ object.data.srcImgArray[1]);
        model.setAttribute("animation-mixer",'timeScale: '+timeScale+'');
        //model.setAttribute("animation-mixer",'duration: 2');
        
        object.data.isPlaying = true;
      }

      function stopAnimation(object)
      {
        timeScale = 0;
        object.el.setAttribute('material', 'src: '+ object.data.srcImgArray[0]);
          model.setAttribute("animation-mixer",'timeScale: '+timeScale+'');
          object.data.isPlaying = false;
      }

      this.el.addEventListener('click', (e) => {
        e.preventDefault();
        if(this.data.isPlaying == true){
          stopAnimation(this);
        }
        else{
          startAnimation(this);
        }

          //console.log("1: "+this.data.srcImgArray[0]);
      });
      
      model.addEventListener('animation-loop', (e) => {
      e.stopPropagation();
      if (this.data.restart == false)
        {
        this.data.restart = true; 
        stopAnimation(this);
        }
      else
        {
        model.removeAttribute("animation-mixer")
        startAnimation(this);
        this.data.restart = false; 
        }
      });
    }
  
  });
  
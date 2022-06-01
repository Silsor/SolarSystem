//----------------------------------------------------------------------------------
//--- Sun
//----------------------------------------------------------------------------------

var animationSpeed = 30.0;
var animationPlaying = true;
var earthYear = 2 * Math.PI / animationSpeed;
AFRAME.registerComponent('planet', {

    schema:
    {
        model: {},
        a: { type: 'number', default: 10}, // max odleglosc elipsy w osi x
        b: { type: 'number', default: 5 }, // max odleglosc elipsy w osi y
        x: { type: 'number', default: 10 },
        timeToAroundSun: {type: 'number', default: 1},
		hoursToRotate: { type: 'number', default: 24 },
        axialTilt:{ type: 'number', default: 0 },
        clock: {},
        t: {},
		//constantrotator: {} zmienna, uzaleznia predkosc obrotu planety od dlugosci okresu orbity
    },

    init: function () {
        this.data.model = this.el.object3D;
        this.data.model.rotation.x = this.data.axialTilt * Math.PI/180;
        this.el.addEventListener('model-loaded', () => 
        {   
            this.data.model.traverse(function(child){
            if (child.material)
                {
                    child.material.roughness = 1;
                    child.material.metallic = 0;
                    child.material.needsUpdate = true;
                    //console.log(child.material);
                }
            });
        });

        this.data.clock = new THREE.Clock();
        this.data.t = 2 * Math.PI * Math.random()/earthYear * this.data.timeToAroundSun;
		//this.data.constantrotator = (360 * 365 * earthYear * this.data.hoursToRotate)/ (24*2 * Math.PI);

        this.el.addEventListener('click', () => 
        {   
            this.el.setAttribute("description", 'name', this.el.id);
        });
		//console.log(this.data.constantrotator);
        //console.log(this.el.name + " " + earthYear * this.data.timeToAroundSun);
    },

    tick: function () {
    if (!animationPlaying) 
    {
        if (this.data.clock.running) this.data.clock.stop();
        return;
    }   if (!this.data.clock.running) this.data.clock.start();
        let delta = this.data.clock.getDelta();
        this.data.t += delta;
        let lastX = this.data.x;
        this.data.x = Math.sin(this.data.t * earthYear / this.data.timeToAroundSun) * this.data.a;
        
        let y = Math.sqrt((1 - Math.pow(this.data.x, 2) / Math.pow(this.data.a, 2)) * Math.pow(this.data.b, 2));
        if (lastX > this.data.x) y *= -1;

        this.data.model.position.set(this.data.x, 0, y);
        //this.data.model.rotation.y += this.data.constantrotator * delta * Math.PI / 180;
		this.data.model.rotation.y += earthYear * 100 * delta / this.data.hoursToRotate;
    }
});
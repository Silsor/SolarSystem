//----------------------------------------------------------------------------------
//--- Sun
//----------------------------------------------------------------------------------

var earthYear = 2 * Math.PI / 10;
AFRAME.registerComponent('planet', {

    schema:
    {
        model: {},
        a: { type: 'number', default: 10}, // max odleglosc elipsy w osi x
        b: { type: 'number', default: 5 }, // max odleglosc elipsy w osi y
        x: { type: 'number', default: 10 },
        timeToAroundSun: {type: 'number', default: 1},
        rotationSpeed: { type: 'number', default: 2 },
		hoursToRotate: { type: 'number', default: 24 },
        clock: {},
        duration: {type: 'number', default: 1},
        t: {},
		constantrotator: {}
    },

    init: function () {
        this.data.model = this.el.object3D;
        this.data.clock = new THREE.Clock();
        this.data.t = 2 * Math.PI * Math.random()/earthYear * this.data.timeToAroundSun;
		this.data.constantrotator = (360  * 365 * earthYear * this.data.hoursToRotate)/ (24*2 * Math.PI);
		console.log(this.data.constantrotator);
        console.log(this.el.name + " " + earthYear * this.data.timeToAroundSun);
    },

    tick: function () {
        let delta = this.data.clock.getDelta();
        this.data.t += delta;
        let lastX = this.data.x;
        this.data.x = Math.sin(this.data.t * earthYear / this.data.timeToAroundSun) * this.data.a;
        
        let y = Math.sqrt((1 - Math.pow(this.data.x, 2) / Math.pow(this.data.a, 2)) * Math.pow(this.data.b, 2));
        if (lastX > this.data.x) y *= -1;

        this.data.model.position.set(this.data.x, 0, y);
        this.data.model.rotation.y += this.data.constantrotator * delta * Math.PI / 180;
		//this.data.model.rotation.y += delta /( 2 * Math.PI);
		console.log(this.data.model.rotation);
    }
});
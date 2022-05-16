//----------------------------------------------------------------------------------
//--- Sun
//----------------------------------------------------------------------------------

AFRAME.registerComponent('planet', {

    schema:
    {
        model: {},
        a: { type: 'number', default: 2},
        b: { type: 'number', default: 10 },
        t: { type: 'number', default: 0 },
        time: { type: 'number', default: 15},
        rotationSpeed: { type: 'number', default: 4 },
        clock: {}
    },

    init: function () {
        this.data.model = this.el.object3D;
        this.data.clock = new THREE.Clock();
    },

    tick: function () {
        let delta = this.data.clock.getDelta();
        this.data.t += delta / (this.data.time * 1.0);

        if (this.data.t > 1 && this.data.time > 0) {
			this.data.time *= -1;		
			this.data.t = 1;
		}
        else if (this.data.t < -1 && this.data.time < 0) {
			this.data.time *= -1;		
			this.data.t = -1;
		}

        this.data.model.position.set(this.data.a * (1 - Math.abs(this.data.t)) * ((this.data.time > 0) ? 1 : -1), 0, this.data.b * this.data.t);
        this.data.model.rotation.y += this.data.rotationSpeed * delta;
    }
});
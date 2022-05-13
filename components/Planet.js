//----------------------------------------------------------------------------------
//--- Sun
//----------------------------------------------------------------------------------
let clock;
AFRAME.registerComponent('planet', {

    schema:
    {
        model: {},
        a: { type: 'number', default: 20 },
        b: { type: 'number', default: 5 },
        t: { type: 'number', default: 0 },
        time: { type: 'number', default: 10},
        rotationSpeed: { type: 'number', default: 1 }
    },

    init: function () {
        this.data.model = this.el.object3D;
        clock = new THREE.Clock()
    },

    tick: function () {
        let delta = clock.getDelta();
        this.data.t += delta / (this.data.time *1.0);

        if (Math.abs(this.data.t) > 1) this.data.time *= -1

        this.data.model.position.set(this.data.a * (1 - Math.abs(this.data.t) * this.data.time > 0 ? 1 : -1), 0, this.data.b * this.data.t);
        this.data.model.rotation.y += this.data.rotationSpeed * delta;
    }
});
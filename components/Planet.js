//----------------------------------------------------------------------------------
//--- Sun
//----------------------------------------------------------------------------------
let clock;
AFRAME.registerComponent('planet', {

    schema:
    {
        model: {},
        a: { type: 'number', default: 6 },
        b: { type: 'number', default: 3 },
        t: { type: 'number', default: 0 },
        time: { type: 'number', default: 10 },
        rotationSpeed: { type: 'number', default: 1 }
    },

    init: function () {
        this.data.model = this.el.object3D;
        clock = new THREE.Clock()
        console.log(this.data.model);
    },

    tick: function () {
        let delta = clock.getDelta();
        t += delta / time;

        if (Math.abs(t) > 1) delta *= -delta;
        this.data.model.position.set(a * (1 - t) * delta > 0 ? 1 : -1, 0, b * t);

        this.data.model.rotation.y += this.data.rotationSpeed * delta;
        console.log(this.data.x + " " + this.data.y);

    }
});
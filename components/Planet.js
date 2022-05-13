//----------------------------------------------------------------------------------
  //--- Sun
  //----------------------------------------------------------------------------------
  let clock;
  AFRAME.registerComponent('planet', {
        
    schema: 
    {
        model: {},
        a: { type: 'number', default: 6},
        b: { type: 'number', default: 3},
        x: { type: 'number', default: 0},
        y: { type: 'number', default: 0},
        speed: {type: 'number', default: 3},
        rotationSpeed: {type: 'number', default: 1}
    },

      init: function () 
      {
        this.data.model = this.el.object3D;
        clock = new THREE.Clock()
        console.log(this.data.model);
        this.data.x = 0;
      },
      
      tick: function ()
      {
            let delta = clock.getDelta();
            if (this.data.x <= this.data.a * 0.5 && this.data.x >= -this.data.a * 0.5) 
                {
                   this.data.x += (this.data.y < 0 ? this.data.speed : -this.data.speed  ) * delta * (1 - Math.abs(this.data.x)/this.data.a);
                   this.data.y = (this.data.y > 0 ? 1 : -1 ) * Math.sqrt(this.data.b * this.data.b * (1 - (this.data.x * this.data.x) / (this.data.a * this.data.a)));               
                }
            else
                {
                   this.data.y += (this.data.x > 0 ? this.data.speed : -this.data.speed  ) * delta * (1 - Math.abs(this.data.y)/this.data.b);
                   this.data.x = (this.data.x > 0 ? 1 : -1 ) * Math.sqrt(this.data.a * this.data.a * (1 - (this.data.y * this.data.y) / (this.data.b * this.data.b)));
                }
                /*
                this.data.x += this.data.speed * delta * (1 - Math.abs(this.data.x)/this.data.a);

                if (this.data.x > this.data.a)
                {
                    this.data.x = this.data.a;
                    this.data.speed *= -1;
                }
                if (this.data.x < -this.data.a)
                {
                    this.data.x = -this.data.a;
                    this.data.speed *= -1;
                }
                */
                //let ySpeed = this.data.x < this.data.a * 0.1 ? this.data.a * 0.1 : this.data.x;

                /*
                //this.data.x += this.data.speed * delta// * (1 - Math.abs(this.data.x)/this.data.a);

                this.data.x += (this.data.y < 0 ? this.data.speed : -this.data.speed  )* (((this.data.x - this.data.a) * (this.data.x - this.data.a)) / (this.data.a * this.data.a));
                this.data.y += (this.data.x > 0 ? this.data.speed : -this.data.speed  )* (((this.data.y - this.data.b) * (this.data.y - this.data.b)) / (this.data.b * this.data.b));
                */
                this.data.model.position.set(this.data.x, 0, this.data.y);
                this.data.model.rotation.y += this.data.rotationSpeed * delta;
                console.log(this.data.x + " " + this.data.y);
                
      }
  });
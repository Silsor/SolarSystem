AFRAME.registerShader('highlight-shader', {
    schema: {
      opacity: {type: 'number', is: 'uniform', default: 0.6},
      glowColor: {type: 'color', is: 'uniform', default: new THREE.Color(0xF4FF00)},
      viewVector: {type: 'vec3', is:'uniform'},
      
    },
  
    raw: false,
  
    vertexShader: [
      '#extension GL_OES_standard_derivatives: enable',
      'precision mediump float;',
      'uniform float opcity;',
      'uniform vec3 viewVector;',
      'void main() {',
        'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',     
        '}'
    ].join('\n'),
  
    fragmentShader: [
      '#extension GL_OES_standard_derivatives: enable',
      'precision mediump float;',
      'uniform vec3 glowColor; ',
      'uniform float opcity;',
      'void main(void)',
      '{',
        'vec3 glow = glowColor;',
        'gl_FragColor = vec4( glow, opacity );',
      '}'
    ].join('\n')
  });
  
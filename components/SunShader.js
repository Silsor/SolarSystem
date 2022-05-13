
let standard = THREE.ShaderLib['standard'];
AFRAME.registerShader('sun-shader', {
	
    raw: false,
    lights: true,
    fragmentShader: standard.fragmentShader,
    vertexShader: standard.vertexShader,
    uniforms: THREE.UniformsUtils.clone(standard.uniforms),
});
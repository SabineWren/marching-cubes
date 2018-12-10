export { ShaderSourceFragment }
const ShaderSourceFragment = `#version 300 es

precision highp float;

in vec3 light1;
in vec3 normal;

out vec4 outColour;

void main() {
	vec3 light1_dir = normalize(light1);
	vec3 normal_dir = normalize(normal);
	
	float brightness1 = dot(light1_dir, normal_dir);
	float brightness = max(0.0, brightness1);
	
	outColour = vec4(0.6 * brightness, 1.0 * brightness, 0.0, 1.0);
}
`

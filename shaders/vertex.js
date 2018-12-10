export { ShaderSourceVertex }
const ShaderSourceVertex = `#version 300 es

uniform mat4 model;
uniform mat4 proj;
uniform mat4 view;

in vec4 in_position;

out vec3 light1;
out vec3 normal;

void main() {
	vec3 v_position = (model * in_position).xyz;
	vec3 light1_pos = vec3(-50, 180, 200);
	vec3 centre = vec3(180, 180, 0);
	
	light1 = light1_pos - v_position;
	normal = v_position - centre;
	gl_Position = proj * view * model * in_position;
}
`

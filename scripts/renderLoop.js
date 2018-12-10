/*
	@license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt
	
	Copyright (C) 2018 SabineWren
	https://github.com/SabineWren
	
	GNU AFFERO GENERAL PUBLIC LICENSE Version 3, 19 November 2007
	https://www.gnu.org/licenses/agpl-3.0.html
	
	@license-end
*/
export { Draw };

const dimenVert   = 3;
const dimenNorm   = 3;
let size = 0;
let normalize = false;
let offset = 0;
const stride = dimenVert * 4;//4 bytes each

const Draw = function(locations, model, program, state) {
	const gl = state.gl;
	
	gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
	//
	gl.clearColor(0, 0, 0, 0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	//
	gl.useProgram(program);
	
	//WebGLUniformLocation location, GLboolean transpose, const GLfloat *value
	gl.uniformMatrix4fv(locations.proj,  false, new Float32Array(state.matrices.proj));
	gl.uniformMatrix4fv(locations.view,  false, new Float32Array(state.matrices.view));
	
	drawObject(gl, locations, model);
}

const drawObject = function(gl, locations, model) {
	gl.uniformMatrix4fv(locations.model, false, new Float32Array(model.matrix));
	gl.bindBuffer(gl.ARRAY_BUFFER, model.buffer);
	
	//Triangles
	size   = 3;
	offset = 0;
	normalize = false;
	gl.enableVertexAttribArray(locations.position);
	gl.vertexAttribPointer(locations.position, size, gl.FLOAT, normalize, stride, offset);

	offset = 0;
	//gl.drawArrays(gl.TRIANGLES, offset, numVertices);
	gl.drawArrays(gl.TRIANGLES, offset, model.length);
};


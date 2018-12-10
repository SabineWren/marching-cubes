/*
	@license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt
	
	Copyright (C) 2018 SabineWren
	https://github.com/SabineWren
	
	GNU AFFERO GENERAL PUBLIC LICENSE Version 3, 19 November 2007
	https://www.gnu.org/licenses/agpl-3.0.html
	
	@license-end
*/
import * as Create from "../shaders/create.js";
import { Draw } from "./renderLoop.js";
import * as Input from "./input.js";
import * as M3 from "./matrices3D.js";
import * as M4 from "./matrices4D.js";
import * as Mc from "./marchingCubes.js";
import { ResizeCanvas } from "./resize.js";
import { ShaderSourceVertex } from "../shaders/vertex.js";
import { ShaderSourceFragment } from "../shaders/frag.js";
import { State } from "./state.js";

State.canvas = document.getElementById("c");
State.gl = State.canvas.getContext("webgl2");
const gl = State.gl;
if (!gl) { alert("webgl2 is not supported by your device") }
//allow right click for camera control
State.canvas.oncontextmenu = function(event) {
	event.preventDefault();
	return false;
};

const graphicsInit = function(gl) {
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);

	document.onkeydown   = Input.HandleKeyDown;
	document.onkeyup     = Input.HandleKeyUp;
	document.onmousedown = Input.HandleMouseDown;
	document.onmousemove = Input.HandleMouseMove;
	document.onmouseup   = Input.HandleMouseUp;
};

const makeGraphicsProgram = function(gl) {
	const shaderVertex   = Create.Shader(gl, gl.VERTEX_SHADER,   ShaderSourceVertex);
	const shaderFragment = Create.Shader(gl, gl.FRAGMENT_SHADER, ShaderSourceFragment);
	return Create.Program(gl, shaderVertex, shaderFragment);
};

const makeLocations = function(gl, program) {
	return Object.freeze({
		model: gl.getUniformLocation(program, "model"),
		normal: gl.getAttribLocation(program, "in_normal"),
		position: gl.getAttribLocation(program, "in_position"),
		proj: gl.getUniformLocation(program, "proj"),
		texture: gl.getAttribLocation(program, "in_texture"),
		view: gl.getUniformLocation(program, "view")
	});
};

const makeModel = function(gl, vertices) {
	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	
	const data = [];
	for(let vertex of vertices) {
		data.push(vertex[0]);
		data.push(vertex[1]);
		data.push(vertex[2]);
	}
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
	
	return {
		buffer: buffer,
		length: data.length / 3,
		matrix: M4.GetIdentity(),
	};
};

window.onload = async function() {
	const program = makeGraphicsProgram(gl);
	const locations = makeLocations(gl, program);
	const lines = Mc.Polygonize();
	const model = makeModel(gl, lines);
	graphicsInit(gl);
	
	const renderLoop = function() {
		ResizeCanvas(State);
		Input.UpdateViewMat();
		Draw(locations, model, program, State);
		window.requestAnimationFrame(renderLoop);
	}
	renderLoop();
}();

/*
	@license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt
	
	Copyright (C) 2018 SabineWren
	https://github.com/SabineWren
	
	GNU AFFERO GENERAL PUBLIC LICENSE Version 3, 19 November 2007
	https://www.gnu.org/licenses/agpl-3.0.html
	
	@license-end
*/
export { State };
import * as M4 from "./matrices4D.js";

const State = {
	canvas: undefined,
	gl: undefined,
	graphics: {
		far: 400.0,
		fov: 90.0 * Math.PI / 180.0,
		near: 1.0
	},
	keycount: 0,
	keys: {
		left: false,
		down: false,
		right: false,
		rollRight: false,
		rollLeft: false,
		back: false,
		space: false,
		front: false
	},
	keySens: 1.5,
	keySensRotate: 0.03,
	matrices: {
		//model matrices aren't global state
		//proj set in resize
		view: M4.LookAt([180, 180, 180], [180, 180, 0])
	},
	mouse: {
		clickPrimary: false,
		lastX: 0,
		lastY: 0,
		sensitivity: 0.002
	},
	needToRender: false,
	pressedKeys: {},
};

import vertexShaderSource from '../shader/vertex.glsl?raw';
import fragmentShaderSource from '../shader/fragment.glsl?raw';
import { createProgram } from './shader.js';

export function initProgram(gl) {
    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if(!program) throw new Error("Shader-Programm konnte nicht erstellt werden");
    return program;
}

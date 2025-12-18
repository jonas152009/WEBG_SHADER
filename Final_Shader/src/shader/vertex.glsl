#version 300 es
precision highp float;

layout(location = 0) in vec2 aPos;
layout(location = 1) in vec3 aColor;

uniform vec2 u_resolution;

out vec3 vColor;

void main() {
    vec2 clipSpace = (aPos / u_resolution) * 2.0 - 1.0;
    clipSpace.y = -clipSpace.y; // flip Y für WebGL
    gl_Position = vec4(clipSpace, 0.0, 1.0);
    vColor = aColor;
}

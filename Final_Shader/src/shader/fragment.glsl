#version 300 es
precision highp float;

in vec3 vColor;
out vec4 fragColor;
uniform float uTime;

void main() {
    fragColor=vec4(vColor,1.0);
}

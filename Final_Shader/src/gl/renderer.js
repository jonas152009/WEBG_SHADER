import { m4 } from '../math/matrix.js';

export function createRenderer(canvas){
    const gl=canvas.getContext("webgl2");
    if(!gl) throw new Error("WebGL2 nicht unterstützt");
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    return gl;
}
export function computeCameraMatrix(
    fieldOfViewRadians,
    fPosition,
    Camera_Tx,
    Camera_Tz)
    {

    const aspect = window.innerHeight/window.innerWidth;
    const projection = m4.perspective(fieldOfViewRadians,aspect,1,2000);
;
    const cameraPos=[Camera_Tx,0,Camera_Tz];
    var camera=m4.lookAt(cameraPos,fPosition,[0,1,0]);
    const view=m4.inverse(camera);
    return m4.multiply(projection,view);
}

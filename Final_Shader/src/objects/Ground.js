import { m4 } from '../math/matrix.js';

export function drawGround(gl,program,positionBuffer,colorBuffer,viewProj){
    const positionLocation=gl.getAttribLocation(program,"a_position");
    const colorLocation=gl.getAttribLocation(program,"a_color");
    const matrixLocation=gl.getUniformLocation(program,"u_matrix");
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation,3,gl.FLOAT,false,0,0);

   gl.vertexAttrib3f(colorLocation, 0.5, 0.5, 0.5); // RGB (0–1 Bereich)

    gl.bindVertexArray(vao);

        var matrix=m4.translate(viewProj,300,-1,-220);
          matrix = m4.zRotate(matrix,3.15);
          matrix = m4.scale(matrix,500,0,500);
        gl.uniformMatrix4fv(matrixLocation,false,matrix);
        gl.drawArrays(gl.TRIANGLES,0,6);
    
}
import { m4 } from '../math/matrix.js';

export function drawF(gl,program,positionBuffer,colorBuffer,viewProj,numFs=7,radius=200){
    const positionLocation=gl.getAttribLocation(program,"a_position");
    const colorLocation=gl.getAttribLocation(program,"a_color");
    const matrixLocation=gl.getUniformLocation(program,"u_matrix");
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation,3,gl.FLOAT,false,0,0);

    gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation,3,gl.UNSIGNED_BYTE,true,0,0);

    gl.bindVertexArray(vao);

    for(let i=0;i<numFs;i++){
        const angle=i*2*Math.PI/numFs;
        const x=Math.cos(angle)*radius;
        const z=Math.sin(angle)*radius;
        var matrix=m4.translate(viewProj,x+70,140,z);
          matrix = m4.zRotate(matrix, 3.15);
          matrix = m4.yRotate(matrix,5);
        gl.uniformMatrix4fv(matrixLocation,false,matrix);
        gl.drawArrays(gl.TRIANGLES,0,16*6);
    }
}

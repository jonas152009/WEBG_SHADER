import vertexShaderSource from './shader/vertex.glsl?raw';
import fragmentShaderSource from './shader/fragment.glsl?raw';

function createShader(gl, type, source){
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var sucess = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(sucess){
       return  shader;
    }
    console.error("Shader compile error:\n", gl.getShaderInfoLog(shader));
  
}
function createProgram(gl, vertexShader, fragmentShader){
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var succes = gl.getProgramParameter(program, gl.LINK_STATUS);
    if(succes){
        return program;
    }
}
    function main(){
      // Get A WebGL context  
      var canvas = document.querySelector("#GL_CANVAS");
      var gl = canvas.getContext("webgl2");
      if(!gl){
        console.error("Context error");
        return;
      }

      var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
      var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
      
      
      var program = createProgram(gl, vertexShader, fragmentShader);

    var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");


      const positionBuffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

     const positions = new Float32Array ([
         100, 200,
         600, 200,
         100, 300,
         100, 300,
         600, 200,
         600, 300
      ]);
     gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      
     const colorBuffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
     const colors = new Float32Array ([
        1,0,0,
        0,1,0,
        0,0,1,
        0,0,1,
        0,1,0,
        1,0,0
      ]);
      gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

      var vao = gl.createVertexArray();
      gl.bindVertexArray(vao);


      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.enableVertexAttribArray(1);
      gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0);

     canvas.height= window.innerHeight;
     canvas.width=window.innerWidth;


      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(program);

      gl.bindVertexArray(vao);

       gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

    }

main();
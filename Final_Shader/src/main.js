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
  function setRectangle(gl, x, y, width, height){
   var left = x;
   var right = x + width;
   var top  = y;
   var bottom = y+height;

   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    left,top,
    left ,bottom,
    right,bottom,

    right, bottom,
    right,top,
    left, top
   ]), gl.STATIC_DRAW);
  }
  function drawScene(gl, canvas, program, vao,
     resolutionUniformLocation, positionBuffer, translation , width, height){


     canvas.height= window.innerHeight;
     canvas.width=window.innerWidth;
     gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);



      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(program);

      gl.bindVertexArray(vao);

       gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

       gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
       setRectangle(gl, translation[0], translation[1], width, height)

      gl.drawArrays(gl.TRIANGLES, 0, 6);
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

       var translation = [0, 0];
       var width = 400;
       var height =100;

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



    drawScene(gl, canvas, program, vao, 
      resolutionUniformLocation, positionBuffer, translation, width, height);

   const  xSlider =document.querySelector("#xSlider");
   const  xValue = document.querySelector("#xValue");
    xSlider.max = canvas.width;
    xSlider.addEventListener("input",()=>{
      xValue.textContent = xSlider.value;
      translation[0] = parseFloat(xSlider.value);
      drawScene(gl, canvas, program, vao, 
      resolutionUniformLocation, positionBuffer, translation, width, height);
    })

    const ySlider = document.querySelector("#ySlider");
    const yValue = document.querySelector("#yValue");
    ySlider.max = canvas.height;
    ySlider.addEventListener("input", ()=>{
      yValue.textContent = ySlider.value;
      translation[1]= parseFloat(ySlider.value);
      drawScene(gl, canvas, program, vao, 
      resolutionUniformLocation, positionBuffer, translation, width, height);
    })
    
      
    }

main();
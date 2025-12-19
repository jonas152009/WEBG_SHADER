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
    console.error(source + " compile error:\n", gl.getShaderInfoLog(shader));
  
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
function setGeometrie(gl){
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
          // left column
          0, 0,
          30, 0,
          0, 150,
          0, 150,
          30, 0,
          30, 150,
 
          // top rung
          30, 0,
          100, 0,
          30, 30,
          30, 30,
          100, 0,
          100, 30,
 
          // middle rung
          30, 60,
          70, 60,
          30, 90,
          30, 90,
          70, 60,
          70, 90
   ]), gl.STATIC_DRAW);
  }
function drawScene({
  gl,
  canvas,
  program,
  vao,
  resolutionUniformLocation,
  translation,
  translationLocation,
  rotationLocation,
  rotation,
  colorLocation,
  color
}){


     canvas.height= window.innerHeight;
     canvas.width=window.innerWidth;
     gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);



      gl.clearColor(0,0,0,0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.useProgram(program);

      gl.bindVertexArray(vao);

      gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
      gl.uniform4fv(colorLocation, color);
      gl.uniform2fv(translationLocation, translation)
      gl.uniform2fv(rotationLocation, rotation);


      gl.drawArrays(gl.TRIANGLES, 0, 18);
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
    var colorLocation = gl.getUniformLocation(program, "u_color");
    var rotationLocation = gl.getUniformLocation(program, "u_rotation");

      const positionBuffer = gl.createBuffer();

       var translation = [0, 0];
       var color = [Math.random(), Math.random(), Math.random(), 1];
       var rotation = [1, 0];
      let vao = gl.createVertexArray();
      gl.bindVertexArray(vao);


      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

      var translationLocation = gl.getUniformLocation(program, "u_translation");
      
      setGeometrie(gl);
      const renderState = {
  gl,
  canvas,
  program,
  vao,
  resolutionUniformLocation,
  translation,
  translationLocation,
  rotationLocation,
  rotation,
  colorLocation,
  color
}

    drawScene(renderState);

   const  xSlider =document.querySelector("#xSlider");
   const  xValue = document.querySelector("#xValue");
    xSlider.max = canvas.width;
    xSlider.addEventListener("input",()=>{
      xValue.textContent = xSlider.value;
      translation[0] = parseFloat(xSlider.value);
      drawScene(renderState);
    })

    const ySlider = document.querySelector("#ySlider");
    const yValue = document.querySelector("#yValue");
    ySlider.max = canvas.height;
    ySlider.addEventListener("input", ()=>{
      yValue.textContent = ySlider.value;
      translation[1]= parseFloat(ySlider.value);
      drawScene(renderState);
    })
        const rotateSlider = document.querySelector("#rotateSlider");
        const rotateValue = document.querySelector("#rotateValue");
        rotateSlider.addEventListener("input", ()=>{
         const angleDeg = parseFloat(rotateSlider.value);
       rotateValue.textContent = angleDeg;
       const angleRad = angleDeg * Math.PI / 180;
      rotation[0] = Math.cos(angleRad);
      rotation[1] = Math.sin(angleRad);
         drawScene(renderState);
    })
    
      
    }

main();
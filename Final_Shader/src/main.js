import { createRenderer, computeCameraMatrix } from './gl/renderer.js';
import { initProgram } from './gl/utility.js';
import { setGeometry, setColors, setGeometry_Ground } from './gl/buffer.js';
import { drawF } from './objects/F.js';
import { drawGround } from './objects/Ground.js';

const canvas=document.querySelector("#GL_CANVAS");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const gl =createRenderer(canvas);
const program=initProgram(gl);
gl.useProgram(program);

const positionBuffer=gl.createBuffer();
setGeometry(gl,positionBuffer);
const colorBuffer =gl.createBuffer();
setColors(gl,colorBuffer);

const positionBuffer_Ground= gl.createBuffer();
setGeometry_Ground(gl,positionBuffer_Ground);
var radiant = 0;
var angle = 0;
var x=0;
var tx = 0;
var tz = 0;

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
  
        angle=angle+2;
        radiant = (angle/360)*(2*Math.PI);
        console.log(radiant);
        if(angle > 360 ) {
            angle=0;
        }
}
 if (e.key === "ArrowLeft") {

        angle=angle-2;
        radiant = (angle/360)*(2*Math.PI);
        console.log(radiant);
         if(angle < 0 ) {
            angle=360;
        }
}
   if (e.key === "w" || e.key === "W") {
       x =10;
       tx +=Math.cos(radiant)*x, 
       tz += Math.sin(radiant)*x
    }
});


setInterval(()=> {
const viewProj=computeCameraMatrix(Math.PI/3,[Math.cos(radiant) + tx,0,tz+Math.sin(radiant)], tx,tz);


drawF(gl,program,positionBuffer,colorBuffer,viewProj);
drawGround(gl,program,positionBuffer_Ground, colorBuffer,viewProj);
}, 30);
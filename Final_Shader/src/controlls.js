export function controlls(width,old_x,old_z){
    var x = old_x;
    var z = old_z;
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
    
    }
});

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
    if(x < 1 && z ==1){
        x=x+0.1;
    }
    if(z == 1 && x == 1){
      z=z-0.1;  
    }
    if(z == -1 && x > -1){
        x=x-0.1;
    }
    if(x==-1 && z < 1){
        z=z+0.1;
    }
    }
});





}
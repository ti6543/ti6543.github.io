const foil_topview = new Image();
const foil_sideview = new Image();

var foil_area = 1500;
var chord = 20;
var wingspan = 100
var aspect_ratio = 6;
var thickness = 20;
  
  

function init() {
    
    foil_topview.src = 'foil_topview.png';
    foil_sideview.src = 'foil1.png';
    
    // start animation:
  window.requestAnimationFrame(draw);
}

// sliders:

var foilarea_slider = document.getElementById("frontarea");
var foilarea_output = document.getElementById("displayfrontarea");
foilarea_slider.oninput = function() {
        foil_area = foilarea_slider.value;
        foilarea_output.innerHTML = foilarea_slider.value;
        draw();
        } ;

var thickness_slider = document.getElementById("thickness");
var thickness_output = document.getElementById("displaythickness");
    thickness_slider.oninput = function() {
        thickness = thickness_slider.value;
        thickness_output.innerHTML = thickness_slider.value;
        draw();
    } ;

var aspectratio_slider = document.getElementById("aspectratio");
var aspectratio_output = document.getElementById("displayaspectratio");
        aspectratio_slider.oninput = function() {
            aspect_ratio = aspectratio_slider.value;
            aspectratio_output.innerHTML = aspectratio_slider.value;
            draw();
        } ;




// main draw function
function draw() {
  const ctx = document.getElementById('myCanvas').getContext('2d');
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 700, 400); // clear canvas
  
//foil dimensions:
wingspan = Math.sqrt(aspect_ratio*foil_area);
chord = foil_area/wingspan;

//top view dimensions:
var topview_width = 2*wingspan;
var topview_height = 2*chord;

//side view dimensions:
var sideview_width = 6*chord;
var sideview_height = 2*thickness;

  //draw top/side view:
  ctx.save();
  ctx.drawImage(foil_topview,20,20,topview_width,topview_height);
  ctx.drawImage(foil_sideview,20,150,sideview_width,sideview_height);
  ctx.restore();

//drag properties
var parasitic_drag_coeff = wingspan*thickness;
var induced_drag_coeff = 10/aspect_ratio;

// draw drag graph
var drag__origin_x = 300;
var drag__origin_y = 200;
ctx.beginPath;
ctx.lineWidth = 1;
ctx.moveTo(drag__origin_x, drag__origin_y);
ctx.lineTo(drag__origin_x, drag__origin_y-200);
ctx.moveTo(drag__origin_x, drag__origin_y);
ctx.lineTo(drag__origin_x+200, drag__origin_y);

var drag_y = 0;
for (let i = 0; i < 200; i++) { 

ctx.moveTo(drag__origin_x+i, drag__origin_y+drag_y);
drag_y = -0.01*Math.pow(i,2);
ctx.lineTo(drag__origin_x+i+1, drag__origin_y+drag_y);
};
ctx.stroke();

  
  window.requestAnimationFrame(draw);
}

init();



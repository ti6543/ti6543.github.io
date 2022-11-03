const foil1 = new Image();
const foil2 = new Image();
const man_top = new Image();
const man_legs = new Image();
const foil_pic = new Image();
const board = new Image();
var speed = 14;
var fuselage_len = 170;
var frontwingsize = 37.5;
  var backwingsize = 8;
  var shim = -2;
  var AngleOfAttack=7.5;
  var displayfrontfoilsize;
  var maxspeed;
  var minspeed;

function init() {
    
    foil1.src = 'foil1.png';
    foil2.src = 'foil2.png';
    man_top.src = 'man2.png';
    man_legs.src = 'man1.png';
    board.src = 'board_only.png';
    foil_pic.src = 'foil_only.png';
    // start animation:
  window.requestAnimationFrame(draw);
}

// sliders:
var speed_slider = document.getElementById("speed");
var speed_output = document.getElementById("speed_output");
var speed_output_max = document.getElementById("speed_max");
var speed_output_min = document.getElementById("speed_min");
speed_slider.oninput = function() {
    AngleOfAttack = 15-(0.1*speed_slider.value);
    speed_output.innerHTML = (speed*0.75).toFixed(1);
    speed_output_max.innerHTML = (maxspeed*0.75).toFixed(1);
    speed_output_min.innerHTML = (minspeed*0.75).toFixed(1);
    
    draw();
    };
    
var fuse_slider = document.getElementById("fuselength");
var fuse_output = document.getElementById("fuselengthdisplay");
fuse_slider.oninput = function() {
        fuselage_len = fuse_slider.value;
        fuse_output.innerHTML = (fuselage_len*0.4).toFixed(0);
        } ;

var frontwingsize_slider = document.getElementById("frontfoilsize");
var frontwingoutput = document.getElementById("displayfrontfoilsize");
frontwingsize_slider.oninput = function() {
        frontwingsize = frontwingsize_slider.value;
        frontwingoutput.innerHTML = frontwingsize*40;
        } ;

var rearwingsize_slider = document.getElementById("rearfoilsize");
var rearwingoutput = document.getElementById("displayrearfoilsize");
      rearwingsize_slider.oninput = function() {
        backwingsize = 0.5*rearwingsize_slider.value;
        rearwingoutput.innerHTML = backwingsize*40;
            } ;

var shim_slider = document.getElementById("shim");
var shim_output = document.getElementById("shim_num");
      shim_slider.oninput = function() {
              shim = shim_slider.value*0.5;
              shim_output.innerHTML = ((Number(shim))+2);
                  } ;

// main draw function
function draw() {
  const ctx = document.getElementById('myCanvas').getContext('2d');
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 650, 300); // clear canvas
  
  
  // middle of front wing:
  var front_x = 100;
  var front_y = 80;
  var req_lift = 5000;
  
  // back foil lift is positive downward:
var min_AoA = 0;
min_AoA =  (backwingsize-4)/4-(shim/5);

if (AngleOfAttack<min_AoA) {AngleOfAttack = min_AoA};
var cL_back = (-AngleOfAttack+5-Number(shim))/20;
// min downward lift at low speed (15 degrees AoA)
var cl_back_min = -0.5-(shim/20);
// max downward lift at high speed (0 degrees AoA)
var cl_back_max = (-min_AoA+5-Number(shim))/20;
var cL = (AngleOfAttack+5)/20;
var cL_max = (min_AoA+5)/20;
speed = Math.sqrt(req_lift/((cL*frontwingsize)-(cL_back*backwingsize)));
  
  var front_lift = cL*frontwingsize*speed*speed;
  var back_lift = cL_back*backwingsize*speed*speed;

   
   maxspeed = Math.sqrt(req_lift/((cL_max*frontwingsize)-(cl_back_max*backwingsize))); // AoA = 0
   minspeed = Math.sqrt(req_lift/((1*frontwingsize)-(cl_back_min*backwingsize))); // AoA = 15

   // output speeds:
   speed_output.innerHTML = (speed*0.75).toFixed(1);
   speed_output_max.innerHTML = (maxspeed*0.75).toFixed(1);
   speed_output_min.innerHTML = (minspeed*0.75).toFixed(1);

   
  
  
  var front_lift_max = cL_max*frontwingsize*maxspeed*maxspeed; // AoA = 0
  var front_lift_min = 1*frontwingsize*minspeed*minspeed; // AoA = 15
  var back_lift_max = cl_back_max*backwingsize*maxspeed*maxspeed;
  var back_lift_min = cl_back_min*backwingsize*minspeed*minspeed;

  var max_drag = front_lift_max+back_lift_max;
  if (back_lift_max<0) {drag = front_lift_max-back_lift_max};


  var AoA_radians = AngleOfAttack*Math.PI/180;
  // middle of stabiliser:
  var back_x = front_x + fuselage_len*Math.cos(AoA_radians);
  var back_y = front_y + fuselage_len*Math.sin(AoA_radians);

  // position of balance point
  var bal_x = front_x - (fuselage_len*back_lift)/(front_lift-back_lift);
  var bal_y = 140;

  // balance point limits
  var fwd_limit = front_x - (fuselage_len*back_lift_min)/(front_lift_min-(back_lift_min));
  var back_limit = front_x - (fuselage_len*(back_lift_max))/(front_lift_max-(back_lift_max));

  // rotate and draw front wing:
  ctx.save();
  ctx.translate(front_x,front_y);
  ctx.rotate(AoA_radians);
  ctx.drawImage(foil1,-(frontwingsize*1.5),-frontwingsize*0.5,frontwingsize*3,frontwingsize);
  ctx.restore();

  // rotate and draw back wing:
  ctx.save();
  ctx.translate(back_x,back_y);
  ctx.rotate(AoA_radians+(Number(shim)*Math.PI/180));
  ctx.drawImage(foil2,-(backwingsize*3),-backwingsize*1,backwingsize*6,backwingsize*2);
  ctx.restore();

  // Fuselage
  ctx.beginPath();
  ctx.lineWidth = 8;
  ctx.moveTo(front_x,front_y);
  ctx.lineTo(back_x,back_y);
  ctx.stroke();

  // Balance point

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.arc(bal_x, bal_y, 6, 0, 2 * Math.PI);
  ctx.moveTo(bal_x+5,bal_y+5);
  ctx.lineTo(bal_x-5,bal_y-5);
  ctx.moveTo(bal_x-5,bal_y+5);
  ctx.lineTo(bal_x+5,bal_y-5);
  ctx.stroke();
  

  // Lift arrow front wing
  const time = new Date();
  var ypos = 20*Math.sin(0.001*Math.PI* time.getMilliseconds());
  ctx.beginPath();
  ctx.lineWidth = 2;
  var arrow_x = front_x-(frontwingsize*0.2);
  var arrow_y = 0 + ypos;
  var frontarrowsize = front_lift/150;
  var backarrowsize = back_lift/150;
  
  
  var a = +frontarrowsize+ +arrow_y;
    ctx.moveTo(arrow_x, 0 + arrow_y);
    ctx.lineTo(arrow_x, a);
    ctx.moveTo(0+ arrow_x, 0+ arrow_y);
    ctx.lineTo((frontarrowsize*0.25)+ arrow_x, (frontarrowsize*0.25)+ arrow_y);
    ctx.moveTo(0+ arrow_x, 0+ arrow_y);
    ctx.lineTo(-(frontarrowsize*0.25)+ arrow_x, (frontarrowsize*0.25)+ arrow_y);
    ctx.stroke();

    // lift arrow back wing
    ctx.beginPath;
    ctx.lineWidth = 1;
    var barrow_x = back_x-(backarrowsize*0.2);
    var barrow_y = +back_y + 30 - ypos;
    if (backarrowsize<0) {barrow_y = +back_y - 10 - ypos;}
    ctx.moveTo(barrow_x, barrow_y);
    ctx.lineTo(barrow_x, +backarrowsize+ +barrow_y);
    ctx.moveTo(0+ barrow_x, backarrowsize+ barrow_y);
    ctx.lineTo((backarrowsize*0.25)+ barrow_x, (backarrowsize*0.75)+ barrow_y);
    ctx.moveTo(0+ barrow_x, backarrowsize+ barrow_y);
    ctx.lineTo(-(backarrowsize*0.25)+ barrow_x,(backarrowsize*0.75)+ barrow_y);
    ctx.stroke();

    // draw balance point limits
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(fwd_limit,160);
    ctx.lineTo(back_limit,160);
    ctx.moveTo(fwd_limit,160);
    ctx.lineTo(fwd_limit,155);
    ctx.moveTo(back_limit,160);
    ctx.lineTo(back_limit,155);
    var mid_point = (fwd_limit+back_limit)/2;
    ctx.moveTo(mid_point,165);
    ctx.lineTo(mid_point,155);
    ctx.stroke();

    //draw man/foil picture
    var foil_x = 540 -(mid_point);
    var man_x = 470;
    var rot_angle = (bal_x-front_x)/100;
    ctx.drawImage(board,350,140,202,22);
    ctx.restore();
    ctx.drawImage(man_legs,man_x,92,70,65);
    ctx.drawImage(foil_pic,foil_x,160,136,96);

    // rotate top of man and draw:
    ctx.save();
  ctx.translate(man_x+35,117);
  ctx.rotate(rot_angle);
  ctx.drawImage(man_top,-35,-90,70,95);
  ctx.restore();
    
    

  
  window.requestAnimationFrame(draw);
}

init();



const foil1 = new Image();
const foil2 = new Image();
const man_top = new Image();
const man_legs = new Image();
const foil_pic = new Image();
const board = new Image();
const balancepointarrow = new Image();
var speed = 14;
var fuselage_len = 170;
var frontwingsize = 38;
var frontwinglength = 46;
  var backwingsize = 8;
  var shim = -2;
  var AngleOfAttack=7.5;
  var displayfrontfoilsize;
  var maxspeed;
  var minspeed;
  var max_AoA = 14;
  var drag_factor = 0.7;
  var delta_p_movement = 1;
  var height = 350;
  var stab_zero_AoA = 3;
  var min_AoA = 1;
var mid_AoA = 3;

function init() {
    
    foil1.src = 'foil1.png';
    foil2.src = 'foil2.png';
    man_top.src = 'man2.png';
    man_legs.src = 'man1.png';
    board.src = 'board_only.png';
    foil_pic.src = 'foil_only.png';
    balancepointarrow.src = 'balance_pt.png'
    // start animation:
  window.requestAnimationFrame(draw);
}


// sliders:
var speed_slider = document.getElementById("speed");
var speed_output = document.getElementById("speed_output");
var speed_output_max = document.getElementById("speed_max");
var speed_output_min = document.getElementById("speed_min");
speed_slider.oninput = function() {
    AngleOfAttack = 0.00071*Math.pow((speed_slider.value-140),2);
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
        frontwinglength = 7.8*Math.sqrt(frontwingsize);
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
  ctx.clearRect(0, 0, 650, 350); // clear canvas
  
  
  // middle of front wing:
  var front_x = 100;
  var front_y = 80;
  var req_lift = 5000;
  
 




if (AngleOfAttack<min_AoA) {AngleOfAttack = min_AoA};
var cL_back = (-AngleOfAttack+stab_zero_AoA-Number(shim))/20;
// min downward lift at max AoA)
var cl_back_min = (-max_AoA+stab_zero_AoA-Number(shim))/20;
// max downward lift at high speed (min AoA)
var cl_back_max = (-min_AoA+stab_zero_AoA-Number(shim))/20;
var cL = calc_cL(AngleOfAttack);
var cL_max = calc_cL(min_AoA);
var cL_min = calc_cL(max_AoA);
speed = Math.sqrt(req_lift/((cL*frontwingsize)-(cL_back*backwingsize)));
  
  var front_lift = cL*frontwingsize*speed*speed;
  var back_lift = cL_back*backwingsize*speed*speed;

   
   maxspeed = Math.sqrt(req_lift/((cL_max*frontwingsize)-(cl_back_max*backwingsize))); // AoA = min
   minspeed = Math.sqrt(req_lift/((cL_min*frontwingsize)-(cl_back_min*backwingsize))); // AoA = max

   // output speeds:
   speed_output.innerHTML = (speed*0.75).toFixed(1);
   speed_output_max.innerHTML = (maxspeed*0.75).toFixed(1);
   speed_output_min.innerHTML = (minspeed*0.75).toFixed(1);

  var min_drag_speed_sq = req_lift/((0.5*frontwingsize)-((-5+5-Number(shim))/20*backwingsize));
  var min_drag = 0.03*frontwingsize*min_drag_speed_sq;
  var drag = drag_factor*(min_drag+ (min_drag/20)*(Math.pow((AngleOfAttack+2),-0.4))*(Math.pow((AngleOfAttack-6),2)));

  //console.log("drag: ")
  //console.log(drag);
  //console.log("front lift: ")
  //console.log(front_lift);
  //console.log(AngleOfAttack);


  //Centre of pressure
  var delta_p = -0.5*frontwinglength*(AngleOfAttack/max_AoA)*delta_p_movement;

  

  var AoA_radians = AngleOfAttack*Math.PI/180;
  // middle of stabiliser:
  var back_x = front_x + fuselage_len*Math.cos(AoA_radians);
  var back_y = front_y + fuselage_len*Math.sin(AoA_radians);

  
  var cL_mid = calc_cL(mid_AoA);
  var cL_back_mid = (-mid_AoA+stab_zero_AoA-Number(shim))/20;
  var speed_mid_sq = (req_lift/((cL_mid*frontwingsize)-(cL_back_mid*backwingsize)));
  var drag_mid = drag_factor*( 0.04*frontwingsize*min_drag_speed_sq); // 0.04 rather than 0.03 vs min drag
  var front_lift_mid = cL_mid*frontwingsize*speed_mid_sq;
  var back_lift_mid = cL_back_mid*backwingsize*speed_mid_sq;
  var delta_p_mid = -frontwinglength*0.5*(mid_AoA/max_AoA)*delta_p_movement;
  var bal_x_mid =  front_x- (((drag_mid*height)-(back_lift_mid*fuselage_len)+ (front_lift_mid*delta_p_mid))/(back_lift_mid-front_lift_mid));
  
  
  
  // position of balance point
  var bal_x = front_x - ((drag*height)-(back_lift*fuselage_len)+ (front_lift*delta_p))/(back_lift-front_lift);
  var bal_y = 85;

  // balance point limits
  
  var mid_point = bal_x_mid;
  var mid_pt_cms =  -mid_point - front_x+(68*2) + 60;

  // Balance point

  ctx.beginPath();
  ctx.drawImage(balancepointarrow,bal_x-25,bal_y,39,50);
  ctx.lineTo(bal_x+5,bal_y-5);
  ctx.stroke();

  // rotate and draw front wing:
  ctx.save();
  ctx.translate(front_x,front_y);
  ctx.rotate(AoA_radians);
  ctx.drawImage(foil1,-(frontwinglength*0.5),-frontwinglength/6,frontwinglength,frontwinglength/3);
  ctx.restore();

  // rotate and draw back wing:
  ctx.save();
  ctx.translate(back_x,back_y);
  ctx.rotate(AoA_radians+(Number(shim)*Math.PI/180));
  var backwinglength = 1.5*Math.sqrt(backwingsize);
  ctx.drawImage(foil2,-(backwinglength*3),-backwinglength*1,backwinglength*6,backwinglength*2);
  ctx.restore();

  // Fuselage
  ctx.beginPath();
  ctx.lineWidth = 6;
  ctx.moveTo(front_x,front_y);
  ctx.lineTo(back_x,back_y);
  ctx.stroke();

  
  

  // Lift arrow front wing
  const time = new Date();
  var ypos = 20*Math.sin(0.001*Math.PI* time.getMilliseconds());
  ctx.beginPath();
  ctx.lineWidth = 2;
  var arrow_x = front_x+delta_p;
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
    //ctx.lineWidth = 2;
    //ctx.moveTo(fwd_limit,160);
    //ctx.lineTo(back_limit,160);
    //ctx.moveTo(fwd_limit,160);
    //ctx.lineTo(fwd_limit,155);
    //ctx.moveTo(back_limit,160);
    //ctx.lineTo(back_limit,155);
    ctx.font = "20px Arial";
    ctx.fillText("Foil track: "+mid_pt_cms.toFixed(1) + " cms", 400, 300); 
    //ctx.moveTo(mid_point,165);
    //ctx.lineTo(mid_point,155);
    ctx.stroke();

    //draw man/foil picture
    var foil_x = 580 -(mid_point);
    var man_x = 450;
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

  
    
  //draw graph origin 10,200
  ctx.beginPath();
  ctx.font = "14px Arial";
    ctx.fillText("Speed", 165, 345);
    ctx.lineWidth = 2;
    
    ctx.fillText("Nose Up", 1, 195);
  ctx.moveTo(20,200);
  ctx.lineTo(16,204);
  ctx.moveTo(20,200);
  ctx.lineTo(24,204);
  ctx.moveTo(20,200);
  ctx.lineTo(20,340);
  
  ctx.lineTo(160,340);
  ctx.lineTo(156,344);
  ctx.moveTo(160,340);
  ctx.lineTo(156,336);
  ctx.moveTo(20,340);
  

  var min_AoA_a = Math.round(min_AoA*10);
  
  var b;
  

  for ( b = min_AoA_a; b<= (max_AoA-3)*10; b++) {
  
  var  a=0.1*b;
  console.log()
  var cL_back_a = (-a+stab_zero_AoA-Number(shim))/20;
  var cL_a = calc_cL(a);
  var speed_a = Math.sqrt(req_lift/((cL_a*frontwingsize)-(cL_back_a*backwingsize)));
  
  var front_lift_a = cL_a*frontwingsize*speed_a*speed_a;
  var back_lift_a = cL_back_a*backwingsize*speed_a*speed_a;
  var min_drag_speed_sq_a = req_lift/((0.5*frontwingsize)-((-5+5-Number(shim))/20*backwingsize));
  var min_drag_a = 0.03*frontwingsize*min_drag_speed_sq_a;
  var drag_a = drag_factor*(min_drag_a+ (min_drag_a/20)*(Math.pow((a+2),-0.4))*(Math.pow((a-6),2)));
  var delta_p_a = -frontwinglength*(a/max_AoA)*0.5*delta_p_movement;
  var balpt_a = -((drag_a*height)-(back_lift_a*fuselage_len)+ (front_lift_a*delta_p_a))/(back_lift_a-front_lift_a);
  
  

  if (b < ((min_AoA_a)+0.5)) { ctx.moveTo(speed_a*5 - 20,1*balpt_a + 300);};
    
  if (b > ((min_AoA_a)+0.5)) {  ctx.lineTo(speed_a*5- 20,1*balpt_a + 300);};
    

  }; // end of loop
  ctx.stroke();
  
  window.requestAnimationFrame(draw);
}

function calc_cL(AoA) {

  var cL_out = 0.8 + 0.005*AoA - 0.003*Math.pow((AoA-14),2);
  return cL_out;
}

init();



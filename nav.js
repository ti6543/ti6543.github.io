function setnavbar() {

var navbar = ` 
<a class = "pic"  href="index.html" > <img src="figure_wing.png" height="60px" width = "60px"/></a>
<nav class="navBar">
    <div class="container">
        <ul class="nav">
          

            <li class="list1">Foil Knowledge
                <div class="nav1">
                  <a href="whatisahyrdofoil.html" style="display:block">What is a hydrofoil?</a>
                  <a href="frontwingsandstabs.html" style="display:block">Front wings and stabilisers</a>
                  <a href="ridingafoil.html" style="display:block">How a foil is controlled</a>
                  <a href="foilsetup.html" style="display:block">Foil setup</a>
                  <a href="foilsetupadvanced.html" style="display:block">Foil setup (advanced)</a>
                    <a href="foil_animation.html" style="display:block">Foil balance simulator</a>
                    <a href="maneuverability.html" style="display:block">Maneuverability</a>
                    <a href="drag.html" style="display:block">Drag</a>
                    <a href="foilshapessizes.html" style="display:block">Foil shapes & sizes</a>
                    <a href="choosingafoil.html" style="display:block">Choosing a foil</a>
                  </div>
               </li>
               <li class="list1" >Wingfoil technique
                <div class="nav1">
                    <a href="foiling.html" style="display:block">Getting Foiling</a>
                    <a href="gybing.html" style="display:block">Gybing</a>
                    <a href="tacking.html" style="display:block">Tacking</a>
                </div>
              </li>
              
                 <li class="list1">Weather
                  <div class="nav1">
                    <a href="SouthEastWeather.html" style="display:block">South East Weather</a>
                </div>
                </li>
              
                <li class="list1">Extras
                  <div class="nav1">
                  <a href="about.html" style="display:block">About</a>
                </div>
                </li>
        </ul>
    </div>
</nav>
`;

var navbar_knowledge = ` 
<a class = "pic"  href="index.html" > <img src="figure_wing.png" height="60px" width = "60px"/></a>
<nav class="navBar">
    <div class="container">
        <ul class="nav">
          

            <li class="list1">Foil Knowledge
                <div class="nav1">
                  <a href="whatisahyrdofoil.html" style="display:block">What is a hydrofoil?</a>
                  <a href="frontwingsandstabs.html" style="display:block">Front wings and stabilisers</a>
                  <a href="ridingafoil.html" style="display:block">How a foil is controlled</a>
                  <a href="foilsetup.html" style="display:block">Foil setup</a>
                  <a href="foilsetupadvanced.html" style="display:block">Foil setup (advanced)</a>
                    <a href="foil_animation.html" style="display:block">Foil balance simulator</a>
                    <a href="maneuverability.html" style="display:block">Maneuverability</a>
                    <a href="drag.html" style="display:block">Drag</a>
                    <a href="foilshapessizes.html" style="display:block">Foil shapes & sizes</a>
                    <a href="choosingafoil.html" style="display:block">Choosing a foil</a>
                  </div>
               </li>

               </ul>
               </div>
           </nav>

              <div class = "menu">
               <img src="menu_icon.png" height="40px" width = "40px"/>
               <div class="nav1">
               <a href="index.html" style="display:block">Home</a>
                <a href="foiling.html" style="display:block">Wingfoil technique</a>
                <a href="SouthEastWeather.html" style="display:block">Weather</a>
                <a href="about.html" style="display:block">About</a>
              </div>
              </div>
           
              
              
                
  
`;

var navbar_technique = ` 
<a class = "pic"  href="index.html" > <img src="figure_wing.png" height="60px" width = "60px"/></a>
<nav class="navBar">
    <div class="container">
        <ul class="nav">
          

        <li class="list1" >Wingfoil technique
          <div class="nav1">
            <a href="foiling.html" style="display:block">Getting Foiling</a>
            <a href="gybing.html" style="display:block">Gybing</a>
            <a href="tacking.html" style="display:block">Tacking</a>
        </div>
      </li>
      </ul>
      </div>
  </nav>

     <div class = "menu">
      <img src="menu_icon.png" height="40px" width = "40px"/>
      <div class="nav1">
      <a href="index.html" style="display:block">Home</a>
      <a href="whatisahyrdofoil.html" style="display:block">Foil Knowledge</a>
       <a href="SouthEastWeather.html" style="display:block">Weather</a>
       <a href="about.html" style="display:block">About</a>
     </div>
     </div>
              
    
`;

var navbar_index = ` 
<nav class="navBar">
    <div class="container">
    </div>
    </nav>
<a class = "pic"  href="index.html" > <img src="figure_wing.png" height="60px" width = "60px"/></a>
<div class = "menu">
      <img src="menu_icon.png" height="40px" width = "40px"/>
      <div class="nav1">
      <a href="index.html" style="display:block">Home</a>
      <a href="whatisahyrdofoil.html" style="display:block">Foil Knowledge</a>
      <a href="foiling.html" style="display:block">Wingfoil technique</a>
       <a href="SouthEastWeather.html" style="display:block">Weather</a>
       <a href="about.html" style="display:block">About</a>
     </div>
     </div>
`;

var currentURL = window.location.pathname.split("/").pop()
    console.log(currentURL);
    document.querySelectorAll('a[href="'+currentURL+'"]').forEach(function(elem){elem.className += ' current-link'});

let width = window.innerWidth;

let address = window.location.href.split("/").pop();

const knowledge = ["whatisahyrdofoil.html", "frontwingsandstabs.html", "ridingafoil.html", "foilsetup.html", "foilsetupadvanced.html", "foil_animation.html", "maneuverability.html", "drag.html", "foilshapesandsizes.html", "choosingafoil.html"];
let know = new Boolean(false);

const technique = ["foiling.html", "gybing.html", "tacking.html"];
let tech = new Boolean(false);

for (let i = 0; i < knowledge.length; i++) {
  if (knowledge[i] == address) { know = true; }
} 

for (let i = 0; i < technique.length; i++) {
  if (technique[i] == address) { tech = true; }
} 




if (know == true && width<700) {document.body.insertAdjacentHTML("beforeend", navbar_knowledge);}
else if (tech == true && width<700) {document.body.insertAdjacentHTML("beforeend", navbar_technique);}
else if (address == "index.html" && width<700) {document.body.insertAdjacentHTML("beforeend", navbar_index);}
else if (address == "" && width<700) {document.body.insertAdjacentHTML("beforeend", navbar_index);}
else if (address == "SouthEastWeather.html" && width<700) {document.body.insertAdjacentHTML("beforeend", navbar_index);}
else if (address == "about.html" && width<700) {document.body.insertAdjacentHTML("beforeend", navbar_index);}
else {document.body.insertAdjacentHTML("beforeend", navbar);};

}

window.addEventListener("resize", setnavbar);

setnavbar();



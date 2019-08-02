import { VctrApi } from "https://www.vectary.com/embed/viewer/v1/scripts/api/api.js";

let vctrApi;

const appElement = document.getElementById('app');
const menuElement = document.getElementById('menu');
const toggleElement = document.getElementById('menu-toggle');


function globalErrHandler(objects) {
    console.log("test api failed", objects);
}

menuElement.classList.add('closed');

//Menu loading based on width
// if (document.getElementById('app').clientWidth <= 600)  {
//     menuElement.classList.add('closed');
// }
// else {
//     menuElement.classList.add('open');
//     toggleElement.classList.add('is-active');
// }

//Menu toggling
toggleElement.onclick = function() {  
    this.classList.toggle('is-active'); 
    
    if (menuElement.classList.contains("open")) {
        menuElement.classList.remove('open'); 
        menuElement.classList.add('closed'); 
    }
    else {
        menuElement.classList.remove('closed'); 
        menuElement.classList.add('open'); 
    }
}

//Highlighting
var items = document.querySelectorAll("#menu > ul.items > li > a");
var highlightObjects = function() {
    var mesh = this.getAttribute("data-mesh");
    var camera = this.getAttribute("data-camera");
    //alert(attribute);
    vctrApi.setCamera(camera);
    vctrApi.highlightMeshByName(mesh, "#ffe81c", 0.2, true);

    //close menu
    toggleElement.classList.toggle('is-active')
    menuElement.classList.remove('open');
    menuElement.classList.add('closed');  
};

for (var i = 0; i < items.length; i++) {  
  items[i].addEventListener('click', highlightObjects, false);
}

// async function fetchData(path) {
//     return new Promise((resolve, reject) => {
//         try {
//             fetch(path)
//                 .then(file => file.json()
//                     .then(json => resolve(json)));
//         } catch (e) {
//             reject(e);
//         }
//     });
// }

async function run() {
  console.log("Example script running..");

  function errHandler(err) {
      console.log("API error", err);
  }

  async function onReady() {
      console.log("API ready..");

      try {
          console.log(await vctrApi.getObjects());
          vctrApi.addAnnotation({
              name: "Grape Stage",
              objectName: "grape_stage"
          });
          vctrApi.addAnnotation({
              name: "Orange stage",
              objectName: "orange_stage"
          });
          vctrApi.addAnnotation({
            name: "Yeme tržnica",
            objectName: "trznica#10"
          });
          vctrApi.addAnnotation({
            name: "Jameson",
            objectName: "jameson"
          });
          vctrApi.addAnnotation({
            name: "365 stage",
            objectName: "365_stage"
          });
          vctrApi.addAnnotation({
            name: "Suzuki stage",
            objectName: "suzuki_stage"
          });
          vctrApi.addAnnotation({
            name: "Hlavný vstup",
            objectName: "main_entry"
          });
          vctrApi.addAnnotation({
            name: "Vstup stanové mesto",
            objectName: "entry_tent_city"
          });
          vctrApi.addAnnotation({
            name: "Chill village",
            objectName: "chill_village"
          });
          vctrApi.addAnnotation({
            name: "Tent Inn",
            objectName: "tent_inn"
          });
          vctrApi.addAnnotation({
            name: "Camp manager",
            objectName: "camp_manager"
          });
          vctrApi.addAnnotation({
            name: "Tent Inn",
            objectName: "tent_inn"
          });
          vctrApi.addAnnotation({
            name: "Nay stage",
            objectName: "nay_stage"
          });
          vctrApi.addAnnotation({
            name: "Grape pavilon",
            objectName: "grape_pavilon"
          });
          vctrApi.addAnnotation({
            name: "U rampa",
            objectName: "u_rampa"
          });
          vctrApi.addAnnotation({
            name: "U rampa",
            objectName: "u_rampa"
          });
          vctrApi.addAnnotation({
            name: "Stanové mestečko",
            objectName: "tents"
          });
          vctrApi.addAnnotation({
            name: "Urban market",
            objectName: "urban_market_1"
          });
          vctrApi.addAnnotation({
            name: "Merch",
            objectName: "merch"
          });
          vctrApi.addAnnotation({
            name: "Kaufland zóna",
            objectName: "kaufland_zona"
          });
          vctrApi.addAnnotation({
            name: "Mazagrande",
            objectName: "masagrande"
          });
          vctrApi.addAnnotation({
            name: "SSE zóna",
            objectName: "sse_zona"
          });
          vctrApi.addAnnotation({
            name: "Pilsner Urquell",
            objectName: "pilsner"
          });
          vctrApi.addAnnotation({
            name: "Rádio_FM Urban market hangair",
            objectName: "radio_fm_urban_market_hangair"
          });

          await vctrApi.enableAnnotations(true);

      } catch (e) {
          errHandler(e);
      }

  }

  vctrApi = new VctrApi("g19", errHandler);
  try {
      await vctrApi.init();        
      //addEventListeners();
      onReady();
      
  } catch (e) {
      errHandler(e);
  }
}

run();
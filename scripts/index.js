import { VctrApi } from "https://www.vectary.com/embed/viewer/v1/scripts/api/api.js";

let vctrApi;

const appElement = document.getElementById('app');
const menuElement = document.getElementById('menu');
const toggleElement = document.getElementById('menu-toggle');

const annotationsMap = new Map();


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
    vctrApi.highlightMeshByName(mesh, "#ffe81c", 0.2, true);
    if (annotationsMap.has(mesh)) {
        vctrApi.expandAnnotationsById([annotationsMap.get(mesh)], true, true);
    }

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

      let annotation;
      try {
          console.log(await vctrApi.getObjects());
          annotation = await vctrApi.addAnnotation({
              name: "Grape Stage",
              objectName: "grape_stage"
          });
          if (annotation) {
              annotationsMap.set("grape_stage", annotation.id);
          }
          annotation = await vctrApi.addAnnotation({
              name: "Orange stage",
              objectName: "orange_stage"
          });
          if (annotation) {
            annotationsMap.set("orange_stage", annotation.id);
        }
          annotation = await vctrApi.addAnnotation({
            name: "Orange zóna",
            objectName: "orange_zona"
          });
          if (annotation) {
            annotationsMap.set("orange_zone", annotation.id);
        }
          annotation = await vctrApi.addAnnotation({
            name: "Úschovňa",
            objectName: "uschovna"
          });
          if (annotation) {
            annotationsMap.set("uschovna", annotation.id);
        }
          annotation = await vctrApi.addAnnotation({
            name: "Yeme tržnica",
            objectName: "trznica#10"
          });
          if (annotation) {
            annotationsMap.set("trznica#10", annotation.id);
        }
          annotation = await vctrApi.addAnnotation({
            name: "Gastro",
            objectName: "gastro"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Očistec stage",
            objectName: "ocistec_stage"
          });
          if (annotation) {
            annotationsMap.set("ocistec_stage", annotation.id);
        }
          annotation = await vctrApi.addAnnotation({
            name: "Jameson",
            objectName: "jameson"
          });
          annotation = await vctrApi.addAnnotation({
            name: "365.bank stage",
            objectName: "365_stage"
          });
          annotation = await vctrApi.addAnnotation({
            name: "365.bank cafe",
            objectName: "365bank_cafe"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Mastercard",
            objectName: "master_card"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Suzuki stage",
            objectName: "suzuki_stage"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Hlavný vstup",
            objectName: "main_entry"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Vstup stanové mesto",
            objectName: "entry_tent_city"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Chill village",
            objectName: "chill_village"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Tent Inn",
            objectName: "tent_inn"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Camp manager",
            objectName: "camp_manager"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Tent Inn",
            objectName: "tent_inn"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Nay stage",
            objectName: "nay_stage"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Grape pavilon",
            objectName: "grape_pavilon"
          });
          annotation = await vctrApi.addAnnotation({
            name: "U rampa",
            objectName: "u_rampa"
          });
          annotation = await vctrApi.addAnnotation({
            name: "U rampa",
            objectName: "u_rampa"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Stanové mestečko",
            objectName: "tents"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Urban market",
            objectName: "urban_market_1"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Merch",
            objectName: "merch"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Kaufland zóna",
            objectName: "kaufland_zona"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Mazagrande",
            objectName: "mazagrande"
          });
          annotation = await vctrApi.addAnnotation({
            name: "SSE zóna",
            objectName: "sse_zona"
          });
          annotation = await vctrApi.addAnnotation({
            name: "Pilsner Urquell",
            objectName: "pilsner"
          });
          annotation = await vctrApi.addAnnotation({
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
import { VctrApi } from "https://www.vectary.com/embed/viewer/v1/scripts/api/api.js";

let vctrApi;

const appElement = document.getElementById('app');
const menuElement = document.getElementById('menu');
const toggleElement = document.getElementById('menu-toggle');


function globalErrHandler(objects) {
    console.log("test api failed", objects);
}

//Menu loading based on width
if (document.getElementById('app').clientWidth <= 600)  {
    menuElement.classList.add('closed');
}
else {
    menuElement.classList.add('open');
    toggleElement.classList.add('is-active');
}

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
              objectName: "grape_main_stage"
          });
          vctrApi.addAnnotation({
              name: "Orange stage",                
              objectName: "orange_stage"
          });
          vctrApi.addAnnotation({
            name: "Tržnica",                
            objectName: "trznica#10"
          });
          vctrApi.addAnnotation({
            name: "Jameson",                
            objectName: "containers"
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
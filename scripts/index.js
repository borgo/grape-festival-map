import { VctrApi } from "https://www.vectary.com/embed/viewer/v1/scripts/api/api.js";

let api, data;

function globalErrHandler(objects) {
    console.log("test api failed", objects);
}

//Menu loading based on width
const appElement = document.getElementById('app');
const menuElement = document.getElementById('menu');
if (document.getElementById('app').clientWidth <= 600)  {
    menuElement.classList.add('closed');
}
else {
    menuElement.classList.add('open');
    toggleElement.classList.add('is-active');
}

//Menu toggling
const toggleElement = document.getElementById('menu-toggle');
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
    var attribute = this.getAttribute("data-filter");
    alert(attribute);
};

for (var i = 0; i < items.length; i++) {  
  items[i].addEventListener('click', highlightObjects, false);
}

async function fetchData(path) {
    return new Promise((resolve, reject) => {
        try {
            fetch(path)
                .then(file => file.json()
                    .then(json => resolve(json)));
        } catch (e) {
            reject(e);
        }
    });
}

async function run() {
    console.log("Example API running..");

    try {
        api = new VctrApi("g19", globalErrHandler);

        await api.init();

        data = await fetchData("../resource.json");
                
        console.log("Ready...");
        console.log("All objects", await api.getObjects());

    } catch (e) {
        globalErrHandler(e);
    }
}

run();
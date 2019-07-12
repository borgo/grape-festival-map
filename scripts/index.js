import { VctrApi } from "https://www.vectary.com/embed/viewer/v1/scripts/api/api.js";

let api, data;

function globalErrHandler(objects) {
    console.log("test api failed", objects);
}

//Menu loading based on width
if (document.getElementById('app').clientWidth <= 600)  {
    document.getElementById('menu').classList.add('closed');
}
else {
    document.getElementById('menu').classList.add('open');
    document.getElementById('menu-toggle').classList.add('is-active');
}

//Menu toggling
document.getElementById('menu-toggle').onclick = function() {  
    this.classList.toggle('is-active'); 
    
    if (document.getElementById('menu').classList.contains("open")) {
        document.getElementById('menu').classList.remove('open'); 
        document.getElementById('menu').classList.add('closed'); 
    }
    else {
        document.getElementById('menu').classList.remove('closed'); 
        document.getElementById('menu').classList.add('open'); 
    }
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
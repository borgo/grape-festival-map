import { VctrApi } from "https://www.vectary.com/embed/viewer/v1/scripts/api/api.js";

let vctrApi;

const menuElement = document.getElementById('menu');
const toggleElement = document.getElementById('menu-toggle');

const annotationsMap = new Map();


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
toggleElement.onclick = function () {
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
const items = document.querySelectorAll("#menu > ul.items > li > a");

const highlightObjects = function () {
    
    let meshes = this.getAttribute("data-highlight").split(",");
  
    vctrApi.highlightMeshesByName(meshes, "#ffe81c", 0.3, true);

    const annotationsIds = meshes
        .filter(mesh => annotationsMap.has(mesh))
        .map(mesh => annotationsMap.get(mesh));
    if (annotationsIds.length) {
      vctrApi.expandAnnotationsById(annotationsIds, true, true);
    }
    
    toggleElement.classList.toggle('is-active')
    menuElement.classList.remove('open');
    menuElement.classList.add('closed');
};

for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', highlightObjects, false);
}

async function run() {
    console.log("Example script running..");

    function errHandler(err) {
        console.log("API error", err);
    }

    function addAnnotation(name, objectName) {
        vctrApi.addAnnotation({
            name: name,
            objectName: objectName
        })
            .then(annotation => {
                if (annotation !== null) {
                    annotationsMap.set(objectName, annotation.id);
                }
            });
    }

    async function onReady() {
        console.log("API ready..");

        try {
            console.log(await vctrApi.getObjects());
            addAnnotation("Úschovňa / Straty a nálezy", "uschovna");
            addAnnotation("Mazagrande", "mazagrande");
            addAnnotation("Kaufland zóna", "kaufland_zona");
            addAnnotation("365.Bank cafe", "365bank_cafe");
            addAnnotation("Camp manager", "camp_manager");
            addAnnotation("Corny šport", "futbalka_3");
            addAnnotation("Grape pavilon", "grape_pavilon");
            addAnnotation("Frisco sunset", "pomaranc_3"); //@TODO
            addAnnotation("Nivea / Rowenta", "ruz_3");
            addAnnotation("Birell", "trampolina_3");  //@TODO
            addAnnotation("Požičovňa", "pozicovna"); //@TODO
            addAnnotation("Good point", "stolicka_3");
            addAnnotation("Orange zóna", "orange_zona");
            addAnnotation("Pilsner Urquell", "pilsner");
            addAnnotation("SSE zóna", "sse_zona");
            addAnnotation("Tržnica", "trznica#10");
            addAnnotation("Gastro", "gastro");
            addAnnotation("Jameson", "jameson");
            addAnnotation("Gambrinus truck", "gambrinus"); //@TODO
            addAnnotation("Shop", "merch");
            addAnnotation("Royal crown zóna", "royal_crown_zona"); //@TODO
            addAnnotation("Mastercard", "master_card");
            addAnnotation("Avon", "avon"); //@TODO
            addAnnotation("Urban market", "urban_market_1");
            addAnnotation("Red bull organics", "redbull_organic_3");
            addAnnotation("Grape Stage", "grape_stage_1");
            addAnnotation("Orange stage", "orange_stage");
            addAnnotation("Suzuki stage", "suzuki_stage");
            addAnnotation("365.Bank stage", "365_stage");
            addAnnotation("Nay stage", "nay_stage");
            addAnnotation("Rádio_FM Urban market hangair", "radio_fm_urban_market_hangair");
            addAnnotation("Redbull rapstorm stage", "redbull_rapstorm"); //@TODO
            addAnnotation("Očistec stage", "ocistec_stage");
            addAnnotation("Hlavný vstup", "main_entry_2");
            addAnnotation("Vstup stanové mesto", "entry_tent_city");
            addAnnotation("Biela noc \"Perspektíva\"", "biela_noc_perspektiva");            
            addAnnotation("Chill village", "chill_village");
            addAnnotation("Tent Inn", "tent_inn");
            addAnnotation("U rampa", "u_rampa");            
            addAnnotation("Stanové mestečko", "tents");
            addAnnotation("Prvá pomoc", "doctor_3");
            await vctrApi.enableAnnotations(true);

        } catch (e) {
            errHandler(e);
        }

    }

    vctrApi = new VctrApi("g19", errHandler);
    try {
        await vctrApi.init();
        onReady();

    } catch (e) {
        errHandler(e);
    }
}

run();
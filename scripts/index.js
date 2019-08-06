import { VctrApi } from "https://www.vectary.com/embed/viewer/v1/scripts/api/api.js";

let vctrApi;

const menuElement = document.getElementById('menu');
const toggleElement = document.getElementById('menu-toggle');

const annotationsMap = new Map();


menuElement.classList.add('closed');

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

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

//Highlighting
const items = document.querySelectorAll("#menu > .inner > ul.items > li > a");

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

    function addAnnotation(name, enName, objectName) {
        if (getQueryVariable("lang") === "en") { 
          name = enName;
        }
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
          addAnnotation("Úschovňa / Straty a nálezy", "Depository / Lost and found", "uschovna");
          addAnnotation("Mazagrande", "Mazagrande", "mazagrande");
          addAnnotation("Kaufland zóna", "Kaufland zone", "kaufland_zona");
          addAnnotation("365.Bank cafe", "365.Bank cafe", "365bank_cafe");
          addAnnotation("Camp manager", "Camp manager", "camp_manager");
          addAnnotation("Corny šport", "Corny sport", "futbalka_3");
          addAnnotation("Grape pavilon", "Grape pavilon", "grape_pavilon");
          addAnnotation("Frisco sunset", "Frisco sunset", "pomaranc_3");
          addAnnotation("Nivea / Rowenta", "Nivea / Rowenta", "ruz_3");
          addAnnotation("Birell", "Birell", "trampolina_3");
          addAnnotation("Požičovňa", "Rental", "pozicovna");
          addAnnotation("Good point", "Good point", "stolicka_3");
          addAnnotation("Orange zóna", "Orange zone", "orange_zona_2");
          addAnnotation("Pilsner Urquell", "Pilsner Urquell", "pilsner");
          addAnnotation("SSE zóna", "SSE zone", "sse_zona");
          addAnnotation("Tržnica", "Market", "trznica#10");
          addAnnotation("Gastro", "Gastro", "gastro");
          addAnnotation("Jameson", "Jameson", "jameson_2");
          addAnnotation("Gambrinus truck", "Gambrinus truck", "gambrinus_bus_2");
          addAnnotation("Shop", "Shop", "shop");
          addAnnotation("Royal crown zóna", "Royal crown zone", "royal_crown_zona_1");
          addAnnotation("Mastercard", "Mastercard", "master_card");
          addAnnotation("Avon", "Avon", "avon");
          addAnnotation("Urban market", "Urban market", "urban_market_1");
          addAnnotation("Red bull organics", "Red bull organics", "redbull_organic_3");
          addAnnotation("Grape Stage", "Grape Stage", "grape_stage_1");
          addAnnotation("Orange stage", "Orange stage", "orange_stage");
          addAnnotation("Suzuki stage", "Suzuki stage", "suzuki_stage");
          addAnnotation("365.Bank stage", "365.Bank stage", "365_stage");
          addAnnotation("Nay stage", "Nay stage", "nay_stage");
          addAnnotation("Rádio_FM Urban market hangair", "Rádio_FM Urban market hangair", "radio_fm_urban_market_hangair");
          addAnnotation("Redbull rapstorm stage", "Redbull rapstorm stage", "red_bull_rapstorm_stage_4");
          addAnnotation("Očistec stage", "Purgatory stage", "ocistec_stage");
          addAnnotation("Hlavný vstup", "Main entrance", "main_entry_2");
          addAnnotation("Vstup stanové mesto", "Entrance for tent city", "entry_tent_city");
          addAnnotation("Biela noc \"Perspektíva\"", "White night \"Perspective\"", "biela_noc_perspektiva_1");
          addAnnotation("Chill village", "Chill village", "chill_village");
          addAnnotation("Tent Inn", "Tent Inn", "tent_inn");
          addAnnotation("U rampa", "U ramp", "u_rampa");
          addAnnotation("Stanové mestečko", "Tents", "tents");
          addAnnotation("Prvá pomoc", "First aid", "doctor_1");
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
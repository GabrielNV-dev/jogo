import {} from "./player/player.js";
import {} from "./desktop/inventario.js";
import {} from "./desktop/hotbar.js";
import {} from "./coordenadas/posicoes.js"
import {} from "./entidades/porco.js"
const desktop = document.querySelector(".desktop");
function ajustarDesktop() {
    if (!desktop) return;

    if (window.innerWidth <= 981) {
        document.getElementById("setas").style.display = "grid"
        desktop.style.setProperty("bottom", "200px", "important");
    } else {
        document.getElementById("setas").style.display = "none"
        desktop.style.setProperty("bottom", "10px", "important");
    }
}

window.addEventListener("load", ajustarDesktop);
window.addEventListener("resize", ajustarDesktop);
window.addEventListener("orientationchange", ajustarDesktop);

ajustarDesktop();


window.addEventListener("load", () => {
    window.scrollTo({
        left: 1250 - window.innerWidth / 2,
        top: 900 - window.innerHeight / 2,
        behavior: "instant"
    });
});
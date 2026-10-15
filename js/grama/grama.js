import { itens, atualizar } from "../utils.js";
import { press_E } from "../interacao/press_E.js";
import { grama } from "./spr_grama.js";

const cores = {
    F: "grama-verde",
    O: "grama-sombra",
};

function criarGrama(sprit, x, y, id) {
    const elemento = document.createElement("div");

    elemento.classList.add("grama");
    elemento.classList.add("objeto");

    elemento.style.left = `${x}px`;
    elemento.style.top = `${y}px`;
    elemento.id = id;
    sprit.forEach(linha => {
        [...linha].forEach(pixel => {
            const div = document.createElement("div");

            div.classList.add("pixel");

            if (cores[pixel]) {
                div.classList.add(cores[pixel]);
            }

            elemento.appendChild(div);
        });
    });

    document.body.appendChild(elemento);
}
const gramas = [
    { x: 25, y: 50 },
    { x: 50, y: 50 },
    { x: 50, y: 30 },
];

gramas.forEach((posicao, index) => {
    criarGrama(grama.padrao, posicao.x, posicao.y, `grama-${index}`);
});

document.addEventListener("keydown", (event) => {

    const player = document.getElementById("boneco")
    var posicao = player.getBoundingClientRect();

    document.querySelectorAll(".grama").forEach(item2 => {
        const rect2 = item2.getBoundingClientRect();

        const distanciaX = rect2.left - posicao.right;
        const distanciaY = rect2.top - posicao.bottom;
        if (
            distanciaX <= -10 &&
            distanciaX >= -50 &&
            distanciaY >= -65.5 &&
            distanciaY <= -25.5
        ) {
            atualizar(grama.interacao, item2.id, cores)
        } else {
            atualizar(grama.padrao, item2.id, cores)
        }
    })
});

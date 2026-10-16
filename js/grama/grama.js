import { itens, atualizar } from "../utils.js";
import { press_E } from "../interacao/press_E.js";
import { grama } from "./spr_grama.js";

const cores = {
    F: "grama-verde",
    O: "grama-sombra",
};

export function criarGrama(sprit, x, y, id) {
    const elemento = document.createElement("div");

    elemento.classList.add("grama");

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

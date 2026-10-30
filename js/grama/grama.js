import { aplicarSprite } from "../sprites.js";

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
    aplicarSprite(elemento, sprit, cores);

    document.body.appendChild(elemento);
}


import { atualizar } from "../utils.js";
import { porco } from "./sprs/spr_porco.js";

const cores = {
    C: "porco-corpo",
    P: "porco-pe",
    O: "porco-olho",
    B: "porco-boca",
};

export function criarPorco(sprit, x, y, id) {
    const elemento = document.createElement("div");

    elemento.classList.add("porco", "entidade");
    elemento.style.position = "absolute";
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

    return elemento;
}

criarPorco(porco.frente, 1100, 900, "porco-1");
atualizar(porco.frente, "porco-1", cores)
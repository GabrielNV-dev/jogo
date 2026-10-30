import { referencia, nada } from "../itens/center.js";
export var hotbar = Array.from({ length: 8 }, () => 0);

export function selecionar(indice) {
    selecionado = indice;
}


export var selecionado = 0;

export function mao() {
    return hotbar[selecionado][0]
}
export function remover() {
    if (hotbar[selecionado][1] == 1) {
        hotbar[selecionado] = 0
    }
    else {
        hotbar[selecionado][1] = hotbar[selecionado][1]-1
    }
    atualizar_hotbar()
}

hotbar[0] = ["tocha", 1]
hotbar[1] = ["machado-obamium", 1]
function atualizar(sprit, id, cores, pixel_tipo = "pixel") {
    const elemento = document.getElementById(id);

    if (!elemento || !Array.isArray(sprit) || sprit.length === 0) {
        return;
    }

    elemento.innerHTML = "";

    const linhas = sprit.length;
    const colunas = sprit[0].length;
    const tamanhoPixel = 4;

    elemento.style.display = "grid";
    elemento.style.gridTemplateColumns = `repeat(${colunas}, ${tamanhoPixel}px)`;
    elemento.style.gridTemplateRows = `repeat(${linhas}, ${tamanhoPixel}px)`;
    elemento.style.width = "40px";
    elemento.style.height = "40px";
    elemento.style.placeContent = "center";
    elemento.style.position = "relative";

    sprit.forEach(linha => {
        [...linha].forEach(pixel => {
            const div = document.createElement("div");
            div.classList.add(pixel_tipo);

            div.style.width = `${tamanhoPixel}px`;
            div.style.height = `${tamanhoPixel}px`;

            if (cores[pixel]) {
                div.classList.add(cores[pixel]);
            }

            elemento.appendChild(div);
        });
    });
}

import { configurarClique } from "./inventario.js";

export async function atualizar_hotbar() {
    const elementoHotbar = document.getElementById("hotbar");
    if (!elementoHotbar) return;

    elementoHotbar.innerHTML = "";

    for (let i = 0; i < 8; i++) {
        const div = document.createElement("div");

        div.id = `hotbar-${i}`;
        div.classList.add("pixel-item");

        elementoHotbar.appendChild(div);

        configurarClique(div, "hotbar", i, 0);

        if (Array.isArray(hotbar[i])) {
            atualizar(
                referencia[hotbar[i][0]].padrao,
                div.id,
                referencia[hotbar[i][0]].cores,
                "pixel-inv"
            );

            const textoQuantidade = document.createElement("span");
            textoQuantidade.classList.add("quantidade-item");
            textoQuantidade.textContent = hotbar[i][1];
            div.appendChild(textoQuantidade);
        } else {
            atualizar(nada.padrao, div.id, { N: "nada" }, "pixel-inv");
        }

        if (i === selecionado) {
            div.classList.add("selecionado");
        }
    }
}
atualizar_hotbar()